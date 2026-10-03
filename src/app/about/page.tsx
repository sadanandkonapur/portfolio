import { About } from "@/components/sections/About";
import { Education } from "@/components/sections/Education";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Sadanand Konapur — final-year CSE (AI & ML) student and Generative AI engineer based in Hyderabad.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <About />
      <Education />
    </>
  );
}
