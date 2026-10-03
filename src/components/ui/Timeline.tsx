import type { ExperienceItem } from "@/data/content";

type Props = {
  items: ExperienceItem[];
};

export function Timeline({ items }: Props) {
  return (
    <ol className="relative space-y-4 border-l border-border pl-5 md:pl-7">
      {items.map((item) => (
        <li key={`${item.org}-${item.period}`} className="relative">
          <span
            className="absolute -left-[1.65rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-background md:-left-[2.15rem]"
            aria-hidden
          />
          <article className="glass-card p-4 md:p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-base font-bold tracking-tight md:text-lg">
                {item.role}
              </h3>
              <time className="font-mono text-xs text-muted">{item.period}</time>
            </div>
            <p className="mt-1 text-sm font-medium text-accent">
              {item.org}
              <span className="text-muted"> · {item.location}</span>
            </p>
            {item.bullets && item.bullets.length > 0 && (
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                {item.bullets.map((bullet) => (
                  <li key={bullet.slice(0, 48)} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </article>
        </li>
      ))}
    </ol>
  );
}
