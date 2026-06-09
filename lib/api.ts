//    import { Artist, Art } from "../Types/artist";

// // Determine API URL dynamically
// const getApiUrl = (): string => {
//   // Browser → use relative API path
//   if (typeof window !== "undefined") {
//     return "/api";
//  }

//   // Server-side (SSR)
//   const base =
//     process.env.NEXT_PUBLIC_API_URL ||
//     "https://kalakaya.art";

//   // Avoid double /api
//   return base.endsWith("/api")
//     ? base
//     : `${base}/api`;
// };

// // 🔹 Generic fetch helper
// async function apiFetch<T>(                                          
//   endpoint: string
// ): Promise<T> {
//   const API_URL = getApiUrl();

//   const res = await fetch(
//     `${API_URL}${endpoint}`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) {
//     const text = await res.text();

//     throw new Error(
//       `API Error ${res.status}: ${text}`
//     );
//   }

//   return res.json() as Promise<T>;
//   };

// // 🔹 Fetch all artworks
// export const fetchAllArts =
//   async (): Promise<Art[]> => {
//     return apiFetch<Art[]>("/arts");
//   };

// // 🔹 Fetch artworks by artist
// export const fetchArtsByArtist = async (
//   artistId: number
// ): Promise<Art[]> => {
//   try {
//     return await apiFetch<Art[]>(
//       `/arts?artist_id=${artistId}`
//     );
//   } catch {
//     return apiFetch<Art[]>(
//       `/arts/artist/${artistId}`
//     );
//   }
// };

// // Export helper if needed elsewhere
// export { getApiUrl };
import { Artist, Art } from "../Types/artist";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

const API_URL = `${API_BASE}/api`;

// 🔹 Generic fetch helper
async function apiFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error ${res.status}: ${text}`);
  }

  return res.json() as Promise<T>;
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

export { API_BASE };