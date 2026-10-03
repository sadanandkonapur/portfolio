import { ImageResponse } from "next/og";

export const alt = "Sadanand Konapur — Generative AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(circle at 75% 20%, rgba(99,102,241,0.45), transparent 40%), radial-gradient(circle at 15% 80%, rgba(56,189,248,0.25), transparent 35%), #07090f",
          color: "#f3f4f8",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#818cf8",
            fontWeight: 700,
          }}
        >
          sadanand.tech
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: -2, lineHeight: 1.05 }}>
            Sadanand Konapur
          </div>
          <div style={{ fontSize: 34, color: "#c7cce0", maxWidth: 900 }}>
            Generative AI Engineer · LLM products, automation & data dashboards
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#a1a7bd" }}>
          Open to internships & entry-level roles · India + US remote
        </div>
      </div>
    ),
    { ...size },
  );
}
