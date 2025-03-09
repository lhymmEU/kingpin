import { NextRequest, NextResponse } from "next/server";
import { ChatXAI } from "@langchain/xai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
  StringOutputParser,
  JsonOutputParser,
} from "@langchain/core/output_parsers";
import { ChatGroq } from "@langchain/groq";

const XAI_API_KEY = process.env.XAI_API_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

export async function POST(req: NextRequest) {
  const { searchTerm, companyDesc } = await req.json();

  // Use xAI for information gathering
  const grok = new ChatXAI({
    apiKey: XAI_API_KEY,
    model: "grok-2-1212",
  });

  // Use Groq for information processing
  const model = new ChatGroq({
    apiKey: GROQ_API_KEY,
    model: "llama-3.3-70b-versatile",
    temperature: 0,
  });

  // Step 1. Find the X account of the user and the company
  // Step 2. Find the three most recent tweets from the user's account
  // Step 3. Find the portfolio projects of the company
  // Step 4. Generate a cold email based on the style of the investor and the portfolio projects of his company
  const grokSystemMsg = `You are an expert investment research analyst specializing in venture capital and startup ecosystems. Your role is to:
1. Find and verify social media presence of investors and their firms
2. Analyze communication patterns and investment preferences
3. Research portfolio companies and investment theses
4. Identify alignment between startups and investors

Follow these guidelines:
- Be thorough and precise in your research
- Focus on recent and relevant information
- Maintain professional tone
- Verify information from multiple sources when possible
- Highlight specific data points that demonstrate investor-startup fit`;

  const groqParserSystemMsg = `You are a precise data structuring expert. Your role is to:
1. Parse unstructured investment research data
2. Extract key information points
3. Format data into consistent JSON structure
4. Ensure all fields are properly typed and validated
5. Handle missing or uncertain information appropriately

Guidelines:
- Always maintain the exact JSON schema
- Use null for missing values, never omit fields
- Validate dates, URLs, and social media handles
- Include confidence scores where relevant`;

  // Define the desired output format from Groq with more structured data
  interface InvestorProfile {
    name: string;
    title: string;
    firm: string;
    confidence: number;
  }

  interface SocialPresence {
    platform: string;
    handle: string;
    url: string;
    verified: boolean;
  }

  interface Tweet {
    text: string;
    date: string;
    engagement: {
      likes: number;
      retweets: number;
    };
  }

  interface PortfolioCompany {
    name: string;
    description: string;
    sector: string;
    investmentStage: string;
    relevanceScore: number;
  }

  interface resultsFormat {
    investor: InvestorProfile;
    socialProfiles: SocialPresence[];
    recentTweets: Tweet[];
    relevantPortfolio: PortfolioCompany[];
    investmentStyle: {
      preferredStages: string[];
      sectorFocus: string[];
      communicationStyle: string;
      decisionCriteria: string[];
    };
    researchConfidence: number;
  }

  const stringParser = new StringOutputParser();
  const jsonParser = new JsonOutputParser<resultsFormat>();

  const grokPrompt = ChatPromptTemplate.fromMessages([
    ["system", grokSystemMsg],
    [
      "human",
      `Here's an example of a good research output:
Investor: Sarah Smith at Bain Capital Ventures
Research:
- X handle @sarahsmith, verified, active daily poster
- Recent tweets focus on AI/ML startups and founder advice
- Portfolio includes 3 relevant B2B SaaS companies
- Communication style: direct, data-driven, technical
- Investment thesis aligns with deep tech`,
    ],
    [
      "assistant",
      `I understand you want me to research an investor with similar depth and structure. I'll analyze the social presence, recent activities, and portfolio alignment.`,
    ],
    [
      "human",
      `Research the following investor and provide detailed insights:

Target Investor: {investor}
Startup Context: {project_desc}

Required Information:
1. Verify the investor's identity and current role
2. Analyze their social media presence, focusing on X/Twitter
3. Extract their last 3 tweets and analyze communication style
4. Research portfolio companies similar to the described project
5. Identify investment patterns and decision criteria

Please provide comprehensive research that can be structured into our JSON format.`,
    ],
  ]);

  const grokChain = grokPrompt.pipe(grok).pipe(stringParser);

  // Grok will return a string that can be parsed by groq
  const grokResult = await grokChain.invoke({
    investor: searchTerm,
    project_desc: companyDesc,
  });

  // Enhanced prompt for groq to format the information
  const groqJsonPrompt = ChatPromptTemplate.fromMessages([
    ["system", groqParserSystemMsg],
    [
      "human",
      `Here's an example of the expected JSON structure:
{{
  "investor": {{
    "name": "Sarah Smith",
    "title": "Partner",
    "firm": "Bain Capital Ventures",
    "confidence": 0.95
  }},
  "socialProfiles": [{{
    "platform": "twitter",
    "handle": "@sarahsmith",
    "url": "https://twitter.com/sarahsmith",
    "verified": true
  }}],
  "recentTweets": [{{
    "text": "Looking for founding teams in AI infrastructure",
    "date": "2024-03-15",
    "engagement": {{"likes": 150, "retweets": 25}}
  }}]
}}`
    ],
    [
      "assistant",
      `I'll parse the provided research into this exact JSON structure, maintaining all required fields and proper typing.`
    ],
    [
      "human",
      `Parse this research information into our JSON structure, ensuring all fields are properly formatted:

{info_desc}

Requirements:
1. Maintain the exact schema
2. Include confidence scores
3. Validate all fields
4. Handle missing data with null values
5. Ensure dates are in ISO format`
    ]
  ]);

  const groqJsonChain = groqJsonPrompt.pipe(model).pipe(jsonParser);
  const groqJsonResult = await groqJsonChain.invoke({
    info_desc: grokResult,
  });

  console.log(groqJsonResult);

  return NextResponse.json({ result: groqJsonResult });
}
