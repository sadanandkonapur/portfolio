"use client";

import { nav, site } from "@/data/content";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { ThemeToggle } from "./ui/ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled || open
          ? "border-border bg-[var(--nav-bg)] backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-[1100px] items-center justify-between gap-3 px-5 sm:px-6"
      >
        <Link
          href="/"
          data-cursor="hover"
          data-cursor-label="Home"
          className="font-display text-sm font-extrabold tracking-[0.18em] uppercase"
        >
          {site.shortName}
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                data-cursor="hover"
                className={cn(
                  "relative px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted transition-colors hover:text-foreground",
                  isActive(item.href) && "text-foreground",
                )}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-px bg-accent" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={site.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            data-cursor-label="CV"
            className="hidden rounded-xl border border-border-strong px-3.5 py-2 text-xs font-semibold tracking-tight text-foreground transition hover:border-accent hover:text-accent sm:inline-flex"
          >
            Resume
          </a>
          <Button
            variant="icon"
            className="lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </nav>

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-[var(--nav-bg)] backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:hidden",
          open ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0 border-transparent",
        )}
      >
        <ul className="mx-auto flex max-w-[1100px] flex-col gap-1 px-5 py-4 sm:px-6">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-xl px-3 py-3 text-sm font-semibold tracking-wide",
                  isActive(item.href)
                    ? "bg-accent-soft text-accent"
                    : "text-foreground hover:bg-accent-soft/60",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={site.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-xl bg-accent px-3 py-3 text-center text-sm font-semibold text-white"
            >
              Open Resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
