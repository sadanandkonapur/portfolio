import { Projects } from "@/components/sections/Projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects — AI Voice Assistant, automation bots, and ads dashboards.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return <Projects />;
}
