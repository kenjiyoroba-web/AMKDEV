"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { VehiclePlaceholder } from "@/components/VehiclePlaceholder";
import { Button } from "@/components/ui";
import {
  MARQUES_MODELES,
  getGenerations,
  type Carburant,
} from "@/lib/vehicleData";
import {
  getAnneesDisponibles,
  getGainIndicatif,
  getMarquesIndicatifs,
  getModelesIndicatifs,
} from "@/lib/gainsIndicatifs";
import type { Realisation } from "@/lib/supabase/types";

const selectClass =
  "w-full border border-border bg-surface px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none normal-case";

const CARBURANT_ORDER: Carburant[] = ["Essence", "Diesel", "Électrique"];

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

function MotorisationPicker({
  motorisations,
  selected,
  onSelect,
}: {
  motorisations: { nom: string; carburant: Carburant; chOrigine?: number }[];
  selected: string | null;
  onSelect: (nom: string) => void;
}) {
  const groups = CARBURANT_ORDER.map((carburant) => ({
    carburant,
    items: motorisations.filter((motorisation) => motorisation.carburant === carburant),
  })).filter((group) => group.items.length > 0);

  if (groups.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <div key={group.carburant}>
          <p className="mb-3 font-heading text-xs tracking-[0.15em] text-muted">
            {group.carburant}
          </p>
          <div className="flex flex-col gap-2">
            {group.items.map((motorisation) => (
              <button
                key={motorisation.nom}
                type="button"
                onClick={() => onSelect(motorisation.nom)}
                className={`flex items-center justify-between gap-3 border px-4 py-3 text-left text-sm normal-case transition-colors ${
                  selected === motorisation.nom
                    ? "border-accent bg-accent-soft text-foreground"
                    : "border-border bg-surface text-foreground/90 hover:border-accent/50"
                }`}
              >
                <span>{motorisation.nom}</span>
                {motorisation.chOrigine ? (
                  <span className="shrink-0 text-xs text-muted">{motorisation.chOrigine} ch</span>
                ) : null}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function VehiculeConfigurateur({
  realisations,
  marque,
  onMarqueChange,
}: {
  realisations: Realisation[];
  marque: string;
  onMarqueChange: (marque: string) => void;
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

  // Aucune présélection : tant que l'utilisateur n'a pas choisi explicitement
  // un modèle, une génération ou une motorisation, ces étapes restent vides
  // plutôt que de retomber sur le premier élément de chaque liste.
  const [modele, setModele] = useState<string | null>(null);

  useEffect(() => {
    setModele(null);
    // On ne veut réagir qu'aux changements de marque : un changement de
    // marque réinitialise systématiquement le modèle choisi.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marque]);

  const generations = useMemo(
    () => (modele ? getGenerations(marque, modele) : []),
    [marque, modele]
  );
  const [generationIndex, setGenerationIndex] = useState<number | null>(null);

  useEffect(() => {
    // Une seule génération connue (ou aucune) : rien à choisir, on
    // « sélectionne » implicitement la seule option possible. Plusieurs
    // générations : on attend un choix explicite de l'utilisateur.
    setGenerationIndex(generations.length === 1 ? 0 : null);
  }, [modele, generations]);

  const currentGeneration = generationIndex !== null ? generations[generationIndex] ?? null : null;
  const motorisations = currentGeneration?.motorisations ?? [];

  const [motorisationNom, setMotorisationNom] = useState<string | null>(null);

  useEffect(() => {
    setMotorisationNom(null);
  }, [marque, modele, generationIndex]);

  const anneesIndicatifDisponibles = useMemo(
    () => (modele ? getAnneesDisponibles(marque, modele) : []),
    [marque, modele]
  );

  // Le passage au banc et l'estimation indicative sont indexés par année
  // exacte : on résout automatiquement l'année la plus pertinente au sein de
  // la génération choisie (la plus récente pour laquelle on a une donnée),
  // sans imposer une 5e étape à l'utilisateur.
  const anneeResolue = useMemo(() => {
    if (!currentGeneration) return null;
    const candidates = anneesIndicatifDisponibles.filter((year) => {
      if (currentGeneration.yearFrom !== undefined && year < currentGeneration.yearFrom) {
        return false;
      }
      if (currentGeneration.yearTo !== undefined && year > currentGeneration.yearTo) {
        return false;
      }
      return true;
    });
    if (candidates.length > 0) return candidates[candidates.length - 1];
    return currentGeneration.yearTo ?? currentGeneration.yearFrom ?? null;
  }, [currentGeneration, anneesIndicatifDisponibles]);

  const realRows = useMemo(
    () =>
      realisations
        .filter((r) => r.marque === marque && r.modele === modele)
        .sort((a, b) => a.stage - b.stage || a.ordre_affichage - b.ordre_affichage),
    [realisations, marque, modele]
  );

  const selectedMotorisation = motorisations.find((m) => m.nom === motorisationNom) ?? null;

  // Le jeu de données indicatif ne connaît qu'une ligne par marque/modèle/
  // année (pas par motorisation précise) : si son carburant ne correspond
  // pas à la motorisation choisie par l'utilisateur (ex. moteur essence
  // sélectionné mais seule une ligne diesel existe pour cette année), on
  // n'affiche pas ce tableau plutôt que de présenter des gains qui ne
  // correspondent pas réellement au moteur demandé.
  const indicatifBrut =
    modele && realRows.length === 0 && anneeResolue !== null
      ? getGainIndicatif(marque, modele, anneeResolue)
      : null;
  const indicatif =
    indicatifBrut && selectedMotorisation && indicatifBrut.carburant
      ? indicatifBrut.carburant === selectedMotorisation.carburant
        ? indicatifBrut
        : null
      : indicatifBrut;

  // On n'affiche les résultats qu'une fois toutes les étapes réellement
  // nécessaires franchies explicitement : modèle choisi, puis génération
  // choisie si le modèle en a plusieurs, puis motorisation choisie si le
  // modèle en propose. Rien n'est jamais présélectionné pour sauter une
  // étape.
  const generationResolved = generations.length <= 1 || generationIndex !== null;
  const motorisationResolved = motorisations.length === 0 || motorisationNom !== null;
  const readyForResults = modele !== null && generationResolved && motorisationResolved;

  const contactHref = modele
    ? `/contact?${new URLSearchParams({
        sujet: "Devis reprogrammation",
        marque,
        modele,
        ...(anneeResolue !== null ? { annee: String(anneeResolue) } : {}),
        ...(motorisationNom ? { motorisation: motorisationNom } : {}),
      }).toString()}`
    : `/contact?${new URLSearchParams({ sujet: "Devis reprogrammation", marque }).toString()}`;

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:max-w-xl sm:grid-cols-2">
        <div>
          <label
            htmlFor="configurateur-marque"
            className="mb-2 block font-heading text-xs tracking-[0.15em] text-muted"
          >
            1. Marque
          </label>
          <select
            id="configurateur-marque"
            value={marque}
            onChange={(event) => onMarqueChange(event.target.value)}
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
            2. Modèle
          </label>
          <select
            id="configurateur-modele"
            value={modele ?? ""}
            onChange={(event) => setModele(event.target.value || null)}
            className={selectClass}
          >
            <option value="" disabled>
              Sélectionnez un modèle
            </option>
            {modeles.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {modele && generations.length > 1 ? (
          <div>
            <label
              htmlFor="configurateur-generation"
              className="mb-2 block font-heading text-xs tracking-[0.15em] text-muted"
            >
              3. Année / Génération
            </label>
            <select
              id="configurateur-generation"
              value={generationIndex ?? ""}
              onChange={(event) => setGenerationIndex(Number(event.target.value))}
              className={selectClass}
            >
              <option value="" disabled>
                Sélectionnez une année / génération
              </option>
              {generations.map((generation, index) => (
                <option key={generation.label} value={index}>
                  {generation.label}
                </option>
              ))}
            </select>
          </div>
        ) : null}
      </div>

      {motorisations.length > 0 ? (
        <div className="mt-8">
          <p className="mb-4 font-heading text-xs tracking-[0.15em] text-muted">
            {generations.length > 1 ? "4. " : "3. "}Motorisation
          </p>
          <MotorisationPicker
            motorisations={motorisations}
            selected={motorisationNom}
            onSelect={setMotorisationNom}
          />
        </div>
      ) : null}

      {!readyForResults ? null : realRows.length > 0 ? (
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
              Motorisation {anneeResolue}
            </span>
            <span className="ml-2 text-foreground/90">
              {motorisationNom ?? indicatif.motorisation ?? "—"}
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
