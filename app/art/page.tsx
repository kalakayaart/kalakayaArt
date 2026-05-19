"use client";

import { useEffect, useState } from "react";
import { Art } from "@/Types/artist";
import { fetchAllArts } from "@/lib/api";
import ArtPage from "./ArtPage";

export default function Page() {
  const [arts, setArts] = useState<Art[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const artsData = await fetchAllArts();
        setArts(artsData);
      } catch (err) {
        console.error("Failed to load arts:", err);
        setArts([]);
      }
    };

    loadData();
  }, []);

  return <ArtPage arts={arts} />;
}