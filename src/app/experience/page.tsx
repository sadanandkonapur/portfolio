import { Experience } from "@/components/sections/Experience";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Internship and campus experience — BBetter, AWS Cloud Club, and GeeksforGeeks Campus Chapter.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return <Experience />;
}
