"use client";

import { useEffect, useState } from "react";
import { Art } from "@/Types/artist";

export default function ArtworkSidebar({ allArts }: { allArts: Art[] }) {
  const [index, setIndex] = useState(0);

  // Auto slideshow (5 sec)
  useEffect(() => {
    if (!allArts || allArts.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % allArts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [allArts.length]);

  const art = allArts[index];

  if (!art) return null;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 472,
        height: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 40,
      }}
    >
      {/* IMAGE */}
      <div
        style={{
          width: "100%",
          height: "auto",
          aspectRatio: "397 / 472",
          overflow: "hidden",
        }}
      >
        <img
          src={art.image_url}
          alt={art.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* ART INFO */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          textAlign: "right",
        }}
      >
        {/* Title */}
        <p
          style={{
            fontFamily: "Avenir, sans-serif",
            fontWeight: 350,
            fontSize: "clamp(16px, 4vw, 20px)",
            lineHeight: "100%",
            textAlign: "right",
            margin: 0,
          }}
        >
          {art.title}
        </p>

        {/* Year */}
        <p
          style={{
            fontFamily: "Avenir, sans-serif",
            fontWeight: 350,
            fontSize: "clamp(14px, 3.5vw, 20px)",
            lineHeight: "100%",
            margin: 0,
          }}
        >
          {art.year ?? "2023"}
        </p>

        {/* Medium */}
        <p
          style={{
            fontFamily: "Avenir, sans-serif",
            fontWeight: 350,
            fontSize: "clamp(14px, 3.5vw, 20px)",
            lineHeight: "100%",
            margin: 0,
          }}
        >
          {art.medium}
        </p>

        {/* Dimensions */}
        <p
          style={{
            fontFamily: "Avenir, sans-serif",
            fontWeight: 350,
            fontSize: "clamp(14px, 3.5vw, 20px)",
            lineHeight: "100%",
            margin: 0,
          }}
        >
          {art.dimensions ?? "07 x 23 x 95"}
        </p>
      </div>
    </div>
  );
}