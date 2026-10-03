import { about } from "@/data/content";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function About() {
  return (
    <Section id="about" eyebrow="About" title="Who I am">
      <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <div className="glass-card space-y-3 p-5 md:p-6">
            {about.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="prose-narrow text-[15px] text-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
        <div className="grid gap-3">
          {about.facts.map((fact, i) => (
            <Reveal key={fact.title} delay={0.06 * (i + 1)}>
              <Card className="h-full !p-4 md:!p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                  {fact.title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">
                  {fact.detail}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
