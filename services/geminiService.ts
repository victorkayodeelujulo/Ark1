import { GoogleGenAI, Type } from "@google/genai";
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