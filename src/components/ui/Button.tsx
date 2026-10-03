import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "icon";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  asChild?: boolean;
};

const styles: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:brightness-110 shadow-[0_8px_30px_var(--accent-glow)]",
  secondary:
    "bg-transparent border border-border-strong text-foreground hover:border-accent hover:text-accent",
  ghost: "bg-transparent text-muted hover:text-foreground",
  icon:
    "h-10 w-10 rounded-full border border-border bg-card text-foreground hover:border-accent hover:text-accent",
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold tracking-tight transition-all duration-300 disabled:pointer-events-none disabled:opacity-50",
          styles[variant],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
