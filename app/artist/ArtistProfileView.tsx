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

export default function ArtistProfileView({
  artist,
  arts,
}: Props) {
  const router = useRouter();

  const [selectedArt, setSelectedArt] = useState<Art | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  // Default selected artwork
  useEffect(() => {
    if (arts?.length > 0) {
      setSelectedArt(arts[0]);
    }
  }, [arts]);

  // Relative paths (e.g. /uploads/...) are proxied by Next.js rewrite → localhost:5000
  const getImageUrl = (url?: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return url; // relative path — works via Next.js /uploads/* proxy
  };

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
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#fff",
      }}
    >
      <Header />

      {/* Back Button */}
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
            color: "#000",
          }}
        >
          ← Back
        </button>
      </div>

      {/* Responsive Styles */}
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

          .artist-header {
            flex-direction: column;
          }

          .artist-image {
            margin-left: 0 !important;
            width: 100% !important;
            height: auto !important;
            max-height: 400px;
          }

          .artist-bio {
            margin-left: 0 !important;
            max-height: none !important;
          }

          .art-image {
            height: auto !important;
          }
        }

        .artist-bio::-webkit-scrollbar,
        .art-list::-webkit-scrollbar {
          width: 5px;
        }

        .artist-bio::-webkit-scrollbar-thumb,
        .art-list::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.15);
          border-radius: 10px;
        }
      `}</style>

      <main className="profile-main">
        {/* LEFT SECTION */}
        <div>
          {/* Artist Header */}
          <div
            className="artist-header"
            style={{
              display: "flex",
              gap: 20,
              marginBottom: 20,
              alignItems: "flex-start",
            }}
          >
            <img
              src={getImageUrl(artist.photo_url)}
              alt={artist.full_name}
              className="artist-image"
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
                  color: "#000",
                }}
              >
                {artist.full_name}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  fontFamily: "Avenir, sans-serif",
                  fontSize: 13,
                }}
              >
                {artist.cv && (
                  <a
                    href={getImageUrl(artist.cv)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "underline",
                      cursor: "pointer",
                      color: "#000",
                    }}
                  >
                    CV
                  </a>
                )}

                <span
                  onClick={() =>
                    openModal(artist.exhibitions)
                  }
                  style={{
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: "#000",
                  }}
                >
                  Exhibitions
                </span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div
            className="artist-bio"
            style={{
              marginLeft: 40,
              maxHeight: 320,
              overflowY: "auto",
              paddingRight: 8,
              fontFamily: "Avenir, sans-serif",
              fontSize: 13,
              lineHeight: 1.7,
              whiteSpace: "pre-wrap",
              color: "#000",
            }}
          >
            {artist.bio}
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div
          className="art-list"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            maxHeight: "80vh",
            overflowY: "auto",
            paddingRight: 10,
          }}
        >
          {arts.map((art, index) => (
            <div
              key={`${art.id}-${index}`}
              onClick={() => setSelectedArt(art)}
              style={{
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "100%",
                  background: "#f5f4f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 200,
                }}
              >
                <img
                  src={getImageUrl(art.image_url)}
                  alt={art.title}
                  className="art-image"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    display: "block",
                    
                  }}
                />
              </div>

              <div
                style={{
                  textAlign: "right",
                  fontFamily: "Avenir, sans-serif",
                  marginTop: 8,
                }}
              >
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: "#000",
                  }}
                >
                  {art.title}
                </div>

                <div style={{ fontSize: 13, color: "#000" }}>
                  {art.year ?? "—"}
                </div>

                <div style={{ fontSize: 13, color: "#000" }}>
                  {art.medium ?? "—"}
                </div>

                <div style={{ fontSize: 13, color: "#000" }}>
                  {art.dimensions ?? "—"}
                </div>
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
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: 24,
              maxWidth: 600,
              width: "100%",
              maxHeight: "70vh",
              overflowY: "auto",
              fontFamily: "Avenir, sans-serif",
              fontSize: 14,
              lineHeight: 1.7,
              whiteSpace: "pre-wrap",
              borderRadius: 4,
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