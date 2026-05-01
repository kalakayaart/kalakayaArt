import { Artist, Art } from "../Types/artist";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

// 🔹 Generic fetch helper
async function apiFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error ${res.status}: ${text}`);
  }

  return res.json() as Promise<T>; // ✅ ensure correct typing
}

// 🔹 Artists
export const fetchArtists = async (): Promise<Artist[]> => {
  return apiFetch<Artist[]>("/artists");
};

// 🔹 All artworks
export const fetchAllArts = async (): Promise<Art[]> => {
  return apiFetch<Art[]>("/arts");
};

// 🔹 Arts by artist
export const fetchArtsByArtist = async (
  artistId: number
): Promise<Art[]> => {
  try {
    return await apiFetch<Art[]>(`/arts?artist_id=${artistId}`);
  } catch {
    return apiFetch<Art[]>(`/arts/artist/${artistId}`);
  }
};
