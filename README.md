# Vizi CRM

🔗 **Demo ao vivo:** [vizi-crm.vercel.app](https://vizi-crm.vercel.app)

Vizi CRM é uma aplicação desenvolvida para atuar como uma camada 
analítica e organizacional, auxiliando empresas na tomada de decisões 
estratégicas e operacionais.

A plataforma funciona como uma "peneira inteligente", analisando os 
dados do processo comercial para identificar padrões, gargalos e 
oportunidades de melhoria. O objetivo é ajudar empresas a entenderem 
quais ações estão gerando resultados e quais processos precisam ser 
ajustados.

## Problema que resolve

Empresas que recebem alto volume de leads frequentemente perdem 
visibilidade sobre seu processo comercial — não sabem quantos 
orçamentos foram solicitados, quais campanhas funcionaram ou onde 
os leads estão parando. O Vizi torna essas informações visíveis 
em tempo real.

## Tecnologias utilizadas

- React.js
- JavaScript
- Tailwind CSS
- HTML5
- CSS3

## Como executar o projeto

```bash
npm install
npm start
```

O projeto será iniciado em http://localhost:3000

Por padrão, o app roda em **modo demonstração** (dados locais de exemplo). Para
conectar a um banco real, copie `.env.example` para `.env`, preencha com as
chaves do seu projeto Supabase e rode o script `supabase_setup.sql` no SQL
Editor do Supabase.

## Funcionalidades atuais

- Dashboard com 3 métricas principais em tempo real
- Funil de leads em formato Kanban, com etapas do processo comercial
- Criação, movimentação entre etapas e remoção de leads
- Integração com Supabase (dados e atualizações em tempo real via realtime),
  com fallback automático para modo demonstração quando não configurado
- Indicadores visuais por cor verde para positivo, vermelho para alerta
- Interface responsiva e profissional

## Próximas etapas

- [ ] Sistema de autenticação por login e senha
- [ ] Módulo analítico de campanhas

## Autora

Natilla — [GitHub](https://github.com/nhatilla-integration)
