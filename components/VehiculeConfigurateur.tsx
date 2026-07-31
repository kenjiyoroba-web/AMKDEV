"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { VehiclePlaceholder } from "@/components/VehiclePlaceholder";
import { Button } from "@/components/ui";
import { MARQUES_MODELES } from "@/lib/vehicleData";
import {
  getAnneesDisponibles,
  getGainIndicatif,
  getMarquesIndicatifs,
  getModelesIndicatifs,
} from "@/lib/gainsIndicatifs";
import type { Realisation } from "@/lib/supabase/types";

const selectClass =
  "w-full border border-border bg-surface px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none normal-case";

function GainCell({
  origine,
  valeur,
  unite,
}: {
  origine: number | null;
  valeur: number | null;
  unite: string;
}) {
  if (valeur === null || origine === null) return <span className="text-muted">—</span>;
  const delta = valeur - origine;
  return (
    <span className="text-muted">
      {origine} → <span className="text-foreground">{valeur} {unite}</span>
      {delta > 0 ? <span className="text-accent"> (+{delta})</span> : null}
    </span>
  );
}

export function VehiculeConfigurateur({
  realisations,
}: {
  realisations: Realisation[];
}) {
  // Les intitulés dans `realisations` viennent des légendes Instagram et sont
  // parfois plus précis que la liste générique (ex. "RS3 8V2", "Polo WRC",
  // "R7") : on fusionne les deux pour que chaque réalisation réelle reste
  // sélectionnable, sans jamais la faire correspondre par approximation à un
  // autre modèle.
  const marques = useMemo(
    () =>
      Array.from(
        new Set([
          ...Object.keys(MARQUES_MODELES),
          ...realisations.map((r) => r.marque),
          ...getMarquesIndicatifs(),
        ])
      ).sort((a, b) => a.localeCompare(b, "fr")),
    [realisations]
  );
  const [marque, setMarque] = useState(marques[0] ?? "");
  const modeles = useMemo(() => {
    const fromRealisations = realisations
      .filter((r) => r.marque === marque)
      .map((r) => r.modele);
    return Array.from(
      new Set([
        ...(MARQUES_MODELES[marque] ?? []),
        ...fromRealisations,
        ...getModelesIndicatifs(marque),
      ])
    ).sort((a, b) => a.localeCompare(b, "fr"));
  }, [marque, realisations]);
  const [modele, setModele] = useState(modeles[0] ?? "");

  useEffect(() => {
    if (!modeles.includes(modele)) {
      setModele(modeles[0] ?? "");
    }
    // On ne veut réagir qu'aux changements de marque (la liste de modèles en découle).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marque]);

  const realRows = useMemo(
    () =>
      realisations
        .filter((r) => r.marque === marque && r.modele === modele)
        .sort((a, b) => a.stage - b.stage || a.ordre_affichage - b.ordre_affichage),
    [realisations, marque, modele]
  );

  const anneesDisponibles = useMemo(
    () => (realRows.length === 0 ? getAnneesDisponibles(marque, modele) : []),
    [marque, modele, realRows.length]
  );
  const [annee, setAnnee] = useState<number | null>(null);

  useEffect(() => {
    setAnnee(anneesDisponibles.length > 0 ? anneesDisponibles[anneesDisponibles.length - 1] : null);
  }, [marque, modele, anneesDisponibles]);

  const indicatif =
    realRows.length === 0 && annee !== null
      ? getGainIndicatif(marque, modele, annee)
      : null;

  const contactHref = `/contact?${new URLSearchParams({
    sujet: "Devis reprogrammation",
    marque,
    modele,
  }).toString()}`;

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:max-w-xl sm:grid-cols-2">
        <div>
          <label
            htmlFor="configurateur-marque"
            className="mb-2 block font-heading text-xs tracking-[0.15em] text-muted"
          >
            Marque
          </label>
          <select
            id="configurateur-marque"
            value={marque}
            onChange={(event) => setMarque(event.target.value)}
            className={selectClass}
          >
            {marques.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="configurateur-modele"
            className="mb-2 block font-heading text-xs tracking-[0.15em] text-muted"
          >
            Modèle
          </label>
          <select
            id="configurateur-modele"
            value={modele}
            onChange={(event) => setModele(event.target.value)}
            className={selectClass}
          >
            {modeles.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {anneesDisponibles.length > 0 ? (
          <div>
            <label
              htmlFor="configurateur-annee"
              className="mb-2 block font-heading text-xs tracking-[0.15em] text-muted"
            >
              Année
            </label>
            <select
              id="configurateur-annee"
              value={annee ?? ""}
              onChange={(event) => setAnnee(Number(event.target.value))}
              className={selectClass}
            >
              {anneesDisponibles.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ) : null}
      </div>

      {realRows.length > 0 ? (
        <div className="mt-8 overflow-x-auto border border-border">
          <table className="w-full min-w-[720px] border-collapse text-sm normal-case">
            <thead>
              <tr className="border-b border-border bg-surface text-left font-heading text-xs tracking-wide text-muted">
                <th className="px-5 py-4">Véhicule</th>
                <th className="px-5 py-4">Étage</th>
                <th className="px-5 py-4">Carburant</th>
                <th className="px-5 py-4">Puissance</th>
                <th className="px-5 py-4">Couple</th>
                <th className="px-5 py-4">100-200 km/h</th>
              </tr>
            </thead>
            <tbody>
              {realRows.map((row) => (
                <tr key={row.id} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-4">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-border">
                      {row.image_url ? (
                        <Image
                          src={row.image_url}
                          alt={`${row.marque} ${row.modele}`}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      ) : (
                        <VehiclePlaceholder className="h-full w-full" />
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="bg-accent px-2.5 py-1 font-heading text-xs tracking-wide text-white">
                      Stage {row.stage}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-muted">{row.carburant ?? "—"}</td>
                  <td className="px-5 py-4 text-muted">
                    {row.ch_origine} → <span className="text-foreground">{row.ch_final} ch</span>
                    {row.delta_ch ? (
                      <span className="text-accent"> (+{row.delta_ch})</span>
                    ) : null}
                  </td>
                  <td className="px-5 py-4 text-muted">
                    {row.couple_nm_origine ? `${row.couple_nm_origine} → ` : ""}
                    <span className="text-foreground">{row.couple_nm} Nm</span>
                    {row.delta_couple_nm ? (
                      <span className="text-accent"> (+{row.delta_couple_nm})</span>
                    ) : null}
                  </td>
                  <td className="px-5 py-4 text-muted">
                    {row.cent_deux_cent ? `${row.cent_deux_cent}s` : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="border-t border-border px-5 py-4 text-xs text-muted normal-case">
            Chiffres réels, mesurés au banc sur ce véhicule — aucune
            estimation.
          </p>
        </div>
      ) : indicatif ? (
        <div className="mt-8">
          <p className="text-sm normal-case">
            <span className="font-heading text-xs tracking-[0.15em] text-accent">
              Motorisation {annee}
            </span>
            <span className="ml-2 text-foreground/90">
              {indicatif.motorisation ?? "—"}
            </span>
            {indicatif.carburant ? (
              <span className="text-muted"> · {indicatif.carburant}</span>
            ) : null}
          </p>

          <div className="mt-4 overflow-x-auto border border-border">
            <table className="w-full min-w-[560px] border-collapse text-sm normal-case">
              <thead>
                <tr className="border-b border-border bg-surface text-left font-heading text-xs tracking-wide text-muted">
                  <th className="px-5 py-4">Modification</th>
                  <th className="px-5 py-4">Puissance</th>
                  <th className="px-5 py-4">Couple</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-5 py-4">
                    <span className="bg-surface-2 px-2.5 py-1 font-heading text-xs tracking-wide text-foreground/90">
                      Stage 1
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <GainCell origine={indicatif.chOrigine} valeur={indicatif.chStage1} unite="ch" />
                  </td>
                  <td className="px-5 py-4">
                    <GainCell origine={indicatif.nmOrigine} valeur={indicatif.nmStage1} unite="Nm" />
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-5 py-4">
                    <span className="bg-surface-2 px-2.5 py-1 font-heading text-xs tracking-wide text-foreground/90">
                      Stage 2
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <GainCell origine={indicatif.chOrigine} valeur={indicatif.chStage2} unite="ch" />
                  </td>
                  <td className="px-5 py-4">
                    <GainCell origine={indicatif.nmOrigine} valeur={indicatif.nmStage2} unite="Nm" />
                  </td>
                </tr>
                <tr className="border-b border-border last:border-b-0">
                  <td className="px-5 py-4">
                    <span className="bg-surface-2 px-2.5 py-1 font-heading text-xs tracking-wide text-foreground/90">
                      Conversion E85
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <GainCell origine={indicatif.chOrigine} valeur={indicatif.chE85} unite="ch" />
                  </td>
                  <td className="px-5 py-4">
                    <GainCell origine={indicatif.nmOrigine} valeur={indicatif.nmE85} unite="Nm" />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="border-t border-border px-5 py-4">
              <p className="text-xs font-medium text-accent normal-case">
                Estimation indicative — non mesurée par AMK
              </p>
              <p className="mt-1 text-xs text-muted normal-case">
                Ordre de grandeur généralement observé pour ce type de moteur,
                pas un résultat garanti sur votre véhicule. Un banc de
                puissance avant/après reste nécessaire pour un chiffre exact.
                {indicatif.remarque ? ` ${indicatif.remarque}` : ""}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-start gap-4 border border-border bg-surface px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-heading text-sm">
              Pas encore de résultat mesuré pour {marque} {modele}
            </p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted normal-case">
              L&apos;atelier prend en charge ce véhicule, mais aucun passage
              au banc n&apos;a encore été documenté ici. Demandez un devis
              gratuit pour une estimation sur votre exemplaire.
            </p>
          </div>
          <Button href={contactHref} variant="primary" className="shrink-0">
            Demander un devis
          </Button>
        </div>
      )}
    </div>
  );
}
