-- couple_nm_origine : couple constructeur (avant intervention), pour pouvoir
-- calculer le delta de couple au même titre que le delta de puissance.
-- cent_deux_cent : chrono 100->200 km/h, la mesure qu'AMK publie réellement
-- sur ses réalisations (elle ne communique jamais de vrai 0-100).
alter table public.realisations
  add column if not exists couple_nm_origine integer,
  add column if not exists cent_deux_cent numeric(4,2);

-- Delta calculés automatiquement : toujours cohérents avec origine/final,
-- pas besoin de les maintenir à la main.
alter table public.realisations
  add column if not exists delta_ch integer generated always as (ch_final - ch_origine) stored,
  add column if not exists delta_couple_nm integer generated always as (couple_nm - couple_nm_origine) stored;
