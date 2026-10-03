"use client";

import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { hero, site } from "@/data/content";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Hero() {
  const reduce = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setRoleIndex((i) => (i + 1) % hero.roles.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <section
      aria-label="Introduction"
      className="relative flex min-h-[88svh] flex-col justify-center pt-20 pb-10 md:pb-12"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="orb left-[8%] top-[18%] h-64 w-64 bg-[var(--orb-a)] md:h-72 md:w-72" />
        <div
          className="orb right-[10%] top-[40%] h-72 w-72 bg-[var(--orb-b)] md:h-80 md:w-80"
          style={{ animationDelay: "-4s" }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1100px] px-5 sm:px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted shadow-sm backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {hero.status}
          </p>

          <h1 className="font-display text-[clamp(2.4rem,7vw,5rem)] font-extrabold leading-[0.96] tracking-[-0.04em] text-foreground">
            <span className="block">{hero.name.split(" ")[0]}</span>
            <span className="relative mt-1 block md:mt-1.5">
              <span className="font-serif text-[0.38em] font-normal italic tracking-normal text-accent md:absolute md:-top-1.5 md:left-[0.15em]">
                builds
              </span>
              <span className="md:pl-[0.05em]">
                {hero.name.split(" ").slice(1).join(" ")}
              </span>
            </span>
          </h1>

          <div className="mt-4 h-8 overflow-hidden md:mt-5 md:h-9">
            <AnimatePresence mode="wait">
              <motion.p
                key={hero.roles[roleIndex]}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -14 }}
                transition={{ duration: 0.35 }}
                className="font-display text-lg font-semibold tracking-tight text-muted md:text-xl"
              >
                {hero.roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <p className="prose-narrow mt-3 text-[15px] text-muted md:text-base">
            {hero.pitch}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <Link
              href={hero.ctas.primary.href}
              data-cursor="hover"
              data-cursor-label="View"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_var(--accent-glow)] transition hover:brightness-110"
            >
              {hero.ctas.primary.label}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a
              href={hero.ctas.secondary.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              data-cursor-label="CV"
              className="inline-flex items-center justify-center rounded-xl border border-border-strong bg-card px-5 py-2.5 text-sm font-semibold transition hover:border-accent hover:text-accent"
            >
              {hero.ctas.secondary.label}
            </a>
            <div className="ml-0.5 flex items-center gap-2">
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                data-cursor="hover"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition hover:border-accent hover:text-accent"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                data-cursor="hover"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition hover:border-accent hover:text-accent"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href={site.socials.email}
                aria-label="Email"
                data-cursor="hover"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition hover:border-accent hover:text-accent"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-4 border-t border-border pt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted sm:grid-cols-2">
          <div className="space-y-1.5">
            {hero.metaLeft.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="space-y-1.5">
            {hero.metaRight.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
