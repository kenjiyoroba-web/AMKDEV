"use client";

import { useRef, useState } from "react";
import { Eyebrow, SectionHeading } from "@/components/ui";
import { MarquesGrid } from "@/components/MarquesGrid";
import { VehiculeConfigurateur } from "@/components/VehiculeConfigurateur";
import { MARQUES_MODELES } from "@/lib/vehicleData";
import type { Marque, Realisation } from "@/lib/supabase/types";

export function MarquesConfigurateurSection({
  marques,
  realisations,
}: {
  marques: Marque[];
  realisations: Realisation[];
}) {
  const [selectedMarque, setSelectedMarque] = useState(
    Object.keys(MARQUES_MODELES)[0] ?? ""
  );
  const configurateurRef = useRef<HTMLDivElement>(null);

  function handleMarqueClick(nom: string) {
    setSelectedMarque(nom);
    configurateurRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <div ref={configurateurRef}>
        <SectionHeading
          eyebrow="Configurateur"
          title="Trouvez votre véhicule"
          description="Choisissez une marque, un modèle, une génération et une motorisation parmi ceux pris en charge par l'atelier. Si ce véhicule est déjà passé au banc, les gains réels de puissance et de couple s'affichent étage par étage ; sinon, demandez un devis gratuit pour une estimation."
        />

        <div className="mt-10">
          <VehiculeConfigurateur
            realisations={realisations}
            marque={selectedMarque}
            onMarqueChange={setSelectedMarque}
          />
        </div>
      </div>

      <div className="mt-20">
        <Eyebrow>Marques</Eyebrow>
        <h2 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">
          Toutes les marques prises en charge
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted normal-case">
          Spécialiste reconnu du groupe VAG, de BMW M et Mercedes-AMG,
          l&apos;atelier intervient sur la plupart des marques, sportives ou
          non. Cliquez sur un logo pour lancer directement le configurateur
          ci-dessus avec la marque déjà sélectionnée.
        </p>

        <div className="mt-10">
          <MarquesGrid marques={marques} onSelect={handleMarqueClick} />
        </div>
      </div>
    </>
  );
}
