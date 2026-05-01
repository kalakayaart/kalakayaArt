import { Artist, Art } from "@/Types/artist";

export default function ArtistWorksList({
  artist,
  arts,
  selectedArt,
  setSelectedArt,
}: {
  artist: Artist;
  arts: Art[];
  selectedArt: Art | null;
  setSelectedArt: (a: Art) => void;
}) {
  return (
    <div>
      <h2>{artist.full_name}</h2>

      {arts.map((art) => (
        <div key={art.id} onClick={() => setSelectedArt(art)}>
          {art.title}
        </div>
      ))}
    </div>
  );
}