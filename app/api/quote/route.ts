import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `You are a motivational quote generator. Your task is to create one sentence or maximum of three sentences of motivational quotes
for the user to achive or set up a goal


`;

export async function POST(req: Request) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });
    const data = await req.text();

    if (!openai.apiKey) {
      console.error("OpenAI API key is missing");
      return NextResponse.json({
        error: "OpenAI API key is missing",
        success: false,
      });
    }

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: data || "" },
      ],
      max_tokens: 60, 
    
      
    });
    const content = response?.choices[0]?.message?.content?.trim();

    if (!content) {
      return NextResponse.json({ error: "No content received from API", success: false });
    }

    return NextResponse.json({ quote: content });
  } catch (err) {
    console.error("Error processing request:", err);

    return NextResponse.json({ error: `System Error: ${err}`, success: false });
  }
}
