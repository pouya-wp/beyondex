import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";

export const alt = "Beyondex — dedicated AI agents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "68px 76px",
        color: "#eff5ff",
        background: "radial-gradient(circle at 78% 20%, #315fd4 0%, #101f4b 27%, #050711 68%)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, letterSpacing: 2 }}>
        <span>BEYONDEX</span>
        <span>FA / EN</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 940 }}>
        <div style={{ fontSize: 70, lineHeight: 1.2, fontWeight: 700 }}>
          AI agents. Dedicated workspaces.
        </div>
        <div style={{ fontSize: 30, color: "#a9c5ed" }}>
          One place to discover and manage agent access · FA / EN
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 20, color: "#86b1ff", letterSpacing: 1 }}>BEYONDEX.ONE</div>
    </div>,
    size,
  );
}
