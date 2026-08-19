-- supabase/migrations/0001_profiles_and_username_login.sql
--
-- Applied to the Burroship project (dlmqovbtesldsnjksjlu) 2026-08-19 via the
-- Supabase MCP. Kept here so the schema lives in the repo for the next agent.
--
-- profiles: one row per auth user. username is the login handle AND the public
-- display name. The gate signs people in by username, so email_for_username()
-- resolves a username to its login email (security definer, callable by anon).
-- TRADEOFF: this exposes username -> email to anon. Fine for the small invite-only
-- bridge, swap to a server-side (service_role) resolver before opening to everyone.
-- handle_new_user auto-provisions a profile whenever the backend creates a user.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null,
  display_name text,
  avatar_url text,
  website text,
  business text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists profiles_username_lower_idx on public.profiles (lower(username));

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

create or replace function public.email_for_username(uname text)
returns text
language sql
security definer
set search_path = public
as $$
  select u.email
  from public.profiles p
  join auth.users u on u.id = p.id
  where lower(p.username) = lower(trim(uname))
  limit 1;
$$;

revoke all on function public.email_for_username(text) from public;
grant execute on function public.email_for_username(text) to anon, authenticated;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  uname text;
begin
  uname := coalesce(nullif(trim(new.raw_user_meta_data->>'username'), ''), split_part(new.email, '@', 1));
  if exists (select 1 from public.profiles where lower(username) = lower(uname)) then
    uname := uname || '-' || substr(new.id::text, 1, 4);
  end if;
  insert into public.profiles (id, username, display_name)
  values (new.id, uname, coalesce(nullif(trim(new.raw_user_meta_data->>'display_name'), ''), initcap(uname)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();
