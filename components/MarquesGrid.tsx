"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { Marque } from "@/lib/supabase/types";

export function MarquesGrid({ marques }: { marques: Marque[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return marques;
    return marques.filter((marque) => marque.nom.toLowerCase().includes(q));
  }, [marques, query]);

  return (
    <div>
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Rechercher une marque…"
          className="w-full border border-border bg-surface py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-sm text-muted normal-case">
          Aucune marque ne correspond à &laquo;&nbsp;{query}&nbsp;&raquo;.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden border border-border bg-border sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
          {filtered.map((marque) => (
            <div
              key={marque.id}
              className="flex flex-col items-center justify-center gap-2 bg-background px-2 py-4 text-center"
            >
              {marque.logo_url ? (
                <span className="flex h-9 w-9 items-center justify-center bg-white p-1.5">
                  <Image
                    src={marque.logo_url}
                    alt={marque.nom}
                    width={40}
                    height={40}
                    className="h-full w-full object-contain"
                  />
                </span>
              ) : (
                <span className="flex h-6 w-6 items-center justify-center border border-border font-heading text-[10px] text-accent">
                  {marque.nom.slice(0, 2).toUpperCase()}
                </span>
              )}
              <span className="text-xs text-foreground/80 normal-case">
                {marque.nom}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
