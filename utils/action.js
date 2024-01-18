"use server";
import OpenAI from "openai";
import prisma from "./db";
import { revalidatePath } from "next/cache";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const genChatResponse = async (chatMessage) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a marketing expert, and will be assisting users with marketing related questions. You can ONLY answer marketing related questions. If user asks anything OUTSIDE marketing scope, politely refuse to answer as you can ONLY assist with marketing related questions / requests. Limit each response to MAX 300 tokens, and make sure to provide concise response that fits within 300 tokens per response.",
        },
        ...chatMessage,
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
      max_tokens: 3000,
    });
    return {
      message: response.choices[0].message,
      tokens: response.usage.total_tokens,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const genCreativeRes = async ({ genContent }) => {
  const query = `Create a marketing ${genContent} when user inputs request.
You can ONLY generate ${genContent} within marketing domain as you are a marketing expert. If user asks for ANYTHING non-related to marketing, politely decline,
and mention that you can ONLY generate ${genContent} related to marketing. Limit each response to MAX 300 tokens, and make sure to provide concise response that fits within 300 tokens per response.
Response should be in the following JSON format: 
{
  "creative": {
    "content": "${genContent}",
    "title": "title of the content",
    "description": "short description of the content",
    "suggestions": ["short paragraph about 1 suggestion, max 1 sentence ", "short paragraph about 2 suggestion max 1 sentence","short paragraph about 3 suggestion max 1 sentence"]
  }
}
"suggestions" should include only include 3 suggestions.`;
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a marketing expert, and will be assisting users with marketing related questions. You can ONLY answer marketing related questions. If user asks anything OUTSIDE marketing scope, politely refuse to answer as you can ONLY assist with marketing related questions / requests.",
        },
        {
          role: "user",
          content: query,
        },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
    });
    const contentData = JSON.parse(response.choices[0].message.content);
    if (!contentData.creative) {
      return null;
    }
    return {
      creative: contentData.creative,
      tokens: response.usage.total_tokens,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getExistingCreative = async ({ genContent }) => {
  return prisma.content.findUnique({
    where: {
      genContent: genContent,
    },
  });
};

export const createNewCreative = async ({ content }) => {
  return prisma.content.create({
    data: {
      genContent: content.content,
      title: content.title,
      description: content.description,
      image: content.image,
      suggestions: content.suggestions,
    },
  });
};

export const getAllCreatives = async (searchTerm) => {
  if (!searchTerm) {
    const allContent = await prisma.content.findMany({
      orderBy: {
        genContent: "asc",
      },
    });
    return allContent;
  }

  const allContent = await prisma.content.findMany({
    where: {
      OR: [
        {
          genContent: {
            contains: searchTerm,
          },
        },
      ],
    },
    orderBy: {
      genContent: "asc",
    },
  });

  return allContent;
};

export const getSingleCreative = async (id) => {
  return prisma.content.findUnique({
    where: {
      id,
    },
  });
};

export const fetchUserToken = async (clerkId) => {
  const result = await prisma.token.findUnique({
    where: {
      clerkId,
    },
  });
  return result?.tokens;
};

export const genUserTokensId = async (clerkId) => {
  const result = await prisma.token.create({
    data: {
      clerkId,
    },
  });
  return result?.tokens;
};

export const fetchOrGenTokens = async (clerkId) => {
  const result = await fetchUserToken(clerkId);
  if (result) {
    return result.tokens;
  }
  return (await genUserTokensId(clerkId)).tokens;
};

export const subtractTokens = async (clerkId, tokens) => {
  const result = await prisma.token.update({
    where: {
      clerkId,
    },
    data: {
      tokens: {
        decrement: tokens,
      },
    },
  });
  revalidatePath("/profile");
  return result.tokens;
};
