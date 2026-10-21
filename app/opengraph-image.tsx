import { ImageResponse } from "next/og";
import { brand, hero } from "@/lib/content";

export const alt = `${brand.name}: brand, web & product studio in ${brand.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#111114",
        color: "#fff",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -160,
          top: -200,
          width: 720,
          height: 720,
          borderRadius: 9999,
          background: "radial-gradient(closest-side, rgba(79,70,255,.75), rgba(155,140,255,.25) 60%, transparent)",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, fontWeight: 600 }}>
        <div style={{ display: "flex", flexWrap: "wrap", width: 40, gap: 4 }}>
          <div style={{ width: 18, height: 18, borderRadius: 6, background: "#fff" }} />
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#9B8CFF" }} />
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "rgba(255,255,255,.45)" }} />
          <div style={{ width: 18, height: 18, borderRadius: 6, background: "#fff" }} />
        </div>
        {brand.name}
      </div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 72, lineHeight: 1.08, letterSpacing: -3, maxWidth: 940 }}>
        <span>
          {hero.titleDark} <span style={{ color: "#9B8CFF", marginLeft: 18 }}>{hero.titleAccent}</span>
        </span>
        <span style={{ color: "#8a8a96" }}>{hero.titleMuted}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#9b9ba6", letterSpacing: 2 }}>
        <span>DESIGN · DEVELOPMENT · GROWTH</span>
        <span>{brand.city.toUpperCase()}, INDIA</span>
      </div>
    </div>,
    size,
  );
}
