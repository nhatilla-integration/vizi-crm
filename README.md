# Vizi CRM

🔗 **Demo ao vivo:** [vizi-crm.vercel.app](https://vizi-crm.vercel.app)

## Antes e depois

O visual do Vizi passou por um redesign completo — de um tema neon escuro pra um
visual claro e corporativo, com landing page própria e mais funcionalidades no funil.

**Antes** — tema neon escuro, funil simples
![Antes: Vizi CRM em tema neon](docs/demo.gif)

**Depois** — visual claro corporativo, landing page, cadastro completo e mais campos no lead
![Depois: novo layout do Vizi CRM](docs/vizi-layout-novo-1.gif)
![Depois: novo layout do Vizi CRM, parte 2](docs/vizi-layout-novo-2.gif)

Vizi CRM é uma aplicação desenvolvida para atuar como uma camada analítica e organizacional, auxiliando empresas na tomada de decisões estratégicas e operacionais.

A plataforma funciona como uma "peneira inteligente", analisando os dados do processo comercial para identificar padrões, gargalos e oportunidades de melhoria. O objetivo é ajudar empresas a entenderem quais ações estão gerando resultados e quais processos precisam ser ajustados.

## Problema que resolve

Empresas que recebem alto volume de leads frequentemente perdem visibilidade sobre seu processo comercial — não sabem quantos orçamentos foram solicitados, quais campanhas funcionaram ou onde os leads estão parando. O Vizi torna essas informações visíveis em tempo real.

## Tecnologias utilizadas

* React.js
* JavaScript
* Tailwind CSS
* HTML5
* CSS3
* Supabase (banco de dados e realtime)

## Como executar o projeto

```
npm install
npm start
```

O projeto será iniciado em http://localhost:3000

Por padrão, o app roda em **modo demonstração** (dados locais de exemplo). Para
conectar a um banco real, copie `.env.example` para `.env`, preencha com as
chaves do seu projeto Supabase e rode o script `supabase_setup.sql` no SQL
Editor do Supabase.

## Funcionalidades atuais

* Landing page de apresentação, com proposta de valor, "Como funciona" e funcionalidades
* Três formas de entrar: ver o funil direto (sem cadastro), criar conta (formulário completo, "grátis por 30 dias") ou entrar com login — hoje esse fluxo é só visual, ainda sem autenticação real
* Dashboard com 3 métricas principais em tempo real (orçamentos solicitados, orçamentos encaminhados, mensagens paradas)
* Funil de leads em formato Kanban, com etapas do processo comercial (Novo, Em contato, Orçamento Enviado, Fechado, Perdido)
* Cadastro, edição (nome, origem, valor, telefone, tags, notas), movimentação entre etapas e remoção (com confirmação) de leads
* Integração com Supabase, incluindo atualização em tempo real (realtime)
* Modo de demonstração com dados de exemplo, para uso sem conexão configurada
* Interface responsiva, clara e corporativa
* CI no GitHub Actions rodando testes e build a cada push
* Hospedado na Vercel

## Próximas etapas

**Produto**
* Autenticação real (hoje o cadastro/login da landing page é só visual)
* Assistente de métricas que explica em linguagem simples por que uma campanha vendeu bem ou mal
* Conexão com WhatsApp pra puxar atendimentos pendentes automaticamente
* Painel de resultados/benefícios pra quem estiver testando o Vizi

**Técnico / qualidade**
* Feedback visível pro usuário quando a conexão com o Supabase falha

**Segurança** (antes de conectar dados reais)
* Trocar a policy aberta do Supabase (`supabase_setup.sql`) por regras baseadas em `auth.uid()`, assim que a autenticação for implementada

## Autora

Natilla — [GitHub](https://github.com/nhatilla-integration)
