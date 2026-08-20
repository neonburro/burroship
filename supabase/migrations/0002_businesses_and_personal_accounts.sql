-- supabase/migrations/0002_businesses_and_personal_accounts.sql
--
-- Applied to the Burroship project (dlmqovbtesldsnjksjlu) 2026-08-19 via the
-- Supabase MCP. Kept here so the schema lives in the repo.
--
-- The account model: one login can hold a PERSONAL profile (public.profiles,
-- anonymous by default, username is all that is required) AND one or more
-- BUSINESSES. A business is what lands on the map, so its address is required,
-- everything else is optional and the owner can stay otherwise anonymous.
-- Businesses are reviewed (status pending -> approved) before the public map shows
-- them, so the crew looks at each one first.

alter table public.profiles add column if not exists full_name text;

create table if not exists public.businesses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  address text not null,
  city text default 'Ridgway',
  website text,
  phone text,
  category text,
  blurb text,
  latitude double precision,
  longitude double precision,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists businesses_owner_idx on public.businesses (owner_id);

alter table public.businesses enable row level security;

drop policy if exists "businesses_owner_all" on public.businesses;
create policy "businesses_owner_all" on public.businesses
  for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

drop policy if exists "businesses_public_read_approved" on public.businesses;
create policy "businesses_public_read_approved" on public.businesses
  for select using (status = 'approved');
