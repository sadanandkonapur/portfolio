import { skills } from "@/data/content";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Stack I ship with"
      description="Grouped by how I use them — not vanity progress bars."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={0.04 * i}>
            <div className="glass-card h-full p-4 md:p-5">
              <h3 className="font-display text-sm font-bold tracking-tight">
                {group.group}
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <Chip key={item}>{item}</Chip>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
