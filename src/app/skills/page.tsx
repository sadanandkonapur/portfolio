import { Skills } from "@/components/sections/Skills";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Tech stack — Python, Next.js, LangChain, Meta Ads API, n8n, and more.",
  alternates: { canonical: "/skills" },
};

export default function SkillsPage() {
  return <Skills />;
}
