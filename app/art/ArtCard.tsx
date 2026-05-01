"use client";

import { Art } from "@/Types/artist";

export default function ArtCard({
  art,
  onClick,
}: {
  art: Art;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        width: 175,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        cursor: "pointer",
      }}
    >
      {/* IMAGE */}
      <div
        style={{
          width: 150,
          height: 150,
          overflow: "hidden",
          backgroundColor: "#d9d9d9",
        }}
      >
        <img
          src={art.image_url}
          alt={art.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      {/* TEXT */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          fontFamily:
            "Avenir, 'Avenir Next', Helvetica Neue, sans-serif",
        }}
      >
        {/* 🔥 BOLD ARTIST NAME */}
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#111",
            lineHeight: 1.2,
          }}
        >
          {art.artist_name ?? "Artist Name"}
        </div>

        {/* 🔥 BOLD TITLE */}
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#111",
            lineHeight: 1.3,
          }}
        >
          {art.title ?? "Artwork Title"}
        </div>

        {/* DETAILS */}
        <div style={{ fontSize: 11, color: "#333" }}>
          {art.year ?? "—"}
        </div>
        <div style={{ fontSize: 11, color: "#333" }}>
          {art.medium ?? "—"}
        </div>
        <div style={{ fontSize: 11, color: "#333" }}>
          {art.dimensions ?? "—"}
        </div>
      </div>
    </div>
  );
}