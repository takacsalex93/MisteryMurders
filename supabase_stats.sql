-- Rejtélyes gyilkosságok · névtelen játékstatisztika és visszajelzések (Supabase)
-- Futtatás: Supabase → SQL Editor → New query → ezt a fájlt bemásolni → Run.
-- A játékosok csak beküldeni tudnak, olvasni nem: az adatokat te látod a Table Editorban és a lenti nézetekben.

-- 1. Események: ügy indítása, rejtvény megoldása, súgó, rossz próbák, az ügy vége
create table if not exists public.events (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  player_id  uuid not null,
  session_id text not null check (char_length(session_id) between 4 and 40),
  case_id    text not null check (char_length(case_id) between 2 and 40),
  ev         text not null check (ev in ('start', 'puzzle', 'hint', 'ded_wrong', 'conf_wrong', 'acc_wrong', 'win', 'lose', 'wrong', 'deduce', 'tab')),
  detail     text check (detail is null or char_length(detail) <= 60),
  secs       int  check (secs is null or secs between 0 and 360000),
  run        text check (run is null or run ~ '^(normal|weekly|daily:[0-9]{8})$'),
  variant    text check (variant is null or char_length(variant) <= 30)
);
create index if not exists events_case_idx on public.events (case_id, ev);
create index if not exists events_player_idx on public.events (player_id, created_at);

-- 2. Visszajelzések az ügyek végén
create table if not exists public.feedback (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  player_id  uuid not null,
  case_id    text not null check (char_length(case_id) between 2 and 40),
  outcome    text check (outcome in ('win', 'lose', 'wrong')),
  rating     int  not null check (rating between 1 and 5),
  difficulty int  check (difficulty is null or difficulty between 1 and 3),
  comment    text check (comment is null or char_length(comment) <= 1000)
);
create index if not exists feedback_case_idx on public.feedback (case_id, created_at desc);

-- Jogok: a nyilvános (anon) szerep csak beszúrhat
grant usage on schema public to anon, authenticated;
grant insert on public.events, public.feedback to anon, authenticated;
revoke select, update, delete on public.events, public.feedback from anon, authenticated;

alter table public.events enable row level security;
alter table public.feedback enable row level security;
drop policy if exists "esemeny bekuldese" on public.events;
create policy "esemeny bekuldese" on public.events for insert to anon, authenticated with check (created_at > now() - interval '1 minute');
drop policy if exists "visszajelzes bekuldese" on public.feedback;
create policy "visszajelzes bekuldese" on public.feedback for insert to anon, authenticated with check (created_at > now() - interval '1 minute');

-- Elárasztás elleni védelem: játékosonként óránként legfeljebb 600 esemény, ügyenként 5 visszajelzés
create or replace function public.limit_events() returns trigger language plpgsql as $$
begin
  if (select count(*) from public.events where player_id = new.player_id and created_at > now() - interval '1 hour') >= 600 then
    raise exception 'too many events';
  end if;
  return new;
end $$;
drop trigger if exists events_limit on public.events;
create trigger events_limit before insert on public.events for each row execute function public.limit_events();

create or replace function public.limit_feedback() returns trigger language plpgsql as $$
begin
  if (select count(*) from public.feedback where player_id = new.player_id and case_id = new.case_id) >= 5 then
    raise exception 'too much feedback';
  end if;
  return new;
end $$;
drop trigger if exists feedback_limit on public.feedback;
create trigger feedback_limit before insert on public.feedback for each row execute function public.limit_feedback();

-- 3. Kész nézetek a kiértékeléshez (csak a Supabase felületén láthatók, a játékosok nem érik el)
-- Ügyenként: hányan kezdték, hányan oldották meg, mennyi idő alatt
create or replace view public.stat_cases with (security_invoker = true) as
select case_id,
  count(distinct player_id) filter (where ev = 'start') as kezdte,
  count(distinct player_id) filter (where ev = 'win')   as megoldotta,
  count(distinct player_id) filter (where ev in ('lose', 'wrong')) as elbukta,
  round(100.0 * count(distinct player_id) filter (where ev = 'win') / nullif(count(distinct player_id) filter (where ev = 'start'), 0)) as megoldasi_arany_szazalek,
  round(avg(secs) filter (where ev = 'win') / 60.0) as atlag_perc_megoldasig
from public.events group by case_id order by case_id;

-- Rejtvényenként és következtetésenként: hol kérnek súgót, hol rontanak a legtöbbet
create or replace view public.stat_sticking with (security_invoker = true) as
select case_id, ev, detail, count(*) as db, count(distinct player_id) as jatekos
from public.events where ev in ('hint', 'ded_wrong', 'conf_wrong', 'acc_wrong')
group by case_id, ev, detail order by db desc;

-- Hol hagyják abba: játékosonként az utolsó esemény azokban az ügyekben, amelyeket nem fejeztek be
create or replace view public.stat_dropoff with (security_invoker = true) as
with last as (
  select distinct on (player_id, case_id) player_id, case_id, ev, detail, secs, created_at
  from public.events order by player_id, case_id, created_at desc
)
select case_id, ev as utolso_esemeny, detail, count(*) as jatekos
from last where ev not in ('win', 'lose', 'wrong') and created_at < now() - interval '1 day'
group by case_id, ev, detail order by jatekos desc;

-- Visszajelzések ügyenként
create or replace view public.stat_feedback with (security_invoker = true) as
select case_id, count(*) as db, round(avg(rating), 2) as atlag_csillag,
  round(avg(difficulty), 2) as atlag_nehezseg_1_3,
  sum(case when comment is not null and comment <> '' then 1 else 0 end) as szoveges
from public.feedback group by case_id order by case_id;
