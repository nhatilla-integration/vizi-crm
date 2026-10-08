# Vizi CRM — IA de atendimento (ajuda quem atende, não responde sozinha)

Não depende de WhatsApp conectado (ver `PLANO_WHATSAPP.md`). Reaproveita
a mesma estrutura seguro que já existe pro Assistente de Métricas
(autenticação por token, limite de uso por conta), só que focado num
lead específico em vez do funil inteiro.

## O que ela faz

Um botão "Sugerir mensagem" dentro do card/modal de cada lead. A pessoa
clica, a IA lê os dados daquele lead (nome, origem, etapa, valor, e o
campo de notas) e sugere um rascunho de mensagem pra copiar e colar no
WhatsApp — por exemplo:

- Lead parado há tempo em "Em contato" → sugere uma mensagem de
  reaproximação.
- Lead em "Orçamento" → sugere uma mensagem de acompanhamento sobre a
  proposta.
- Lead recém-criado → sugere uma primeira mensagem de boas-vindas.

A pessoa pode editar o texto sugerido antes de mandar — a IA nunca manda
nada sozinha, só redige um rascunho.

## O que muda no banco

Nada de tabela nova. O campo `notas` que já existe em `leads` é a única
fonte de contexto (é texto livre — sem histórico estruturado de
mensagens, porque não tem WhatsApp conectado ainda).

## O que muda no código

- `api/lead-assistant.js` (novo): mesmo padrão de segurança do
  `api/metrics-assistant.js` — exige token, valida contra o Supabase,
  limite de uso por conta (reaproveita `metrics_assistant_usos`, ou uma
  tabela irmã se fizer sentido separar o limite dos dois assistentes).
- Botão "Sugerir mensagem" em `LeadCard.js` ou `LeadFormModal.js`.
- Prompt focado em 1 lead por vez, não no funil inteiro.

## Limite esperado

Como não tem histórico de conversa de verdade (só o campo de notas que a
pessoa mesma escreve), a qualidade da sugestão depende de quanto foi
anotado sobre aquele lead. Isso é uma limitação honesta a comunicar: não
é uma IA que "sabe o que o cliente disse", é uma IA que ajuda a redigir
com base no que você mesma anotou.

## Pergunta em aberto antes de construir

Reaproveitar o mesmo limite diário de perguntas (`metrics_assistant_usos`,
20/dia) somado com o assistente de métricas, ou dar um limite separado
só pra sugestão de mensagens?
