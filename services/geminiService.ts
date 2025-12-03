import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { METAMODEL_SYSTEM_INSTRUCTION, WORKSHOP_PROMPT_TEMPLATE } from '../constants';

let chatSession: Chat | null = null;
let aiClient: GoogleGenAI | null = null;

const getAIClient = () => {
  if (aiClient) return aiClient;
  
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  aiClient = new GoogleGenAI({ apiKey });
  return aiClient;
};

export const initializeChat = async () => {
  const ai = getAIClient();
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: METAMODEL_SYSTEM_INSTRUCTION,
      temperature: 0.9, 
    },
  });
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    await initializeChat();
  }

  if (!chatSession) {
     throw new Error("Failed to initialize chat session");
  }

  try {
    const result: GenerateContentResponse = await chatSession.sendMessage({ message });
    return result.text || "La interfaz no ha devuelto datos legibles.";
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

export const generateMutation = async (idea: string, filter: string): Promise<string> => {
  const ai = getAIClient();
  const prompt = WORKSHOP_PROMPT_TEMPLATE(idea, filter);
  
  try {
    const result: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 1, // High randomness for mutations
      }
    });
    return result.text || "Error en el proceso de mutación.";
  } catch (error) {
    console.error("Gemini Mutation Error:", error);
    return "El sistema ha rechazado la mutación. Intenta de nuevo.";
  }
}
