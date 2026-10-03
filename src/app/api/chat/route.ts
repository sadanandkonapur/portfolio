import { chat } from "@/data/content";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";

export const runtime = "nodejs";

const bodySchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(500),
      }),
    )
    .min(1)
    .max(20),
});

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`chat:${ip}`, 10, 60_000);
  if (!limited.ok) {
    return Response.json(
      { error: "Too many messages. Please wait a minute and try again." },
      { status: 429 },
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      {
        error:
          "Chat is not configured yet. Email koonapursadanand@gmail.com instead.",
      },
      { status: 503 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: "Invalid message payload." }, { status: 400 });
  }

  const last = parsed.data.messages[parsed.data.messages.length - 1];
  if (!last || last.role !== "user") {
    return Response.json({ error: "Last message must be from the user." }, { status: 400 });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  try {
    const stream = await client.messages.stream({
      model: "claude-3-5-haiku-latest",
      max_tokens: 400,
      system: chat.systemContext,
      messages: parsed.data.messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          controller.close();
        } catch {
          controller.error(new Error("Stream failed"));
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return Response.json(
      { error: "Unable to reach the assistant. Please try again later." },
      { status: 502 },
    );
  }
}
