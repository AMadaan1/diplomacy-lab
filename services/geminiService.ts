import { GoogleGenAI } from "@google/genai";
import { ChatMessage, GroundingSource, FileData } from "../types";

export const performResearch = async (
  query: string,
  history: ChatMessage[],
  currentFile?: FileData | null
): Promise<{ text: string; sources: GroundingSource[] }> => {
  try {
    const apiKey = process.env.API_KEY;
    
    if (!apiKey || apiKey === "") {
      return {
        text: "Configuration Error: The Research Portal cannot connect because the API_KEY is missing. Please ensure you have added it as a 'Repository Secret' in your GitHub Settings.",
        sources: []
      };
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Construct the contents with multimodal parts if a file is provided
    const userParts: any[] = [{ text: query || "Please analyze this context." }];
    if (currentFile) {
      userParts.push({
        inlineData: {
          mimeType: currentFile.mimeType,
          data: currentFile.data
        }
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(msg => {
          const parts: any[] = [{ text: msg.content }];
          if (msg.file) {
            parts.push({
              inlineData: {
                mimeType: msg.file.mimeType,
                data: msg.file.data
              }
            });
          }
          return {
            role: msg.role as 'user' | 'model',
            parts: parts
          };
        }),
        { role: 'user', parts: userParts }
      ],
      config: {
        systemInstruction: `You are a specialized Model UN Research Assistant for Diplomacy Lab. 
        Your goal is to provide high-quality, academically rigorous information for delegates. 
        Use the Google Search tool to find the most recent facts, figures, and international resolutions. 
        If a user provides a file (image or PDF), analyze its contents to provide contextual answers. 
        Focus on specific country positions, treaty details, and UN procedures. Always cite sources.`,
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "The intelligence system returned an empty response. This may be due to safety filters or grounding issues.";
    const sources = (response.candidates?.[0]?.groundingMetadata?.groundingChunks || []) as GroundingSource[];

    return { text, sources };
  } catch (error: any) {
    console.error("AI Research Error:", error);
    let errorMessage = "An error occurred while connecting to the research intelligence.";
    
    if (error.message?.includes("API_KEY_INVALID")) {
      errorMessage = "Error: The provided API Key is invalid. Please check your Google AI Studio settings.";
    } else if (error.message?.includes("quota") || error.status === 429) {
      errorMessage = "Error: Research capacity limit reached. Please try again in a few minutes.";
    }

    return {
      text: errorMessage,
      sources: []
    };
  }
};