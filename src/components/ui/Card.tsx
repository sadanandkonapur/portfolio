import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
};

export function Card({ children, className, as: Tag = "div" }: Props) {
  return (
    <Tag
      className={cn(
        "glass-card p-4 md:p-5 motion-safe:hover:-translate-y-0.5",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
