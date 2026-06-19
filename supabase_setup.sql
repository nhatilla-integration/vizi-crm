-- Vizi CRM — Script de criação da tabela 'leads'
-- Rode isso no SQL Editor do seu projeto Supabase (Supabase Dashboard > SQL Editor > New query)

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  origem text not null default 'Outro',
  etapa text not null default 'novo' check (etapa in ('novo', 'em_contato', 'orcamento', 'fechado', 'perdido')),
  valor numeric default 0,
  created_at timestamp with time zone default now()
);

-- Habilita Row Level Security (recomendado mesmo em projetos pessoais)
alter table leads enable row level security;

-- Política simples: permite leitura e escrita pública via chave anônima.
-- Suficiente para o estágio atual do projeto (sem login ainda).
-- Quando a autenticação for implementada, troque por políticas baseadas em auth.uid().
create policy "Permitir tudo via anon key"
  on leads
  for all
  using (true)
  with check (true);

-- Habilita realtime (atualização automática na tela quando os dados mudam)
alter publication supabase_realtime add table leads;

-- Dados de exemplo (opcional — remova se quiser começar zerado)
insert into leads (nome, origem, etapa, valor) values
  ('Aura Estética', 'Instagram', 'novo', 1800),
  ('MariDecor', 'Indicação', 'em_contato', 3200),
  ('Studio Bella', 'Google Ads', 'orcamento', 2400),
  ('Loja do Pedro', 'Site', 'fechado', 4100),
  ('Doce Sabor Confeitaria', 'Indicação', 'perdido', 1200);