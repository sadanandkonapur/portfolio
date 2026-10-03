import { Contact } from "@/components/sections/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Sadanand Konapur — email, phone, LinkedIn, GitHub, or send a message.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <Contact />;
}
