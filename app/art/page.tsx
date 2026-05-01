import ArtPage from "./ArtPage";
import { fetchAllArts } from "@/lib/api";
import { Art } from "@/Types/artist";

// ✅ Force dynamic rendering so Next.js doesn't try to prerender this page during build
export const dynamic = "force-dynamic";

// ✅ Server Component (Next.js App Router)
export default async function Page() {
  let arts: Art[] = [];

  try {
    arts = await fetchAllArts();
  } catch (error) {
    console.error("Failed to fetch arts:", error);
    arts = [];
  }

  return <ArtPage arts={arts} />;
}