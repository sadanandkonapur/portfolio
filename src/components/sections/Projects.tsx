import { projects } from "@/data/content";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { GithubIcon } from "@/components/ui/Icons";
import { ArrowUpRight } from "lucide-react";

export function Projects() {
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const rest = projects.filter((p) => p !== featured);

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Proof of work"
      description="Selected builds across GenAI, automation and product surfaces."
    >
      <div className="grid gap-3 md:grid-cols-2">
        <Reveal className="md:col-span-2">
          <article className="glass-card group relative overflow-hidden p-5 md:p-7">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/15 blur-3xl transition duration-500 group-hover:bg-accent/25" />
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Featured
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
              {featured.title}
            </h3>
            <p className="prose-narrow mt-2 text-[15px] text-muted">
              {featured.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {featured.tags.map((tag) => (
                <Chip key={tag}>{tag}</Chip>
              ))}
            </div>
            <ProjectLinks githubUrl={featured.githubUrl} liveUrl={featured.liveUrl} />
          </article>
        </Reveal>

        {rest.map((project, i) => (
          <Reveal key={project.title} delay={0.05 * (i + 1)}>
            <article className="glass-card flex h-full flex-col p-5 motion-safe:hover:-translate-y-0.5">
              <h3 className="font-display text-lg font-bold tracking-tight">
                {project.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {project.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Chip key={tag}>{tag}</Chip>
                ))}
              </div>
              <ProjectLinks githubUrl={project.githubUrl} liveUrl={project.liveUrl} />
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function ProjectLinks({
  githubUrl,
  liveUrl,
}: {
  githubUrl?: string;
  liveUrl?: string;
}) {
  if (!githubUrl && !liveUrl) return null;

  return (
    <div className="mt-5 flex flex-wrap gap-3">
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="hover"
          data-cursor-label="Code"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition hover:text-accent"
        >
          <GithubIcon className="h-4 w-4" />
          GitHub
        </a>
      )}
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="hover"
          data-cursor-label="Live"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition hover:text-accent"
        >
          Live demo
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </a>
      )}
    </div>
  );
}
