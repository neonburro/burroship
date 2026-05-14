-- supabase/schema.sql
-- Schema for the Burroship Supabase project (twvptrfohuthynndeuxx).
-- Generated from production state on 2026-05-14.
--
-- This file represents what is LIVE in Supabase. It is not the source
-- of truth for migrations; the database is. This file exists so the
-- repo accurately describes its environment.
 
-- ============================================================
-- world_locations
-- ============================================================
-- The places that live inside the active dome. 13 rows in production
-- as of v0.8. Towns, peaks, landmarks, clients, partners, and the
-- HQ compound beacons.
 
create table if not exists public.world_locations (
  id                     uuid primary key default gen_random_uuid(),
  slug                   text not null unique,
  name                   text not null,
  category               text,
  subcategory            text,
  beacon_color           text,
  status                 text default 'live',
  city                   text,
  address                text,
  longitude              double precision not null,
  latitude               double precision not null,
  elevation_m            double precision,
  blurb                  text,
  body_markdown          text,
  splat_asset_id         bigint,
  splat_height_offset_m  double precision default 0,
  photo_urls             text[] default array[]::text[],
  links                  jsonb default '{}'::jsonb,
  tags                   text[] default array[]::text[],
  featured               boolean default false,
  visibility             text default 'public',
  source                 text,
  notes                  text,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);
 
create index if not exists idx_world_locations_slug
  on public.world_locations (slug);
create index if not exists idx_world_locations_category
  on public.world_locations (category);
create index if not exists idx_world_locations_featured
  on public.world_locations (featured) where featured = true;
 
-- ============================================================
-- world_airships
-- ============================================================
-- The vessels. Phase 1: one row, The Burroship.
-- Live position fields (current_*) are unused in Phase 1.
-- They light up in Phase 4 when realtime position broadcasting
-- kicks in.
 
create table if not exists public.world_airships (
  id                   uuid primary key default gen_random_uuid(),
  slug                 text not null unique,
  name                 text not null,
  description          text,
  cruising_altitude_m  double precision default 5486,
  cruising_speed_kmh   double precision default 25,
  model_glb_url        text,
  beacon_color         text default '#A8D055',
  active               boolean default true,
  current_lat          double precision,
  current_lng          double precision,
  current_altitude_m   double precision,
  current_heading      double precision,
  last_position_at     timestamptz,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);
 
-- ============================================================
-- tour_routes
-- ============================================================
-- The cruise corridors. One row in production: san-juans-default.
-- Stops stored as jsonb for flexibility.
 
create table if not exists public.tour_routes (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  name         text not null,
  description  text,
  airship_id   uuid references public.world_airships(id),
  stops        jsonb default '[]'::jsonb,
  is_default   boolean default false,
  active       boolean default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
 
-- ============================================================
-- tour_route_stops_expanded (view)
-- ============================================================
-- A read-only view that flattens tour_routes.stops jsonb into
-- one row per stop. Useful for camera systems that iterate over
-- waypoints. Don't edit this — it's a view.
 
create or replace view public.tour_route_stops_expanded as
  select
    r.id                                  as route_id,
    r.slug                                as route_slug,
    r.name                                as route_name,
    (stop ->> 'location_slug')            as location_slug,
    (stop ->> 'label')                    as location_name,
    ((stop -> 'waypoint' ->> 'longitude')::double precision) as location_lng,
    ((stop -> 'waypoint' ->> 'latitude')::double precision)  as location_lat,
    null::double precision                as location_elevation_m,
    (stop ->> 'atmosphere')               as atmosphere,
    (stop -> 'waypoint')                  as approach,
    null::jsonb                           as hold,
    null::jsonb                           as depart,
    (idx - 1)::bigint                     as stop_order
  from public.tour_routes r,
       jsonb_array_elements(r.stops) with ordinality as t(stop, idx);
 
-- ============================================================
-- Seed data
-- ============================================================
-- Production already has 13 world_locations, 1 world_airships,
-- and 1 tour_routes row. To regenerate from scratch (e.g. for a
-- staging or dev branch), seed scripts live under /scripts/.
