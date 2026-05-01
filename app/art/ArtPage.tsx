"use client";

import { useState } from "react";
import { Art } from "@/Types/artist";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/footer";
import ArtCard from "./ArtCard";
import ArtDetailView from "./ArtDetailView";

export default function ArtPage({ arts }: { arts?: Art[] }) {
  const [selectedArt, setSelectedArt] = useState<Art | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const safeArts = arts ?? [];

  if (selectedArt) {
    return (
      <ArtDetailView
        art={selectedArt}
        onBack={() => setSelectedArt(null)}
      />
    );
  }

  const filtered = safeArts.filter((a) => {
    const q = search.toLowerCase();

    const matchSearch =
      !q ||
      a.title?.toLowerCase().includes(q) ||
      a.artist_name?.toLowerCase().includes(q);

    const matchFilter =
      filter === "All" || a.medium === filter;

    return matchSearch && matchFilter;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      {/* SAME SIDE PADDING AS SEARCH BAR */}
      <main style={{ padding: "40px 16px 80px" }} className="md:!px-[100px]">
        <h1>Art</h1>

        {/* SEARCH + FILTER (UNCHANGED) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #ca2128",
            marginBottom: 40,
            height: 44,
          }}
        >
          <div
            style={{
              padding: "0 14px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#999"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            style={{
              flex: 1,
              height: "100%",
              border: "none",
              outline: "none",
              fontSize: 13,
            }}
          />

          <div
            style={{
              width: 1,
              height: "100%",
              backgroundColor: "#ca2128",
            }}
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              height: "100%",
              border: "none",
              outline: "none",
              padding: "0 16px",
              fontSize: 13,
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
          >
            <option value="All">All</option>
            <option value="Oil on Canvas">Oil on Canvas</option>
            <option value="Watercolor">Watercolor</option>
            <option value="Acrylic">Acrylic</option>
            <option value="Photography">Photography</option>
          </select>
        </div>

        {/* GRID — responsive: 2 → 3 → 4 → 6 cols */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6"
          style={{ gap: "24px" }}
        >
          {filtered.map((art, i) => (
            <ArtCard
              key={`${art.id}-${i}`}
              art={art}
              onClick={() => setSelectedArt(art)}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}