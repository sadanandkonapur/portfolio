import { experience } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Timeline } from "@/components/ui/Timeline";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've been building"
      description="Internships, campus leadership and shipped work."
    >
      <Reveal>
        <Timeline items={experience} />
      </Reveal>
    </Section>
  );
}
