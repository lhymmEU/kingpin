import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const XAI_API_KEY = process.env.xAI_API_KEY;

export async function POST(req: NextRequest) {
  const { searchTerm } = await req.json();
  const message_template = {
    AccountSearch: `Search for X account of the specified user: ${searchTerm}, return nothing but the user's X handle and the company's X handle for which the user is working in this format: [user's name]: [X handle], [company's name]: [X handle].`,
  };

  const openai = new OpenAI({
    apiKey: XAI_API_KEY,
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
        content: message_template.AccountSearch,
      },
    ],
  });

  return NextResponse.json({ result: completion.choices[0].message.content });
}
