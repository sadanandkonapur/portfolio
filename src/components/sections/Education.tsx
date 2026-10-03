import { education } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { GraduationCap } from "lucide-react";

export function Education() {
  return (
    <Section id="education" eyebrow="Education" title="School">
      <div className="grid gap-4 md:grid-cols-2">
        {education.map((item, i) => (
          <Reveal key={item.degree} delay={0.06 * i}>
            <article className="glass-card flex h-full gap-4 p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                <GraduationCap className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold tracking-tight">
                  {item.degree}
                </h3>
                <p className="mt-1 text-[15px] text-muted">{item.school}</p>
                <p className="mt-2 font-mono text-xs text-accent">{item.period}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
