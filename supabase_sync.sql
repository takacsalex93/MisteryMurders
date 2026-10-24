-- Rejtélyes gyilkosságok · játékállás szinkronizálása több eszköz között (Supabase)
-- Futtatás: Supabase → SQL Editor → New query → ezt a fájlt bemásolni → Run.
--
-- Működés: minden játékos kap egy hosszú, véletlen „nyomozói kódot”. A mentést ezzel a kóddal lehet feltölteni és letölteni.
-- A táblát közvetlenül senki sem olvashatja: csak a két lenti függvényen át, és csak az, aki ismeri a kódot.
-- A kódot nem tároljuk, csak a lenyomatát (sha256).

create table if not exists public.saves (
  key_hash   text primary key,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.saves enable row level security;
revoke all on public.saves from anon, authenticated;

create or replace function public.sync_push(p_key text, p_data jsonb) returns timestamptz
language plpgsql security definer set search_path = public as $$
declare t timestamptz := now();
begin
  if p_key is null or char_length(p_key) < 16 or char_length(p_key) > 64 then raise exception 'bad key'; end if;
  if pg_column_size(p_data) > 600000 then raise exception 'too large'; end if;
  insert into public.saves (key_hash, data, updated_at)
    values (encode(sha256(convert_to(p_key, 'UTF8')), 'hex'), p_data, t)
    on conflict (key_hash) do update set data = excluded.data, updated_at = t;
  return t;
end $$;

create or replace function public.sync_pull(p_key text) returns jsonb
language plpgsql security definer set search_path = public as $$
declare r public.saves;
begin
  if p_key is null or char_length(p_key) < 16 or char_length(p_key) > 64 then raise exception 'bad key'; end if;
  select * into r from public.saves where key_hash = encode(sha256(convert_to(p_key, 'UTF8')), 'hex');
  if not found then return null; end if;
  return jsonb_build_object('data', r.data, 'updated_at', r.updated_at);
end $$;

revoke all on function public.sync_push(text, jsonb) from public;
revoke all on function public.sync_pull(text) from public;
grant execute on function public.sync_push(text, jsonb) to anon, authenticated;
grant execute on function public.sync_pull(text) to anon, authenticated;
