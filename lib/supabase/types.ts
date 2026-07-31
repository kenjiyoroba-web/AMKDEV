export type Forfait = {
  id: string;
  nom: string;
  prix: number | null;
  description: string | null;
  badge: string | null;
  ordre_affichage: number;
};

export type Marque = {
  id: string;
  nom: string;
  logo_url: string | null;
};

export type Realisation = {
  id: string;
  marque: string;
  modele: string;
  stage: number;
  ch_origine: number;
  ch_final: number;
  couple_nm: number | null;
  couple_nm_origine: number | null;
  zero_cent: number | null;
  cent_deux_cent: number | null;
  delta_ch: number | null;
  delta_couple_nm: number | null;
  image_url: string | null;
  ordre_affichage: number;
  carburant: string | null;
  description: string | null;
};
