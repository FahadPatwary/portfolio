import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const dynamic = "force-static";
export const alt = "Fahad Ahmed Patwary — Software Engineer & ML Researcher";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const photo = fs.readFileSync(path.join(process.cwd(), "public", "fahad-icon.webp"));
  const src = `data:image/webp;base64,${photo.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", padding: 80, background: "#1B2A4A", color: "#fff" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 78, fontWeight: 800 }}>Fahad Ahmed Patwary</div>
          <div style={{ fontSize: 38, marginTop: 20, color: "#4fd1bd" }}>Software Engineer & ML Researcher</div>
          <div style={{ fontSize: 26, marginTop: 36, opacity: 0.8 }}>Full-Stack · System Design · Machine Learning · Green AI</div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={280} height={280} style={{ borderRadius: 140, border: "6px solid #4fd1bd", objectFit: "cover" }} />
      </div>
    ),
    size,
  );
}
