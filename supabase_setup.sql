-- Vizi CRM — schema de produção (cadastro público real, dados isolados por conta)
-- Rode isso inteiro no SQL Editor de um projeto Supabase NOVO e vazio.

create extension if not exists "pgcrypto";

-- =========================================================================
-- TABELAS
-- =========================================================================

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text,
  empresa text,
  funcao text,
  created_at timestamptz not null default now()
);

create table leads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  nome text not null,
  origem text not null default 'Outro',
  etapa text not null default 'novo' check (etapa in ('novo', 'em_contato', 'orcamento', 'fechado', 'perdido')),
  valor numeric default 0,
  telefone text default '',
  tags text[] default '{}',
  notas text default '',
  created_at timestamptz default now()
);

-- Log de uso do assistente de métricas (API paga) — limita perguntas por
-- conta por dia. api/metrics-assistant.js lê/escreve aqui autenticado como
-- o próprio usuário (chave anon + token dele no header, nunca service_role),
-- por isso precisa de RLS de verdade, não só grants.
create table metrics_assistant_usos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  criado_em timestamptz not null default now()
);

-- =========================================================================
-- TRIGGER: cria o profile automaticamente quando a conta é criada,
-- lendo nome/empresa/função do metadata passado no signUp().
-- search_path vazio: toda referência precisa ser totalmente qualificada.
-- =========================================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, nome, empresa, funcao)
  values (
    new.id,
    new.raw_user_meta_data->>'nome',
    new.raw_user_meta_data->>'empresa',
    new.raw_user_meta_data->>'funcao'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- =========================================================================
-- ROW LEVEL SECURITY
-- =========================================================================

alter table profiles enable row level security;
alter table leads enable row level security;
alter table metrics_assistant_usos enable row level security;

-- profiles: cada um só lê o próprio. Sem policy de insert/update — quem
-- cria a linha é só a trigger (security definer, ignora RLS).
create policy profiles_select on profiles
  for select
  using (auth.uid() = id);

-- leads: uma policy por operação, todas presas ao dono (auth.uid() = user_id).
-- using controla quais linhas são visíveis/afetadas; with check controla o
-- que pode ser gravado — select e delete só usam using (não existe "with
-- check" pra eles em SQL puro), insert só usa with check, update usa os dois.
create policy leads_select on leads
  for select
  using (auth.uid() = user_id);

create policy leads_insert on leads
  for insert
  with check (auth.uid() = user_id);

create policy leads_update on leads
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy leads_delete on leads
  for delete
  using (auth.uid() = user_id);

-- metrics_assistant_usos: cada um só vê/registra o próprio uso. Sem
-- update/delete — é um log, ninguém apaga o próprio histórico de uso.
create policy metrics_usos_select on metrics_assistant_usos
  for select
  using (auth.uid() = user_id);

create policy metrics_usos_insert on metrics_assistant_usos
  for insert
  with check (auth.uid() = user_id);

-- =========================================================================
-- REALTIME
-- =========================================================================

alter publication supabase_realtime add table leads;

-- =========================================================================
-- GRANTS — fecha tudo pro anon (ninguém usa o CRM sem login), abre só o
-- necessário pro authenticated. RLS acima faz o resto, linha a linha.
-- =========================================================================

revoke all on all tables in schema public from anon;
alter default privileges in schema public revoke all on tables from anon;

revoke all on all tables in schema public from authenticated;

grant select on profiles to authenticated;
grant select, insert, update, delete on leads to authenticated;
grant select, insert on metrics_assistant_usos to authenticated;
