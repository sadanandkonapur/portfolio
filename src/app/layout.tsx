import { ChatLazy } from "@/components/chat/ChatLazy";
import { DogCursor } from "@/components/DogCursor";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { site } from "@/data/content";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import {
  Instrument_Serif,
  Inter,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic", "normal"],
  variable: "--font-instrument",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Generative AI Engineer`,
    template: `%s · ${site.name}`,
  },
  description:
    "Sadanand Konapur builds LLM-powered products, automation and data dashboards. Open to internships and entry-level GenAI / AI-ML roles.",
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Sadanand Konapur",
    "Generative AI Engineer",
    "AI ML Developer",
    "LangChain",
    "Next.js",
    "Hyderabad",
    "portfolio",
  ],
  alternates: {
    canonical: site.url,
  },
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} — Generative AI Engineer`,
    description:
      "LLM products, automation and data dashboards. Open to internships & entry-level roles.",
    siteName: site.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Generative AI Engineer`,
    description:
      "LLM products, automation and data dashboards. Open to internships & entry-level roles.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f5fa" },
    { media: "(prefers-color-scheme: dark)", color: "#07090f" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressCountry: "IN",
  },
  sameAs: [site.socials.github, site.socials.linkedin],
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Marri Laxman Reddy Institute of Technology and Management",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Sri Sangameshwara Government Polytechnic",
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jakarta.variable} ${instrument.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider>
          <div className="bg-atmosphere" aria-hidden />
          <div className="bg-grid" aria-hidden />
          <div className="bg-noise" aria-hidden />
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <ChatLazy />
          <DogCursor />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
