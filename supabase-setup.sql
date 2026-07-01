-- Run this in the SAME Supabase project used for Bunnytales (kzglqjridvhckhlqyloc).
-- Adds a table for the Lumio Coordia contact form.

create table if not exists public.lumio_contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  budget text,
  project_type text,
  message text,
  source text
);

alter table public.lumio_contact_submissions enable row level security;

create policy "anon can insert lumio submissions"
  on public.lumio_contact_submissions
  for insert
  to anon
  with check (true);
