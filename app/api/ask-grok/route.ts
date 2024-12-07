import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  const { searchTerm } = await req.json();

  const openai = new OpenAI({
    apiKey: "xai-Yfre31fQwwmLZ6zvw5uoFXXsKPUaXkHLNjrJnBZF0G6DmuKiaP1IAKiBiC29PQkRujtCWDoAe0aTPgAx",
    baseURL: "https://api.x.ai/v1",
  });

  const completion = await openai.chat.completions.create({
    model: "grok-beta",
    messages: [
      {
        role: "system",
        content:
          "You are a background checking assistant to thelp founders research investors ",
      },
      {
        role: "user",
        content: `Search for X account handle for ${searchTerm}`,
      },
    ],
  });

  return NextResponse.json({ result: completion.choices[0].message.content });
}
