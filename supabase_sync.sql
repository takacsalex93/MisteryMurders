-- Rejtélyes gyilkosságok · játékállás a játékos fiókjában (Supabase Auth)
-- Futtatás: Supabase → SQL Editor → New query → ezt a fájlt bemásolni → Run.
--
-- Minden bejelentkezett játékosnak egy sora van: a teljes mentése. A sorszintű szabályok miatt
-- mindenki kizárólag a saját sorát látja és írja; a nyilvános (anon) szerep semmit sem ér el.

create table if not exists public.user_saves (
  user_id    uuid primary key references auth.users (id) on delete cascade default auth.uid(),
  data       jsonb not null,
  updated_at timestamptz not null default now(),
  constraint user_saves_size check (pg_column_size(data) < 600000)
);

alter table public.user_saves enable row level security;
revoke all on public.user_saves from anon;
grant select, insert, update on public.user_saves to authenticated;

drop policy if exists "sajat mentes olvasasa" on public.user_saves;
create policy "sajat mentes olvasasa" on public.user_saves for select to authenticated using (user_id = auth.uid());
drop policy if exists "sajat mentes letrehozasa" on public.user_saves;
create policy "sajat mentes letrehozasa" on public.user_saves for insert to authenticated with check (user_id = auth.uid());
drop policy if exists "sajat mentes frissitese" on public.user_saves;
create policy "sajat mentes frissitese" on public.user_saves for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- a frissítés idejét a szerver állítja
create or replace function public.touch_user_saves() returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end $$;
drop trigger if exists user_saves_touch on public.user_saves;
create trigger user_saves_touch before insert or update on public.user_saves for each row execute function public.touch_user_saves();

-- a korábbi, kódos szinkron maradványai (ha valaha lefutott)
drop function if exists public.sync_push(text, jsonb);
drop function if exists public.sync_pull(text);
drop table if exists public.saves;
