import { GoogleGenAI, Type } from "@google/genai";
import { Vehicle, AIInsight } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Strictly using process.env.API_KEY as per system requirements
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }

  async getVehicleInsight(vehicle: Vehicle): Promise<AIInsight> {
    try {
      const prompt = `Analyze this vehicle: ${vehicle.year} ${vehicle.make} ${vehicle.model}. 
      Details: ${vehicle.description}. 
      Features: ${vehicle.features.join(', ')}. 
      Provide a concise market analysis, its pros, cons, and a final "Market Verdict" for a potential buyer in 2024.`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              pros: { type: Type.ARRAY, items: { type: Type.STRING } },
              cons: { type: Type.ARRAY, items: { type: Type.STRING } },
              marketVerdict: { type: Type.STRING }
            },
            required: ['summary', 'pros', 'cons', 'marketVerdict']
          }
        }
      });

      return JSON.parse(response.text || '{}');
    } catch (error) {
      console.error("Error fetching AI insight:", error);
      throw error;
    }
  }

  async smartSearch(query: string, vehicles: Vehicle[]): Promise<string[]> {
    try {
      const prompt = `User query: "${query}". 
      Available vehicles (ID and basic info): ${vehicles.map(v => `ID:${v.id} ${v.year} ${v.make} ${v.model} ($${v.price})`).join('; ')}. 
      Which vehicles best match this intent? Return only a JSON array of matching vehicle IDs.`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        }
      });

      return JSON.parse(response.text || '[]');
    } catch (error) {
      console.error("Error in smart search:", error);
      return [];
    }
  }
}

export const geminiService = new GeminiService();