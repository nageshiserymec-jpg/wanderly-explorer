import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "google/gemini-3.7-flash";

/** Shared call to the AI gateway. The API key never leaves the server. */
async function callAi(messages) {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("The travel assistant is not configured.");

  const response = await fetch(GATEWAY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": key,
    },
    body: JSON.stringify({ model: MODEL, messages }),
  });

  if (response.status === 429) {
    throw new Error("The assistant is busy right now. Please try again in a moment.");
  }
  if (response.status === 402) {
    throw new Error("The assistant is temporarily unavailable (AI credits exhausted).");
  }
  if (!response.ok) {
    throw new Error("Sorry, the assistant is temporarily unavailable.");
  }

  const json = await response.json();
  const text = json?.choices?.[0]?.message?.content;
  if (!text) throw new Error("The assistant returned an empty response.");
  return text;
}

/** Conversational travel assistant, grounded in the current destination. */
export const askAssistant = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        destination: z.string().min(1),
        country: z.string().min(1),
        history: z
          .array(
            z.object({
              role: z.enum(["user", "assistant"]),
              content: z.string().min(1).max(2000),
            }),
          )
          .max(20),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const system = {
      role: "system",
      content: `You are Wanderly's travel assistant, an expert guide for ${data.destination}, ${data.country}.
Answer only travel questions about this destination (things to do, food, timing, budget, culture, safety, transport).
Be concise and practical: 3-6 short sentences or a short bullet list. Never use markdown headings.
If a question is unrelated to travel, politely steer back to ${data.destination}.`,
    };

    return { reply: await callAi([system, ...data.history]) };
  });

/** Structured, day-by-day itinerary. The model is asked for strict JSON. */
export const generateItinerary = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        destination: z.string().min(1),
        country: z.string().min(1),
        days: z.number().int().min(1).max(10),
        style: z.string().min(1),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const prompt = `Create a ${data.days}-day travel itinerary for ${data.destination}, ${data.country}, focused on ${data.style}.
Return ONLY valid JSON, no markdown fences and no commentary, in exactly this shape:
{"destination":"${data.destination}","days":[{"day":1,"title":"short theme","activities":[{"time":"09:00","activity":"place or action","description":"one short sentence"}]}]}
Rules: exactly ${data.days} day objects, 4 to 5 activities per day, times in 24-hour HH:MM order, use real places in ${data.destination}.`;

    const raw = await callAi([
      {
        role: "system",
        content: "You are a travel planner that replies with raw JSON only.",
      },
      { role: "user", content: prompt },
    ]);

    // The model sometimes wraps JSON in code fences — strip them before parsing.
    const cleaned = raw
      .trim()
      .replace(/^```(?:json)?/i, "")
      .replace(/```$/, "")
      .trim();

    const schema = z.object({
      destination: z.string(),
      days: z
        .array(
          z.object({
            day: z.number(),
            title: z.string(),
            activities: z
              .array(
                z.object({
                  time: z.string(),
                  activity: z.string(),
                  description: z.string().optional().default(""),
                }),
              )
              .min(1),
          }),
        )
        .min(1),
    });

    let parsed;
    try {
      parsed = schema.parse(JSON.parse(cleaned));
    } catch {
      throw new Error("We couldn't read the generated itinerary. Please try again.");
    }

    return parsed;
  });
