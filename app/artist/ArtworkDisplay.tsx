import { Art } from "@/Types/artist";

export default function ArtworkDisplay({ art }: { art: Art | null }) {
  if (!art) return <div>No artwork selected</div>;

  return (
    <div>
      <img src={art.image_url} alt={art.title} />
      <h3>{art.title}</h3>
      <p>{art.year}</p>
      <p>{art.medium}</p>
    </div>
  );
}