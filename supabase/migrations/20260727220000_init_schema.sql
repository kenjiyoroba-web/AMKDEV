-- AMK Développement — schema initial
-- realisations / forfaits / marques : lecture publique (anon + authenticated)
-- devis_requests : aucune policy -> accessible uniquement via la service_role key (serveur), jamais côté client

create extension if not exists "pgcrypto";

-- ─── realisations ──────────────────────────────────────────────────────────

create table if not exists public.realisations (
  id uuid primary key default gen_random_uuid(),
  marque text not null,
  modele text not null,
  stage smallint not null check (stage between 1 and 4),
  ch_origine integer not null check (ch_origine > 0),
  ch_final integer not null check (ch_final >= ch_origine),
  couple_nm integer,
  zero_cent numeric(4,2),
  image_url text,
  ordre_affichage integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists realisations_ordre_idx
  on public.realisations (ordre_affichage, created_at desc);

alter table public.realisations enable row level security;

create policy "realisations_public_read"
  on public.realisations
  for select
  to anon, authenticated
  using (true);

-- ─── forfaits ───────────────────────────────────────────────────────────────

create table if not exists public.forfaits (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  prix numeric(10,2),
  description text,
  badge text,
  ordre_affichage integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists forfaits_ordre_idx
  on public.forfaits (ordre_affichage);

alter table public.forfaits enable row level security;

create policy "forfaits_public_read"
  on public.forfaits
  for select
  to anon, authenticated
  using (true);

-- ─── marques ────────────────────────────────────────────────────────────────

create table if not exists public.marques (
  id uuid primary key default gen_random_uuid(),
  nom text not null unique,
  logo_url text,
  created_at timestamptz not null default now()
);

create index if not exists marques_nom_idx
  on public.marques (nom);

alter table public.marques enable row level security;

create policy "marques_public_read"
  on public.marques
  for select
  to anon, authenticated
  using (true);

-- ─── devis_requests ─────────────────────────────────────────────────────────

create table if not exists public.devis_requests (
  id uuid primary key default gen_random_uuid(),
  civilite text not null check (civilite in ('M.', 'Mme')),
  sujet text not null,
  prenom text not null,
  nom text not null,
  email text not null,
  telephone text not null,
  vehicule_marque text,
  vehicule_modele text,
  motorisation_annee text,
  message text,
  statut text not null default 'nouveau' check (statut in ('nouveau', 'traité')),
  created_at timestamptz not null default now()
);

create index if not exists devis_requests_statut_idx
  on public.devis_requests (statut, created_at desc);

alter table public.devis_requests enable row level security;
-- Aucune policy créée volontairement : anon et authenticated n'ont donc aucun
-- accès (ni lecture, ni écriture). Seule la service_role key contourne RLS ;
-- elle n'est utilisée que côté serveur (Server Action), jamais exposée au client.
