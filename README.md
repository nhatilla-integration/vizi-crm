# Vizi CRM

🔗 **Demo ao vivo:** [vizi-crm.vercel.app](https://vizi-crm.vercel.app)

![Demonstração do Vizi CRM](docs/demo.gif)

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

* Dashboard com 3 métricas principais em tempo real (orçamentos solicitados, orçamentos encaminhados, paradas)
* Indicadores visuais por cor — verde para positivo, vermelho para alerta
* Funil de leads em formato Kanban, com etapas do processo comercial (Novo, Em contato, Orçamento Enviado, Fechado, Perdido)
* Cadastro, movimentação entre etapas e remoção de leads diretamente pelo funil
* Integração com Supabase, incluindo atualização em tempo real (realtime)
* Modo de demonstração com dados de exemplo, para uso sem conexão configurada
* Interface responsiva e profissional
* Hospedado na Vercel

## Próximas etapas

**Produto**
* Sistema de autenticação por login e senha
* Módulo analítico de campanhas

**Técnico / qualidade**
* Confirmação antes de excluir um lead (hoje apaga direto no clique)
* Cobertura de testes no `useLeads` (fallback pro modo demo, criação, troca de etapa)
* CI no GitHub Actions rodando testes e build a cada push
* Feedback visível pro usuário quando a conexão com o Supabase falha

**Segurança** (antes de conectar dados reais)
* Trocar a policy aberta do Supabase (`supabase_setup.sql`) por regras baseadas em `auth.uid()`, assim que a autenticação for implementada

## Autora

Natilla — [GitHub](https://github.com/nhatilla-integration)
