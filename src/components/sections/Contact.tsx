"use client";

import { contact } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { Check, Copy, Mail, Phone } from "lucide-react";
import { FormEvent, useState } from "react";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      message: String(data.get("message") || "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("error");
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <Section id="contact" eyebrow="Contact" title={contact.headline}>
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal>
          <div className="glass-card space-y-5 p-6 md:p-8">
            <p className="prose-narrow text-muted">{contact.subcopy}</p>
            <ul className="space-y-3 text-[15px]">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2 font-medium transition hover:text-accent"
                >
                  <Mail className="h-4 w-4 text-accent" aria-hidden />
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone}`}
                  className="inline-flex items-center gap-2 font-medium transition hover:text-accent"
                >
                  <Phone className="h-4 w-4 text-accent" aria-hidden />
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-medium transition hover:text-accent"
                >
                  <LinkedinIcon className="h-4 w-4 text-accent" />
                  linkedin.com/in/sadanandkonapur
                </a>
              </li>
              <li>
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-medium transition hover:text-accent"
                >
                  <GithubIcon className="h-4 w-4 text-accent" />
                  github.com/sadanandkonapur
                </a>
              </li>
            </ul>
            <Button
              type="button"
              variant="secondary"
              onClick={copyEmail}
              aria-live="polite"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" aria-hidden /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" aria-hidden /> Copy email
                </>
              )}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form
            onSubmit={onSubmit}
            className="glass-card space-y-4 p-6 md:p-8"
            noValidate
          >
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                autoComplete="name"
                className="w-full rounded-xl border border-border bg-background/60 px-3.5 py-2.5 text-[15px] outline-none transition focus:border-accent"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full rounded-xl border border-border bg-background/60 px-3.5 py-2.5 text-[15px] outline-none transition focus:border-accent"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-medium"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full resize-y rounded-xl border border-border bg-background/60 px-3.5 py-2.5 text-[15px] outline-none transition focus:border-accent"
              />
            </div>
            <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
              {status === "loading" ? "Sending…" : "Send message"}
            </Button>
            {status === "ok" && (
              <p className="text-sm text-[var(--success)]" role="status">
                Message sent — thanks for reaching out.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-[var(--danger)]" role="alert">
                {error}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
