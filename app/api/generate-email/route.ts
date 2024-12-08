import { NextRequest, NextResponse } from "next/server";
import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const GROQ_API_KEY = process.env.GROQ_API_KEY;

export async function POST(request: NextRequest) {
  const { searchResults } = await request.json();
  // Use Groq for information processing
  const model = new ChatGroq({
    apiKey: GROQ_API_KEY,
    model: "mixtral-8x7b-32768",
    temperature: 0,
  });

  const groqSystemMsg =
    `You are a cold email assistant to help founders write cold emails to investors based on the information provided.
    The generated cold mail needs to conform to the following requirements:
    1. It should be super concise.
    2. Do not do a full product introduction.
    3. Only highlight the part with the best chance to pique investor interest.
    4. The ultimate goal is to get a intro call opportunity with the investor.
    `;

  const groqPrompt = ChatPromptTemplate.fromMessages([
    ["system", groqSystemMsg],
    ["user", `{searchResults}`],
  ]);

  const stringParser = new StringOutputParser();
  const groqChain = groqPrompt.pipe(model).pipe(stringParser);

  const groqResult = await groqChain.invoke({
    searchResults: searchResults,
  });

  return NextResponse.json({ result: groqResult });
}
