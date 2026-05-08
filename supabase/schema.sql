-- supabase/schema.sql
-- Schema for the burroship Supabase project.
-- Run this against a fresh Supabase project once provisioned.

-- Knock attempts: every passphrase guess, right or wrong.
create table if not exists public.knock_attempts (
  id uuid primary key default gen_random_uuid(),
  attempt text not null,
  succeeded boolean not null default false,
  ip_hash text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists idx_knock_attempts_created_at
  on public.knock_attempts (created_at desc);

-- Agent positions: where each agent currently appears on the map.
-- Edited manually in v0.1 then driven by deploy webhooks later.
create table if not exists public.agent_positions (
  slug text primary key,
  lat numeric not null,
  lng numeric not null,
  status text not null default 'idle',
  task text,
  updated_at timestamptz not null default now()
);
