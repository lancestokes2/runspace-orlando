import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "RunSpace Orlando — every run club & race, one place";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0E1A2B 0%, #16263c 100%)",
          padding: "72px 80px",
          color: "#FBF7F0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 34, letterSpacing: 2 }}>
          <span style={{ fontWeight: 800 }}>RUN</span>
          <span style={{ fontWeight: 800, color: "#FF5A3C" }}>SPACE</span>
          <span style={{ marginLeft: 20, color: "#8FB6D6", fontSize: 24 }}>ORLANDO</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 82, fontWeight: 800, lineHeight: 1.05, letterSpacing: -1 }}>
            Every run in Orlando.
          </div>
          <div style={{ fontSize: 82, fontWeight: 800, lineHeight: 1.05, color: "#FF5A3C" }}>
            One place.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#8FB6D6" }}>
          {`Run clubs + races, updated weekly — ${site.url.replace("https://", "")}`}
        </div>
      </div>
    ),
    { ...size },
  );
}
