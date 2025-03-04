import { NextRequest, NextResponse } from "next/server";
import { ChatXAI } from "@langchain/xai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser, JsonOutputParser } from "@langchain/core/output_parsers";
import { ChatGroq } from "@langchain/groq";

const XAI_API_KEY = process.env.XAI_API_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

export async function POST(req: NextRequest) {
  const { searchTerm, companyDesc } = await req.json();

  // Use xAI for information gathering
  const grok = new ChatXAI({
    apiKey: XAI_API_KEY,
    model: "grok-beta",
  });

  // Use Groq for information processing
  const model = new ChatGroq({
    apiKey: GROQ_API_KEY,
    model: "mixtral-8x7b-32768",
    temperature: 0
  });

  // Step 1. Find the X account of the user and the company
  // Step 2. Find the three most recent tweets from the user's account
  // Step 3. Find the portfolio projects of the company
  // Step 4. Generate a cold email based on the style of the investor and the portfolio projects of his company
  const grokSystemMsg =
    "You are a background checking assistant to help founders research investors.";

  const groqParserSystemMsg =
    "You are a JSON parser to help user format information into desired JSON object.";

  // Define the desired output format from Groq
  interface resultsFormat {
    companyX: { name: string, handle: string },
    personalX: { name: string, handle: string },
    portfolioProjects: string[],
    tweets: string[],
  };

  const stringParser = new StringOutputParser();
  const jsonParser = new JsonOutputParser<resultsFormat>();

  const grokPrompt = ChatPromptTemplate.fromMessages([
    ["system", grokSystemMsg],
    [
      "user",
      `Based on the investor's name: {investor}, do the following:
      1. Search for the X account of the investor and the investment firm he is working for
      2. Find the three most recent tweets from the investor's account and infer the style of the investor
      3. Find the portfolio projects of the company that similar to this project: {project_desc}
      4. Return a description of the found information that can be used to generate a cold email`,
    ],
  ]);
  
  const grokChain = grokPrompt.pipe(grok).pipe(stringParser);

  // Grok will return a string that can be parsed by groq
  const grokResult = await grokChain.invoke({
    investor: searchTerm,
    project_desc: companyDesc,
  });

  // Prompt for groq to format the information get from grok into a JSON object
  const groqJsonPrompt = ChatPromptTemplate.fromMessages([
    ["system", groqParserSystemMsg],
    [
      "user",
      `{info_desc}`,
    ],
  ]);

  const groqJsonChain = groqJsonPrompt.pipe(model).pipe(jsonParser);
  const groqJsonResult = await groqJsonChain.invoke({
    info_desc: grokResult,
  });

  console.log(groqJsonResult);

  return NextResponse.json({ result: groqJsonResult });
}
