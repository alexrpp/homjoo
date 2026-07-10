-- ============================================================
--  homjoo — PASS 48H: script di attivazione (DA USARE DOPO IL LANCIO)
-- ------------------------------------------------------------
--  Dove incollarlo: supabase.com/dashboard → progetto homjoo →
--  SQL Editor → New query → incolla tutto → Run.
--  Poi in index.html cambiare PASS_CONFIG.attivo da false a true
--  e pubblicare col .bat.
-- ============================================================

-- 1) Chi ha il Pass (una riga per acquisto)
create table if not exists public.pass (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references auth.users (id) on delete cascade,
  expires_at  timestamptz not null,           -- data di scadenza (acquisto + 3 mesi)
  created_at  timestamptz not null default now()
);
alter table public.pass enable row level security;

-- Ogni utente può vedere solo il PROPRIO pass (serve al sito per il check)
create policy "leggi il tuo pass" on public.pass
  for select using (auth.uid() = user_id);

-- 2) Le case in anteprima (visibili SOLO a chi ha un Pass valido)
create table if not exists public.case_anteprima (
  id        bigint generated always as identity primary key,
  title     text not null,
  company   text,
  price     int  not null,
  unit      text default 'AUD/sett',
  lng       double precision not null,
  lat       double precision not null,
  "desc"    text,
  meta      jsonb default '{}'::jsonb,
  source    text,
  url       text,
  aggiunta  date default current_date
);
alter table public.case_anteprima enable row level security;

create policy "solo chi ha il pass legge le anteprime" on public.case_anteprima
  for select using (
    exists (
      select 1 from public.pass p
      where p.user_id = auth.uid() and p.expires_at >= now()
    )
  );

-- 3) Il "teaser" pubblico: solo zona e posizione, per i pin col lucchetto
--    (una VISTA, così non va tenuta sincronizzata a mano)
create or replace view public.case_anteprima_teaser
  with (security_invoker = off) as
  select id, lng, lat, price from public.case_anteprima;
grant select on public.case_anteprima_teaser to anon, authenticated;

-- ============================================================
--  COME SI ATTIVA UN PASS DOPO UN PAGAMENTO STRIPE (v1, manuale):
--  1. Stripe ti manda l'email di "pagamento ricevuto" con l'email del cliente
--  2. Dashboard Supabase → Authentication → Users → trovi l'utente → copi lo User UID
--  3. SQL Editor → esegui (sostituendo l'UID):
--     insert into public.pass (user_id, expires_at)
--     values ('INCOLLA-QUI-LO-UID', now() + interval '3 months');
--  4. Fatto: al prossimo accesso l'utente vede le case in anteprima.
--  (v2 futura: webhook Stripe che fa l'insert da solo)
-- ============================================================
