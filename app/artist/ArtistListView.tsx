"use client";

import { Artist, Art } from "@/Types/artist";
import ArtworkSidebar from "./ArtworkSidebar";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/footer";

export default function ArtistListView({
  artists,
  allArts,
  onSelect,
}: {
  artists: Artist[];
  allArts: Art[];
  onSelect: (a: Artist) => void;
}) {
  // Desktop split into 2 columns
  const col1 = artists.filter((_, i) => i % 2 === 0);
  const col2 = artists.filter((_, i) => i % 2 === 1);

  const maxRows = Math.max(col1.length, col2.length);

  return (
    <div style={{ background: "#fff" }}>
      <Header />

      <div className="px-4 md:px-[48px] lg:px-[60px] pb-10">
        {/* Heading */}
        <h1
          className="text-[28px] md:text-[36px] mt-10 md:mt-[100px] mb-8 md:mb-10 ml-0 md:ml-[55px]"
          style={{
            fontFamily: "'Mustica Pro', sans-serif",
            fontWeight: 600,
            lineHeight: "100%",
            color: "#000",
          }}
        >
          Represented Artists
        </h1>

        {/* MOBILE VIEW */}
        <div className="block lg:hidden">
          <div className="flex flex-col gap-6">
            {artists.map((artist) => (
              <div
                key={artist.id}
                className="artist-name cursor-pointer"
                onClick={() => onSelect(artist)}
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontWeight: 400,
                  fontSize: "22px",
                  lineHeight: "100%",
                  textTransform: "uppercase",
                  color: "#000",
                }}
              >
                {artist.full_name}
              </div>
            ))}
          </div>

          {/* SHOW ARTWORKS ONLY ON MOBILE */}
          <div className="mt-10">
            <ArtworkSidebar allArts={allArts} />
          </div>
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_280px] lg:gap-[60px] items-start">
          {/* Artist Grid */}
          <div
            className="w-full ml-[55px] grid grid-cols-2"
            style={{
              rowGap: "40px",
              columnGap: "60px",
            }}
          >
            {Array.from({ length: maxRows }).map((_, i) => (
              <div key={i} style={{ display: "contents" }}>
                {/* LEFT COLUMN */}
                <div
                  className="artist-name"
                  onClick={() => col1[i] && onSelect(col1[i])}
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontWeight: 400,
                    fontSize: "24px",
                    lineHeight: "100%",
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                    cursor: col1[i] ? "pointer" : "default",
                    color: "#000",
                  }}
                >
                  {col1[i]?.full_name || ""}
                </div>

                {/* RIGHT COLUMN */}
                <div
                  className="artist-name"
                  onClick={() => col2[i] && onSelect(col2[i])}
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontWeight: 400,
                    fontSize: "24px",
                    lineHeight: "100%",
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                    cursor: col2[i] ? "pointer" : "default",
                    color: "#000",
                  }}
                >
                  {col2[i]?.full_name || ""}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar only desktop */}
          <div>
            <ArtworkSidebar allArts={allArts} />
          </div>
        </div>

        <Footer />

        {/* Hover */}
        <style jsx>{`
          .artist-name:hover {
            text-decoration: underline;
            text-decoration-color: #000;
            text-underline-offset: 4px;
          }
        `}</style>
      </div>
    </div>
  );
}
