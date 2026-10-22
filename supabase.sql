-- Rejtélyes gyilkosságok · közös ranglista (Supabase)
-- Futtatás: Supabase → SQL Editor → New query → ezt a fájlt bemásolni → Run.

create table if not exists public.results (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  player_id  uuid not null,                 -- böngészőnként egy véletlen azonosító
  player     text not null check (char_length(player) between 2 and 24),
  case_id    text not null check (char_length(case_id) between 2 and 40),
  run        text not null check (run ~ '^(normal|weekly|daily:[0-9]{8})$'),
  score      int  not null check (score between 0 and 100),
  tries      int  not null check (tries between 1 and 5),
  hints      int  not null check (hints between 0 and 99),
  minutes    int  check (minutes between 0 and 5000),
  mode       text check (mode in ('normal', 'master', 'noir')),
  timed      boolean not null default false,
  variant    text check (variant is null or char_length(variant) <= 30)
);

create index if not exists results_case_idx  on public.results (case_id, run, score desc);
create index if not exists results_player_idx on public.results (player_id);

-- Jogok a nyilvános (anon) szerepnek: csak olvasás és beszúrás.
grant usage on schema public to anon, authenticated;
grant select, insert on public.results to anon, authenticated;

-- Sorszintű védelem: bárki olvashat és új eredményt küldhet, de módosítani és törölni senki sem tud.
alter table public.results enable row level security;

drop policy if exists "eredmenyek olvasasa" on public.results;
create policy "eredmenyek olvasasa" on public.results for select to anon, authenticated using (true);

drop policy if exists "eredmeny bekuldese" on public.results;
create policy "eredmeny bekuldese" on public.results for insert to anon, authenticated
  with check (created_at > now() - interval '1 minute');

-- Egy játékos ugyanabból az ügyből (és napi kihívásból) legfeljebb 20 eredményt küldhet: védelem az elárasztás ellen.
create or replace function public.limit_results() returns trigger language plpgsql as $$
begin
  if (select count(*) from public.results where player_id = new.player_id and case_id = new.case_id and run = new.run) >= 20 then
    raise exception 'too many results';
  end if;
  return new;
end $$;
drop trigger if exists results_limit on public.results;
create trigger results_limit before insert on public.results for each row execute function public.limit_results();
