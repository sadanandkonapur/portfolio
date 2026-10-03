"use client";

import { chat } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Loader2, MessageCircle, Send, X } from "lucide-react";
import { FormEvent, useEffect, useId, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

const MAX_INPUT = 500;

export function ChatWidget() {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: chat.welcome },
  ]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, loading, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = async (text: string) => {
    const trimmed = text.trim().slice(0, MAX_INPUT);
    if (!trimmed || loading) return;

    setError("");
    setLoading(true);
    setInput("");
    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages(nextMessages);
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!res.ok || !res.body) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Chat is unavailable right now.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      const chunks: string[] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(decoder.decode(value, { stream: true }));
        const text = chunks.join("");
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: text };
          return copy;
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Chat failed.");
      setMessages((prev) => {
        const copy = [...prev];
        if (copy[copy.length - 1]?.role === "assistant" && !copy[copy.length - 1]?.content) {
          copy.pop();
        }
        return copy;
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void send(input);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <div
        id={panelId}
        role="dialog"
        aria-modal="false"
        aria-label="Ask Sadanand's AI"
        hidden={!open}
        className={cn(
          "w-[min(100vw-2rem,380px)] overflow-hidden rounded-2xl border border-border bg-card-solid shadow-[var(--shadow-soft)] backdrop-blur-xl",
          open ? "block" : "hidden",
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            <p className="font-display text-sm font-bold">Ask Sadanand&apos;s AI</p>
            <p className="text-xs text-muted">Answers from portfolio data only</p>
          </div>
          <Button
            variant="icon"
            aria-label="Close chat"
            onClick={() => setOpen(false)}
            className="h-9 w-9"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div
          ref={listRef}
          className="scrollbar-thin h-80 space-y-3 overflow-y-auto px-4 py-4"
        >
          {messages.map((m, i) => (
            <div
              key={`${m.role}-${i}-${m.content.slice(0, 12)}`}
              className={cn(
                "max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                m.role === "user"
                  ? "ml-auto bg-accent text-white"
                  : "bg-accent-soft text-foreground",
              )}
            >
              {m.content || (
                <span className="inline-flex items-center gap-2 text-muted">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking…
                </span>
              )}
            </div>
          ))}
          {error && (
            <p className="text-sm text-[var(--danger)]" role="alert">
              {error}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2 border-t border-border px-4 py-3">
          {chat.suggested.map((q) => (
            <button
              key={q}
              type="button"
              disabled={loading}
              onClick={() => void send(q)}
              className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted transition hover:border-accent hover:text-accent disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>

        <form onSubmit={onSubmit} className="flex gap-2 border-t border-border p-3">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT))}
            maxLength={MAX_INPUT}
            placeholder="Ask a question…"
            aria-label="Chat message"
            className="min-w-0 flex-1 rounded-xl border border-border bg-background/50 px-3 py-2.5 text-sm outline-none focus:border-accent"
          />
          <Button
            type="submit"
            aria-label="Send message"
            disabled={loading || !input.trim()}
            className="px-3"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>

      <button
        type="button"
        aria-controls={panelId}
        aria-expanded={open}
        aria-label={open ? "Close Ask Sadanand's AI" : "Open Ask Sadanand's AI"}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-14 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-white shadow-[0_10px_40px_var(--accent-glow)] transition hover:brightness-110"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        <span className="hidden sm:inline">Ask AI</span>
      </button>
    </div>
  );
}
