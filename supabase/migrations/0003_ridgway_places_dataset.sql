-- supabase/migrations/0003_ridgway_places_dataset.sql
--
-- Applied to the Burroship project (dlmqovbtesldsnjksjlu) 2026-08-19 via the
-- Supabase MCP. Kept here so the schema lives in the repo.
--
-- places: the Burroship's OWN curated Ridgway dataset. Public reference data (local
-- businesses, museums, historical buildings, landmarks) that we gather from open
-- sources (OpenStreetMap, Wikidata) and enrich ourselves. No approval needed, it is
-- public info. Separate from public.businesses (opt-in, owner submitted). The map
-- reads this table for its exact markers. First load was 41 Ridgway places pulled
-- from the OpenStreetMap Overpass API. status stays 'live' for what we show.

create table if not exists public.places (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  name text not null,
  category text,
  subcategory text,
  address text,
  city text default 'Ridgway',
  latitude double precision not null,
  longitude double precision not null,
  website text,
  phone text,
  blurb text,
  history text,
  tags text[],
  source text,
  osm_type text,
  osm_id bigint,
  status text not null default 'live',
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists places_osm_idx on public.places (osm_type, osm_id);

alter table public.places enable row level security;

drop policy if exists "places_public_read" on public.places;
create policy "places_public_read" on public.places for select using (status = 'live');
-- writes happen through the service role (our data pipeline), no public write policy
