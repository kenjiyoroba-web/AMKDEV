"use client";

import { useRef, useState } from "react";
import { Eyebrow, SectionHeading } from "@/components/ui";
import { MarquesGrid } from "@/components/MarquesGrid";
import { VehiculeConfigurateur } from "@/components/VehiculeConfigurateur";
import { Reveal } from "@/components/Reveal";
import type { Marque, Realisation } from "@/lib/supabase/types";

export function MarquesConfigurateurSection({
  marques,
  realisations,
}: {
  marques: Marque[];
  realisations: Realisation[];
}) {
  // Rien n'est présélectionné à l'arrivée sur la page : le configurateur ne
  // s'affiche qu'après un clic explicite sur une marque, et la grille des
  // marques reste le premier point d'entrée visible.
  const [selectedMarque, setSelectedMarque] = useState<string | null>(null);
  const configurateurRef = useRef<HTMLDivElement>(null);

  function handleMarqueClick(nom: string) {
    setSelectedMarque(nom);
    // Le configurateur vient d'apparaître (ou de changer de marque) : on
    // attend le rendu suivant pour être sûr que la ref pointe vers l'élément
    // avant de défiler vers lui.
    requestAnimationFrame(() => {
      configurateurRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <>
      {selectedMarque ? (
        <div ref={configurateurRef}>
          <SectionHeading
            eyebrow="Configurateur"
            title="Trouvez votre véhicule"
            description="Choisissez un modèle, une génération et une motorisation parmi ceux pris en charge par l'atelier. Si ce véhicule est déjà passé au banc, les gains réels de puissance et de couple s'affichent étage par étage ; sinon, demandez un devis gratuit pour une estimation."
          />

          <div className="mt-10">
            <VehiculeConfigurateur
              realisations={realisations}
              marque={selectedMarque}
              onMarqueChange={setSelectedMarque}
            />
          </div>
        </div>
      ) : null}

      <Reveal className={selectedMarque ? "mt-20" : ""}>
        <Eyebrow>Marques</Eyebrow>
        <h2 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">
          Toutes les marques prises en charge
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted normal-case">
          Spécialiste reconnu du groupe VAG et de BMW M, l&apos;atelier
          intervient sur la plupart des marques, sportives ou non. Cliquez
          sur un logo pour lancer le configurateur avec la marque déjà
          sélectionnée.
        </p>

        <div className="mt-10">
          <MarquesGrid marques={marques} onSelect={handleMarqueClick} />
        </div>
      </Reveal>
    </>
  );
}
