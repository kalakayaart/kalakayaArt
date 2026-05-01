"use client";

import { useEffect, useState } from "react";
import { Artist, Art } from "@/Types/artist";
import { fetchArtists, fetchAllArts, fetchArtsByArtist } from "@/lib/api";

import ArtistListView from "./ArtistListView";
import ArtistProfileView from "./ArtistProfileView";

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [allArts, setAllArts] = useState<Art[]>([]);
  const [selected, setSelected] = useState<Artist | null>(null);
  const [arts, setArts] = useState<Art[]>([]);
  const [loading, setLoading] = useState(false);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [artistData, artsData] = await Promise.all([
          fetchArtists(),
          fetchAllArts(),
        ]);

        setArtists(artistData);
        setAllArts(artsData);
      } catch (err) {
        console.error("Failed to load artists page data:", err);
      }
    };

    loadData();
  }, []);

  // Select artist
  const handleSelect = async (artist: Artist) => {
    try {
      setSelected(artist);
      setLoading(true);

      const data = await fetchArtsByArtist(artist.id);
      setArts(data);
    } catch (err) {
      console.error("Failed to load artist artworks:", err);
      setArts([]);
    } finally {
      setLoading(false);
    }
  };

  // Back to list
  const handleBack = () => {
    setSelected(null);
    setArts([]);
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
      <main style={{ flex: 1 }}>
        {selected ? (
          <ArtistProfileView
            artist={selected}
            arts={arts}
          />
        ) : (
          <ArtistListView
            artists={artists}
            allArts={allArts}
            onSelect={handleSelect}
          />
        )}
      </main>
    </div>
  );
}