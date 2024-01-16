"use server";
import OpenAI from "openai";
import prisma from "./db";

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
            "You are a marketing expert, and will be assisting users with marketing related questions. You can ONLY answer marketing related questions. If user asks anything OUTSIDE marketing scope, politely refuse to answer as you can ONLY assist with marketing related questions / requests.",
        },
        ...chatMessage,
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
    });
    return response.choices[0].message;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const genCreativeRes = async ({ genContent }) => {
  const query = `Create a marketing ${genContent} when user inputs request.
You can ONLY generate ${genContent} within marketing domain as you are a marketing expert. If user asks for ANYTHING non-related to marketing, politely decline,
and mention that you can ONLY generate ${genContent} related to marketing. 
Response should be in the following JSON format: 
{
  "creative": {
    "content": "${genContent}",
    "title": "title of the content",
    "description": "short description of the content",
    "suggestions": ["short paragraph about 1 suggestion ", "short paragraph about 2 suggestion","short paragraph about 3 suggestion"]
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
    return contentData.creative;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getExistingCreative = async ({ genContent }) => {
  prisma.content.findUnique({
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
