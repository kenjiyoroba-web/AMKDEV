"use client";

import { Check } from "lucide-react";
import { useMemo, useState } from "react";
import { Button, Container } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import type { Forfait } from "@/lib/supabase/types";

export function ForfaitsGrid({ forfaits }: { forfaits: Forfait[] }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const selectedNoms = useMemo(
    () =>
      forfaits
        .filter((forfait) => selected.has(forfait.id))
        .map((forfait) => forfait.nom),
    [forfaits, selected]
  );

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className={selectedNoms.length > 0 ? "pb-28" : undefined}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {forfaits.map((forfait, index) => {
          const highlighted = Boolean(forfait.badge);
          const surDevis = forfait.prix === null;
          const isSelected = selected.has(forfait.id);

          return (
            <Reveal key={forfait.id} delay={index * 70}>
            <div
              className={`relative flex h-full flex-col border p-6 transition-colors ${
                highlighted
                  ? "border-accent bg-surface"
                  : isSelected
                    ? "border-accent bg-accent-soft"
                    : "border-border bg-background"
              }`}
            >
              {forfait.badge ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-accent px-3 py-1 font-heading text-[11px] tracking-wide text-white">
                  {forfait.badge}
                </span>
              ) : null}

              <label className="absolute right-4 top-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggle(forfait.id)}
                  className="peer sr-only"
                />
                <span className="flex h-5 w-5 items-center justify-center border border-border bg-background text-transparent transition-colors peer-checked:border-accent peer-checked:bg-accent peer-checked:text-white">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="sr-only">
                  Ajouter {forfait.nom} à la sélection
                </span>
              </label>

              <h3 className="pr-8 font-heading text-lg leading-tight">
                {forfait.nom}
              </h3>

              <div className="mt-4">
                {surDevis ? (
                  <span className="font-heading text-2xl">Sur devis</span>
                ) : (
                  <>
                    <span className="block text-xs text-muted normal-case">
                      à partir de
                    </span>
                    <span className="font-heading text-3xl">
                      <Counter value={forfait.prix ?? 0} suffix=" €" />{" "}
                      <span className="text-xs font-normal text-muted">
                        TTC
                      </span>
                    </span>
                  </>
                )}
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted normal-case">
                {forfait.description}
              </p>

              <Button
                href={`/contact?sujet=${encodeURIComponent(forfait.nom)}`}
                variant={highlighted ? "primary" : "outline"}
                className="mt-6"
              >
                {surDevis ? "Demander un devis" : "Réserver"}
              </Button>
            </div>
            </Reveal>
          );
        })}
      </div>

      {selectedNoms.length > 0 ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-accent/40 bg-surface/95 backdrop-blur">
          <Container className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <span className="font-heading text-xs tracking-[0.2em] text-accent">
                {selectedNoms.length} forfait
                {selectedNoms.length > 1 ? "s" : ""} sélectionné
                {selectedNoms.length > 1 ? "s" : ""}
              </span>
              <p className="mt-1 truncate text-sm text-muted normal-case">
                {selectedNoms.join(" · ")}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-4">
              <button
                type="button"
                onClick={() => setSelected(new Set())}
                className="font-heading text-xs tracking-wide text-muted hover:text-accent"
              >
                Effacer
              </button>
              <Button
                href={`/contact?sujet=${encodeURIComponent(selectedNoms.join(", "))}`}
                variant="primary"
              >
                Demander un devis groupé
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </div>
  );
}
