-- Colonnes complémentaires pour restituer fidèlement le contenu des publications
-- Instagram (carburant utilisé pour le chiffre final annoncé, résumé des modifications).

alter table public.realisations
  add column if not exists carburant text,
  add column if not exists description text;
