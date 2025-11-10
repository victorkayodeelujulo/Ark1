import { GoogleGenAI, Type, Modality } from "@google/genai";
import { Product, AIOutfit } from "../types";

// Lazily initialize the GoogleGenAI client to prevent app crashes on load
// if the API key is missing or invalid.
let ai: GoogleGenAI | null = null;
const getAiClient = (): GoogleGenAI => {
    if (!ai) {
        // Assume process.env.API_KEY is available in the environment, as per guidelines.
        // The '!' assures TypeScript that the value is present.
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
    }
    return ai;
};

// Helper function to convert a File to a GoogleGenerativeAI.Part
async function fileToGenerativePart(file: File) {
    const base64EncodedDataPromise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.readAsDataURL(file);
    });
    return {
        inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
}

export const generateVibeDescription = async (vibe: string): Promise<string> => {
  try {
    const aiClient = getAiClient();
    // FIX: Refactored prompt to use systemInstruction for better clarity and structure.
    const systemInstruction = `You are an expert fashion stylist named Arkaenia. A user is looking for a style that matches a "vibe" they've described.
Based on their vibe, describe a fashion aesthetic for them in 2-3 short, inspirational, and friendly paragraphs.
Suggest specific clothing items, fabrics, or colors that fit the aesthetic.
Do not mention prices or specific stores. The goal is to inspire, not to sell.`;

    const contents = `User's Vibe: "${vibe}"`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
      },
    });
    
    return response.text;

  } catch (error) {
    console.error("Error generating vibe description from Gemini:", error);
    throw new Error("Failed to communicate with the AI stylist.");
  }
};


export const generateAIOutfit = async (vibe: string, products: Product[]): Promise<AIOutfit> => {
  try {
    const aiClient = getAiClient();
    
    const simplifiedProducts = products.map(({ id, name, brand }) => ({ id, name, brand })).join(', ');
    const systemInstruction = `You are an AI fashion stylist for Arkaenia. Your task is to create a complete outfit based on a user's requested vibe.
From the provided list of products, select between 2 and 4 items that create a cohesive look.
Provide a short, friendly paragraph of styling advice explaining your choices.
You must return the response in a JSON format that matches the provided schema.`;

    const contents = `User's Vibe: "${vibe}".\nAvailable Products: [${simplifiedProducts}]`;

    const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
            systemInstruction,
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    productIds: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: 'An array of product IDs for the outfit.'
                    },
                    advice: {
                        type: Type.STRING,
                        description: 'Styling advice for the outfit.'
                    }
                },
                required: ['productIds', 'advice']
            }
        }
    });

    // The response.text is a JSON string, so we parse it.
    return JSON.parse(response.text) as AIOutfit;

  } catch (error) {
    console.error("Error generating AI outfit from Gemini:", error);
    throw new Error("Failed to generate an outfit. The AI stylist might be busy.");
  }
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateOutfitImage = async (outfitProducts: Product[]): Promise<string> => {
    const aiClient = getAiClient();
    const productDescriptions = outfitProducts
        .map(p => `${p.name} (color: ${p.color || 'not specified'}) by ${p.brand}`)
        .join(', ');

    const prompt = `Create a hyper-realistic, editorial-style fashion photograph suitable for a high-end online magazine. The image should look like it was captured by a professional fashion photographer.

**Subject:** A full-body shot of a confident female fashion model.
**Pose:** Natural, dynamic, and engaging. Avoid stiff or unnatural poses.
**Outfit Details:** The model is wearing a complete, cohesive outfit consisting of: ${productDescriptions}. Ensure the clothing items are rendered accurately and look like real fabric.
**Setting:** A stylish and slightly blurred urban environment, such as a chic European city street or in front of interesting architecture. The background should complement the outfit, not distract from it.
**Lighting:** Soft, natural daylight (golden hour preferred) that creates a beautiful, flattering look and highlights the texture of the clothes.
**Photo Style:** Shot with a professional DSLR camera and a prime lens (like an 85mm f/1.4) to create a shallow depth of field. The image must be high-resolution, sharp, and photorealistic.
**Overall Vibe:** Aspirational, modern, and effortlessly cool. It should look like a curated image from a popular fashion blog or Instagram influencer.
**Crucially, do not make it look like a generic AI-generated image. It must appear as a genuine photograph.**`;

    const MAX_RETRIES = 3;
    let lastError: any = null;

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
            const response = await aiClient.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts: [{ text: prompt }] },
                config: { responseModalities: [Modality.IMAGE] },
            });

            for (const part of response.candidates?.[0]?.content?.parts || []) {
                if (part.inlineData) {
                    return `data:image/png;base64,${part.inlineData.data}`;
                }
            }
            throw new Error("Image generation succeeded but no image data was returned.");

        } catch (err: any) {
            lastError = err;
            console.error(`Error generating outfit image (attempt ${attempt + 1}/${MAX_RETRIES}):`, err.message);

            let isRateLimitError = false;
            let retryDelayMs = 2000 * Math.pow(2, attempt) + Math.random() * 1000;

            if (typeof err.message === 'string') {
                try {
                    const errorJson = JSON.parse(err.message);
                    if (errorJson?.error?.status === 'RESOURCE_EXHAUSTED') {
                        isRateLimitError = true;
                    }
                } catch (e) { /* Not a JSON error message, proceed with default backoff. */ }
            }

            if (isRateLimitError && attempt < MAX_RETRIES - 1) {
                console.log(`Rate limit hit. Retrying in ${Math.round(retryDelayMs / 1000)}s...`);
                await sleep(retryDelayMs);
            } else {
                break;
            }
        }
    }

    console.error("Final error after all retries:", lastError);
    throw new Error("Failed to visualize the outfit. The AI model might be busy.");
};


export const searchWithAttachments = async (prompt: string, attachments: File[], allProducts: Product[]): Promise<string[]> => {
    try {
        const aiClient = getAiClient();

        const simplifiedProducts = allProducts.map(({ id, name, brand, color }) => ({ id, name, brand, color: color || 'N/A' }));

        const systemInstruction = `You are a visual search expert for the Arkaenia fashion e-commerce store. Your task is to analyze the user-provided image(s) and optional text prompt. 
        Based on this visual and textual information, identify the products from the provided JSON list of available products that are the most visually similar or relevant.
        Focus on style, color, pattern, and garment type. If the user specifies a color or modification in the prompt, prioritize that.
        You must return the response as a JSON object that strictly matches the provided schema, containing an array of the corresponding product IDs. If no items match, return an empty array.`;

        const imageParts = await Promise.all(attachments.map(fileToGenerativePart));

        const contents = {
            parts: [
                ...imageParts,
                { text: `User prompt: "${prompt}"` },
                { text: `Available products JSON: ${JSON.stringify(simplifiedProducts)}` }
            ]
        };

        const response = await aiClient.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: contents,
            config: {
                systemInstruction,
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        productIds: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING },
                            description: 'An array of product IDs that are visually similar to the input.'
                        }
                    },
                    required: ['productIds']
                }
            }
        });

        const result = JSON.parse(response.text);
        return result.productIds || [];

    } catch (error) {
        console.error("Error performing visual search with Gemini:", error);
        throw new Error("Failed to communicate with the visual search AI.");
    }
};