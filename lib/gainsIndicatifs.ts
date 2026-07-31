import data from "@/lib/data/gains-indicatifs.json";

// Estimations indicatives par marque/modèle/année, dérivées d'ordres de
// grandeur généraux observés dans l'industrie de la reprogrammation pour
// chaque famille de moteur (retours clients, presse spécialisée, fabricants
// de boîtiers/cartographies) — PAS des données mesurées par AMK, et pas
// extraites d'un préparateur concurrent en particulier.
//
// Les valeurs Stage 1 / Stage 2 / E85 sont recalculées ici à partir de la
// puissance/couple d'origine et du pourcentage de gain type de chaque ligne,
// pour rester cohérentes (le fichier source contenait des cellules absolues
// désynchronisées de leur propre colonne de gain %).
//
// Le fichier source génère aussi, pour chaque modèle/année, plusieurs
// "appellations commerciales" fictives (ex. BMW M2 -> "82i/116i/144i") en
// appliquant un facteur -30%/référence/+25% même sur des modèles mono-
// version — ces badges n'existent pas réellement et ne sont jamais affichés
// ni stockés ici : seule la variante de référence (médiane) est conservée,
// avec la "Motorisation (détail)" du fichier (stable entre les 3 variantes).
//
// Les modèles Mercedes-AMG (Classe A45/C63/E63 AMG, AMG GT) ne figurent dans
// aucun des fichiers fournis (uniquement des lignes "Classe A/C/E"
// génériques) ; ces 4 entrées ont été complétées manuellement à partir des
// fiches constructeur publiques (mêmes blocs moteur que ceux déjà utilisés
// dans lib/vehicleData.ts), avec des gains estimés selon la même méthode que
// le reste du fichier.
export type GainIndicatif = {
  marque: string;
  modele: string;
  annee: number;
  motorisation: string | null;
  carburant: string | null;
  chOrigine: number | null;
  nmOrigine: number | null;
  chStage1: number | null;
  nmStage1: number | null;
  chStage2: number | null;
  nmStage2: number | null;
  chE85: number | null;
  nmE85: number | null;
  remarque: string | null;
};

type RawRow = {
  marque: string;
  modele: string;
  annee: number;
  motorisation: string | null;
  carburant: string | null;
  chOrigine: number | null;
  nmOrigine: number | null;
  chStage1: number | null;
  nmStage1: number | null;
  chStage2: number | null;
  nmStage2: number | null;
  chE85: number | null;
  nmE85: number | null;
  r: number | null;
};

const { remarques, rows } = data as { remarques: string[]; rows: RawRow[] };

const GAINS_INDICATIFS: GainIndicatif[] = rows.map((row) => ({
  ...row,
  remarque: row.r === null ? null : remarques[row.r],
}));

export function getGainIndicatif(
  marque: string,
  modele: string,
  annee: number
): GainIndicatif | null {
  return (
    GAINS_INDICATIFS.find(
      (row) => row.marque === marque && row.modele === modele && row.annee === annee
    ) ?? null
  );
}

export function getMarquesIndicatifs(): string[] {
  return Array.from(new Set(GAINS_INDICATIFS.map((row) => row.marque)));
}

export function getModelesIndicatifs(marque: string): string[] {
  return Array.from(
    new Set(
      GAINS_INDICATIFS.filter((row) => row.marque === marque).map((row) => row.modele)
    )
  );
}

export function hasGainIndicatif(marque: string, modele: string): boolean {
  return GAINS_INDICATIFS.some(
    (row) => row.marque === marque && row.modele === modele
  );
}

export function getAnneesDisponibles(marque: string, modele: string): number[] {
  return Array.from(
    new Set(
      GAINS_INDICATIFS.filter(
        (row) => row.marque === marque && row.modele === modele
      ).map((row) => row.annee)
    )
  ).sort((a, b) => a - b);
}
