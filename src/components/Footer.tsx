import { footer, site } from "@/data/content";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-4 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-sm font-bold tracking-tight">
            {site.name}
          </p>
          <p className="mt-1 text-sm text-muted">© {footer.year}</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={site.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            data-cursor="hover"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border transition hover:border-accent hover:text-accent"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={site.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            data-cursor="hover"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border transition hover:border-accent hover:text-accent"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <a
            href={site.socials.email}
            aria-label="Email"
            data-cursor="hover"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border transition hover:border-accent hover:text-accent"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
