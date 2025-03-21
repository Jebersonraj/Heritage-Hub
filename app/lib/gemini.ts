// app/lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Store your API key in .env

if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined in environment variables");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Use "gemini-pro" or "gemini-1.5-flash" based on availability

export async function getGeminiResponse(prompt: string): Promise<string> {
    try {
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        return responseText;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get response from Gemini AI");
    }
}