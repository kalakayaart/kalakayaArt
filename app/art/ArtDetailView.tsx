"use client";

import Header from "@/components/header/Header";
import Footer from "@/components/footer/footer";
import { Art } from "@/Types/artist";

export default function ArtDetailView({
  art,
  onBack,
}: {
  art: Art;
  onBack: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#fff",
      }}
    >
      {/* HEADER */}
      <Header />

      {/* MAIN WRAPPER */}
      <main style={{ flex: 1, padding: "24px 16px 60px" }} className="md:!px-[60px] lg:!px-[100px]">

        {/* BACK BUTTON */}
        <button
          onClick={onBack}
          style={{
            display: "block",
            marginBottom: 24,
            fontSize: 16,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#111",
          }}
        >
          ← Back
        </button>

        {/* RESPONSIVE LAYOUT */}
        <div
          className="flex flex-col md:flex-row gap-8 md:gap-12"
          style={{ alignItems: "flex-start" }}
        >
          {/* LEFT IMAGE */}
          <div className="w-full md:flex-1">
            <img
              src={art.image_url}
              alt={art.title}
              style={{
                width: "100%",
                maxHeight: 600,
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          {/* RIGHT SIDE */}
          <div
            className="w-full md:w-[320px] lg:w-[336px]"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              fontFamily: "Avenir, 'Avenir Next', Helvetica Neue, sans-serif",
              color: "#111",
            }}
          >
            {/* ART INFO BOX */}
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>
                {art.artist_name}
              </div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>
                {art.title}
              </div>
              <div style={{ fontSize: 13 }}>{art.year}</div>
              <div style={{ fontSize: 13 }}>{art.medium}</div>
              <div style={{ fontSize: 13 }}>{art.dimensions}</div>
            </div>

            {/* ENQUIRE SECTION */}
            <div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 400,
                  lineHeight: "100%",
                  marginBottom: 20,
                }}
              >
                Enquire
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
                {/* Exhibited */}
                <div>
                  <div style={{ fontSize: 24, fontWeight: 400, marginBottom: 6 }}>
                    Exhibited
                  </div>
                  <div style={{ fontSize: 13, color: "#333", lineHeight: 1.5 }}>
                    {art.exhibited ?? "Not available"}
                  </div>
                </div>

                {/* Publication */}
                <div>
                  <div style={{ fontSize: 24, fontWeight: 400, marginBottom: 6 }}>
                    Publication
                  </div>
                  <div style={{ fontSize: 13, color: "#333", lineHeight: 1.5 }}>
                    {art.publication ?? "Not available"}
                  </div>
                </div>

                {/* Provenance */}
                <div>
                  <div style={{ fontSize: 24, fontWeight: 400, marginBottom: 6 }}>
                    Provenance
                  </div>
                  <div style={{ fontSize: 13, color: "#333", lineHeight: 1.5 }}>
                    {art.provenance ?? "Not available"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}