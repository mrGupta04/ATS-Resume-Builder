import { NextResponse } from "next/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

if (!OPENROUTER_API_KEY) {
  throw new Error("OPENROUTER_API_KEY is not defined in environment variables");
}

export async function POST(req: Request) {
  try {
    const { description } = await req.json();

    if (!description || typeof description !== "string") {
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      );
    }

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
    };

    if (process.env.NEXT_PUBLIC_URL) {
      headers["HTTP-Referer"] = process.env.NEXT_PUBLIC_URL;
    }
    headers["X-Title"] = "Resume Enhancer";

    const response = await fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: "openrouter/auto",
        messages: [
          {
            role: "system",
            content:
              "You are a professional resume writer. Enhance the given description to be more impactful and professional while maintaining truthfulness.",
          },
          {
            role: "user",
            content: `Please enhance this description to be more professional and impactful: ${description}. Important: must only use bold(**) and bullet point(-) markdown where necessary, and avoid phrases like 'here are...'. Keep it under 450 characters.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(
        `OpenRouter API responded with status: ${response.status}, body: ${errText}`
      );
    }

    const data = await response.json();
    const enhanced = data?.choices?.[0]?.message?.content;

    if (!enhanced) {
      throw new Error("Invalid response format from OpenRouter API");
    }

    return NextResponse.json({ enhanced });
  } catch (error: unknown) {
    console.error("❌ Error in enhance API:", error);
    const message =
      error instanceof Error ? error.message : "Failed to enhance description";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
