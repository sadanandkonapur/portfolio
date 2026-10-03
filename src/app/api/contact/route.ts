import { site } from "@/data/content";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { z } from "zod";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(1).max(5000),
});

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`contact:${ip}`, 5, 60_000);
  if (!limited.ok) {
    return Response.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: "Please check your form fields." }, { status: 400 });
  }

  const { name, email, message } = parsed.data;
  const formspreeId = process.env.FORMSPREE_FORM_ID;
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || site.email;

  try {
    if (formspreeId) {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message, _replyto: email }),
      });
      if (!res.ok) {
        return Response.json(
          { error: "Could not send message. Please email directly." },
          { status: 502 },
        );
      }
      return Response.json({ ok: true });
    }

    if (resendKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
          to: [to],
          reply_to: email,
          subject: `Portfolio message from ${name}`,
          text: `From: ${name} <${email}>\n\n${message}`,
        }),
      });
      if (!res.ok) {
        return Response.json(
          { error: "Could not send message. Please email directly." },
          { status: 502 },
        );
      }
      return Response.json({ ok: true });
    }

    return Response.json(
      {
        error: `Form delivery is not configured. Email ${site.email} directly.`,
      },
      { status: 503 },
    );
  } catch {
    return Response.json(
      { error: "Could not send message. Please try again later." },
      { status: 502 },
    );
  }
}
