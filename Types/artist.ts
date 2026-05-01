export interface Artist {
  id: number;
  full_name: string;
  photo_url: string;
  bio: string;
  cv: string;
  exhibitions: string;
  nationality: string;
  birth_year: number | null;
  death_year: number | null;
  email: string;
  website: string;
}

export interface Art {
  id: number;
  artist_id: number;
  artist_name: string;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  image_url: string;
  description: string;
  enquire: string;
  exhibited: string;
  publication: string;
  provenance: string;
  price: number | null;
  status: string;
}