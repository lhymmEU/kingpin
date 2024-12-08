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

  const groqParserSystemMsg =
    "You are a cold email assistant to help founders write cold emails to investors based on the information provided.";

  const groqPrompt = ChatPromptTemplate.fromMessages([
    ["system", groqParserSystemMsg],
    ["user", `{searchResults}`],
  ]);

  const stringParser = new StringOutputParser();
  const groqChain = groqPrompt.pipe(model).pipe(stringParser);

  const groqResult = await groqChain.invoke({
    searchResults: searchResults,
  });

  return NextResponse.json({ result: groqResult });
}
