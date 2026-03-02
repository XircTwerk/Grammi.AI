import Groq from "groq-sdk";
import { NextRequest } from "next/server";

// Lazy init so build doesn't fail without GROQ_API_KEY
function getGroq() {
  return new Groq({ apiKey: process.env.GROQ_API_KEY ?? "" });
}

const SYSTEM_PROMPTS: Record<string, string> = {
  study: `You are Study Agent, an AI tutor built into the user's browser.
The user will share content from pages or videos they're currently viewing.
Help them learn: summarize lectures, explain concepts in plain language,
make flashcards (format: Q: ... / A: ...), quiz them, or answer questions.
Keep responses focused and well-structured. Use bullet points where helpful.`,

  forms: `You are Form Assistant, an AI that helps users fill out web forms in their browser.
When the user shares form field names or describes a form, help them figure out
what to write in each field. Be practical and specific — give them the actual text
they should type, not vague advice. If you need more info from them, ask directly.`,

  finance: `You are Finance Agent, an AI financial analyst in the user's browser.
When the user shares data from banking, brokerage, or financial pages, help them:
analyze spending, spot patterns, compare options, flag subscriptions, track budgets.
Be precise with numbers. Never make up figures — only use what the user shares.
Don't give investment advice; give clear factual analysis.`,

  research: `You are Research Agent, a thorough AI researcher in the user's browser.
Help the user research topics by: synthesizing information, comparing options,
identifying key points, organizing findings into clear summaries.
Structure responses with headers and bullets. Cite specifics when you have them.
When you need to search, tell the user exactly what to look up and where.`,

  video: `You are Video Agent, an AI that helps users get more from videos in their browser.
Given a video title, description, or transcript content, you:
summarize the key points, create organized notes, explain difficult sections,
answer questions about the content, and extract action items.
Format notes clearly with sections and bullets.`,

  automation: `You are Task Automator, an AI that helps users handle repetitive browser tasks.
Help users plan and execute workflows: break complex tasks into clear steps,
identify what can be automated vs. done manually, suggest the most efficient approach.
Be concrete — give them exact steps to follow in their browser.`,
};

export async function POST(req: NextRequest) {
  try {
    const { messages, agentType = "research" } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "messages array required" }, { status: 400 });
    }

    const systemPrompt = SYSTEM_PROMPTS[agentType] ?? SYSTEM_PROMPTS.research;

    const completion = await getGroq().chat.completions.create({
      model: "llama-3.1-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 2048,
    });

    return Response.json({
      message: completion.choices[0].message.content,
      agentType,
      usage: completion.usage,
    });
  } catch (err) {
    console.error("Agent API error:", err);
    return Response.json(
      { error: "Agent request failed. Check GROQ_API_KEY." },
      { status: 500 }
    );
  }
}
