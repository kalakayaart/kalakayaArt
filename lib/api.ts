import { Artist, Art } from "../Types/artist";

const getApiUrl = (): string => {
  if (typeof window !== "undefined") {
    return "/api";
  }

  const base =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://kalakaya.art";

  return base.endsWith("/api")
    ? base
    : `${base}/api`;
};

async function apiFetch<T>(
  endpoint: string
): Promise<T> {
  const API_URL = getApiUrl();

  const res = await fetch(
    `${API_URL}${endpoint}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const text = await res.text();

    throw new Error(
      `API Error ${res.status}: ${text}`
    );
  }

  return res.json() as Promise<T>;
}

export const fetchAllArts =
  async (): Promise<Art[]> => {
    return apiFetch<Art[]>("/arts");
  };

export const fetchArtsByArtist = async (
  artistId: number
): Promise<Art[]> => {
  try {
    return await apiFetch<Art[]>(
      `/arts?artist_id=${artistId}`
    );
  } catch {
    return apiFetch<Art[]>(
      `/arts/artist/${artistId}`
    );
  }
};

export { getApiUrl };
