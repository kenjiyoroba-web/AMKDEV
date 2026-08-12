"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { PowerCurveChart } from "@/components/PowerCurveChart";
import { VehiclePlaceholder } from "@/components/VehiclePlaceholder";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import type { Realisation } from "@/lib/supabase/types";

const STAGE_FILTERS = [0, 1, 2, 3, 4] as const;

export function RealisationsGallery({
  realisations,
}: {
  realisations: Realisation[];
}) {
  const [stage, setStage] = useState<(typeof STAGE_FILTERS)[number]>(0);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(
    null
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightbox]);

  const filtered = useMemo(
    () =>
      stage === 0
        ? realisations
        : realisations.filter((item) => item.stage === stage),
    [realisations, stage]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {STAGE_FILTERS.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setStage(value)}
            className={`border px-4 py-2 font-heading text-xs tracking-wide transition-colors ${
              stage === value
                ? "border-accent bg-accent text-white"
                : "border-border text-foreground/70 hover:border-accent hover:text-accent"
            }`}
          >
            {value === 0 ? "Tous" : `Stage ${value}`}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-sm text-muted normal-case">
          Aucune réalisation pour ce stage pour le moment.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {filtered.map((item, itemIndex) => (
            <Reveal key={item.id} delay={(itemIndex % 2) * 80}>
              <div className="border border-border bg-surface">
                <div className="p-6 pb-0">
                  <div className="group relative mx-auto aspect-[4/5] w-full max-w-[330px] overflow-hidden">
                    {item.image_url ? (
                      <button
                        type="button"
                        onClick={() =>
                          setLightbox({
                            src: item.image_url as string,
                            alt: `${item.marque} ${item.modele}`,
                          })
                        }
                        className="absolute inset-0 h-full w-full cursor-zoom-in"
                        aria-label={`Agrandir la photo ${item.marque} ${item.modele}`}
                      >
                        <Image
                          src={item.image_url}
                          alt={`${item.marque} ${item.modele}`}
                          fill
                          sizes="330px"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        />
                      </button>
                    ) : (
                      <VehiclePlaceholder className="h-full w-full" />
                    )}
                    <span className="pointer-events-none absolute left-3 top-3 bg-accent px-3 py-1.5 font-heading text-xs tracking-wide text-white">
                      Stage {item.stage}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-baseline justify-between">
                    <span className="font-heading text-xs tracking-[0.2em] text-muted">
                      Passage au banc
                    </span>
                    <span className="font-heading text-sm">
                      {item.marque} {item.modele} · Stage {item.stage}
                    </span>
                  </div>

                  <PowerCurveChart
                    chOrigine={item.ch_origine}
                    chFinal={item.ch_final}
                    stageLabel={`Stage ${item.stage}`}
                    className="mt-4 w-full"
                  />

                  <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-4 text-sm normal-case">
                    <span className="text-muted">
                      {item.ch_origine} →{" "}
                      <span className="text-accent">
                        <Counter value={item.ch_final} suffix=" ch" />
                      </span>
                      {item.delta_ch ? (
                        <span className="text-accent">
                          {" "}
                          (+<Counter value={item.delta_ch} />)
                        </span>
                      ) : null}
                      {item.carburant ? (
                        <span className="text-muted"> ({item.carburant})</span>
                      ) : null}
                    </span>
                    {item.couple_nm ? (
                      <span className="text-muted">
                        Couple :{" "}
                        <span className="text-foreground">
                          <Counter value={item.couple_nm} suffix=" Nm" />
                        </span>
                        {item.delta_couple_nm ? (
                          <span className="text-accent">
                            {" "}
                            (+<Counter value={item.delta_couple_nm} />)
                          </span>
                        ) : null}
                      </span>
                    ) : null}
                    {item.zero_cent ? (
                      <span className="text-muted">
                        0-100 : <span className="text-foreground">{item.zero_cent}s</span>
                      </span>
                    ) : null}
                    {item.cent_deux_cent ? (
                      <span className="text-muted">
                        100-200 : <span className="text-foreground">{item.cent_deux_cent}s</span>
                      </span>
                    ) : null}
                  </div>

                  {item.description ? (
                    <ul className="mt-3 flex flex-col gap-1.5 text-sm leading-relaxed text-muted normal-case">
                      {item.description
                        .replace(/\.$/, "")
                        .split(",")
                        .map((part) => part.trim())
                        .filter(Boolean)
                        .map((part, partIndex) => (
                          <li key={partIndex} className="flex gap-2">
                            <span className="text-accent">•</span>
                            <span>{part}</span>
                          </li>
                        ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {lightbox ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 sm:p-10"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center border border-border text-foreground/80 transition-colors hover:border-accent hover:text-accent"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <div
            className="relative h-full max-h-[85vh] w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
