"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Artist, Art } from "@/Types/artist";

import Header from "@/components/header/Header";
import Footer from "@/components/footer/footer";

type Props = {
  artist: Artist;
  arts: Art[];
};

export default function ArtistProfileView({ artist, arts }: Props) {
  const router = useRouter();

  const [selectedArt, setSelectedArt] = useState<Art | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<string>("");

  // set default selected art
  useEffect(() => {
    if (arts?.length > 0) {
      setSelectedArt(arts[0]);
    }
  }, [arts]);

  const openModal = (content?: string) => {
    if (!content) {
      alert("Content not available");
      return;
    }
    setModalContent(content);
    setShowModal(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#fff",
      }}
    >
      <Header />

      {/* BACK BUTTON */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "20px 60px 0",
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 14,
            fontFamily: "Avenir, sans-serif",
          }}
        >
          ← Back
        </button>
      </div>

      {/* ── Mobile override: stack the 2-col grid on small screens ── */}
      <style jsx>{`
        .profile-main {
          display: grid;
          grid-template-columns: 420px 1fr;
          gap: 60px;
          padding: 24px 60px 48px;
          flex: 1;
        }
        @media (max-width: 768px) {
          .profile-main {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 20px 16px 40px;
          }
        }
        .artist-bio::-webkit-scrollbar {
          width: 5px;
        }
        .artist-bio::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.15);
          border-radius: 10px;
        }
      `}</style>

      <main className="profile-main">
        {/* ================= LEFT ================= */}
        <div>
          {/* IMAGE + NAME */}
          <div
            style={{
              display: "flex",
              gap: 20,
              marginBottom: 20,
              alignItems: "flex-start",
            }}
          >
            <img
              src={artist.photo_url}
              alt={artist.full_name}
              style={{
                width: 200,
                height: 200,
                objectFit: "cover",
                marginLeft: 40,
              }}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: 200,
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontFamily: "EB Garamond, serif",
                  fontSize: 17,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                {artist.full_name}
              </div>

              <div
                style={{
                  fontFamily: "Avenir, sans-serif",
                  fontSize: 13,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
               <a
                href={artist.cv}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                CV
              </a>

                <span
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                  onClick={() => openModal(artist.exhibitions)}
                >
                  Exhibitions
                </span>
              </div>
            </div>
          </div>

          {/* BIO */}
          <div
            className="artist-bio"
            style={{
              marginLeft: 40,
              maxHeight: 320,
              overflowY: "auto",
              paddingRight: 8,
              fontFamily: "Avenir, sans-serif",
              fontSize: 13,
              lineHeight: 1.65,
            }}
          >
            {artist.bio}
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            maxHeight: "80vh",
            overflowY: "auto",
            paddingRight: 10,
          }}
        >
          {arts.map((art, i) => (
            <div
              key={`${art.id}-${i}`}
              onClick={() => setSelectedArt(art)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={art.image_url}
                alt={art.title}
                style={{
                  width: "100%",
                  height: 420,
                  objectFit: "cover",
                }}
              />

              <div
                style={{
                  textAlign: "right",
                  fontFamily: "Avenir, sans-serif",
                }}
              >
                <div style={{ fontSize: 15, fontWeight: 500 }}>
                  {art.title}
                </div>
                <div style={{ fontSize: 13 }}>{art.year ?? "—"}</div>
                <div style={{ fontSize: 13 }}>{art.medium ?? "—"}</div>
                <div style={{ fontSize: 13 }}>{art.dimensions ?? "—"}</div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: 20,
              maxWidth: 600,
              maxHeight: "70vh",
              overflowY: "auto",
              fontFamily: "Avenir, sans-serif",
              fontSize: 14,
              lineHeight: 1.6,
              whiteSpace: "pre-wrap",
            }}
          >
            {modalContent}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}