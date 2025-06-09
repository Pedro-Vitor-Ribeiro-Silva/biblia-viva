'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function getTodaysDevocional(): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `Crie um devocional cristão curto com um versículo bíblico e uma breve reflexão.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return text || "Erro ao gerar devocional.";
}