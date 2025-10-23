import { GoogleGenAI } from "@google/genai";

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