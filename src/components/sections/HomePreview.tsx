import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { about, projects } from "@/data/content";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const highlights = about.facts;

export function HomePreview() {
  const preview = projects.slice(0, 3);

  return (
    <section aria-label="Highlights" className="relative pb-16 md:pb-20">
      <div className="mx-auto w-full max-w-[1100px] space-y-8 px-5 sm:px-6">
        <Reveal>
          <div className="grid gap-3 sm:grid-cols-3">
            {highlights.map((fact) => (
              <article key={fact.title} className="glass-card p-4 md:p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                  {fact.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                  {fact.detail}
                </p>
              </article>
            ))}
          </div>
        </Reveal>

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
              Selected work
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight md:text-3xl">
              What I&apos;ve been building
            </h2>
          </div>
          <Link
            href="/projects"
            data-cursor="hover"
            data-cursor-label="All"
            className="hidden items-center gap-1.5 text-sm font-semibold text-accent transition hover:opacity-80 sm:inline-flex"
          >
            All projects
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {preview.map((project, i) => (
            <Reveal key={project.title} delay={0.05 * i}>
              <article className="glass-card flex h-full flex-col p-5 motion-safe:hover:-translate-y-0.5">
                <h3 className="font-display text-lg font-bold tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Chip key={tag}>{tag}</Chip>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Link
            href="/projects"
            data-cursor="hover"
            className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_var(--accent-glow)] transition hover:brightness-110 sm:hidden"
          >
            All projects
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href="/experience"
            data-cursor="hover"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition hover:text-accent"
          >
            See experience
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
          <Link
            href="/contact"
            data-cursor="hover"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition hover:text-accent"
          >
            Get in touch
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
