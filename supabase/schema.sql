-- ============================================================
--  RunSpace Orlando — waitlist schema
--  Run this once in the Supabase Dashboard → SQL Editor → New query.
-- ============================================================

-- Case-insensitive text so Alex@x.com and alex@x.com are treated as the same.
create extension if not exists citext;

create table if not exists public.waitlist (
  id          uuid primary key default gen_random_uuid(),
  name        text        not null,
  email       citext      not null,
  city        text,
  pace        text,
  source      text,        -- how they found us
  created_at  timestamptz not null default now(),

  -- prevent duplicate signups (case-insensitive)
  constraint waitlist_email_unique unique (email),

  -- server-side guard rails (defense in depth alongside app validation)
  constraint waitlist_name_len   check (char_length(name) between 1 and 120),
  constraint waitlist_city_len   check (city is null or char_length(city) <= 120),
  constraint waitlist_email_fmt  check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')
);

-- Fast "newest signups first" reads for your admin views/exports.
create index if not exists waitlist_created_at_idx
  on public.waitlist (created_at desc);

-- ------------------------------------------------------------
--  Row Level Security
-- ------------------------------------------------------------
-- Enable RLS and create NO public policies. Signups are inserted
-- server-side from the Next.js API route using the service-role key,
-- which bypasses RLS. With RLS on and no anon policy, the public
-- anon key can neither read nor write this table — so even if it
-- leaks, your signups stay private.
alter table public.waitlist enable row level security;

-- (Optional) If you ever want to insert directly from the browser with
-- the anon key instead of the server route, uncomment this insert-only
-- policy. Leave it commented while you use the service-role route.
--
-- create policy "anon can join waitlist"
--   on public.waitlist
--   for insert
--   to anon
--   with check (true);

-- ------------------------------------------------------------
--  Handy read query for the dashboard
-- ------------------------------------------------------------
-- select name, email, city, pace, source, created_at
-- from public.waitlist
-- order by created_at desc;
