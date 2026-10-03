import { cn } from "@/lib/utils";

type Props = {
  id: string;
  children: React.ReactNode;
  className?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function Section({
  id,
  children,
  className,
  eyebrow,
  title,
  description,
}: Props) {
  return (
    <section
      id={id}
      aria-labelledby={title ? `${id}-title` : undefined}
      className={cn("py-14 md:py-16", className)}
    >
      <div className="mx-auto w-full max-w-[1100px] px-5 sm:px-6">
        {(eyebrow || title || description) && (
          <header className="mb-7 md:mb-9">
            {eyebrow && (
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.22em] text-accent">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                id={`${id}-title`}
                className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl"
              >
                {title}
              </h2>
            )}
            {description && (
              <p className="prose-narrow mt-2 text-[15px] text-muted">{description}</p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
