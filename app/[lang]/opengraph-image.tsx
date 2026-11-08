import { ImageResponse } from "next/og";

import { business } from "@/content/business";

export const alt = business.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        color: "#f3f0e6",
        background:
          "repeating-linear-gradient(0deg, #10281c 0 90px, #1b3a2a 90px 180px)",
      }}
    >
      <div style={{ display: "flex", fontSize: 88, lineHeight: 1.05 }}>
        {business.name}
      </div>
      <div style={{ display: "flex", fontSize: 44, color: "#b7d433" }}>
        {`Toronto and the GTA  ${business.phoneDisplay}`}
      </div>
    </div>,
    size,
  );
}
