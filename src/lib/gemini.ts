import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyBQQITYlaRWyBtCq8r-GRrc5Sb9hvu11qI";

export const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export const getElectionExplanation = async (prompt: string) => {
  if (!genAI) {
    return "Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.";
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const systemPrompt = `You are an expert in election systems and democracy education. 
  Explain the following concept related to elections simply and clearly for a general audience. 
  Use bullet points if helpful. Focus on fairness, transparency, and process.
  
  Question: ${prompt}`;

  try {
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to fetch explanation from Gemini. Please check your API key and connection.";
  }
};
