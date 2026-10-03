import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Chip({ children, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-accent-soft px-2 py-0.5 font-mono text-[10px] font-medium tracking-wide text-foreground/90",
        className,
      )}
    >
      {children}
    </span>
  );
}
