# Vizi CRM — conexão com WhatsApp: planejamento (não decidido ainda)

Esse documento existe pra você decidir com calma, não é um plano aprovado
pra construir agora. A landing page já promete isso como "Em breve" — aqui
está o que esse "em breve" realmente significa na prática.

## Contexto

Já discutimos isso antes, com o Fernando como exemplo: ele tinha um número
de WhatsApp pessoal que já usava pro negócio dele. A pergunta que surgiu
foi "se eu conectar esse número ao CRM, o WhatsApp dele para de funcionar
no celular/WhatsApp Web normal?" — a resposta curta é: depende do caminho
técnico escolhido, detalhado abaixo.

## Caminho 1 — API oficial do WhatsApp Business (via Meta)

**Como funciona**: a Meta (dona do WhatsApp) tem uma API própria pra
negócios enviarem/receberem mensagens programaticamente. Não é "ligar" o
WhatsApp existente — é um número **dedicado** à API, separado do app
comum. Normalmente se usa um intermediário (chamado BSP — Business
Solution Provider) pra facilitar a configuração: Twilio, 360dialog,
Zenvia, Meta diretamente, entre outros.

**Passos, em ordem**:
1. Verificação da empresa na Meta Business (documentos, CNPJ ou
   equivalente em Moçambique/Brasil conforme o país do cliente).
2. Registro de um número de telefone dedicado pra API (não pode ser o
   mesmo número que já está ativo no WhatsApp normal de alguém, a não
   ser que ele migre o número de vez pra API e pare de usar o app comum
   nesse número).
3. Escolha de um BSP (ou integração direta com a Meta, mais técnica).
4. Configuração de templates de mensagem (a API exige mensagens
   pré-aprovadas pra iniciar conversas fora da janela de 24h de resposta
   livre).
5. Integração do nosso backend com a API do BSP escolhido.

**Custo**: cobrança por "conversa" (janela de 24h), com valores diferentes
pra conversas iniciadas pela empresa (marketing/utilidade) vs respondidas
pelo cliente. Os valores mudam com frequência e variam por país — **não
estimo um número aqui pra não te dar uma referência desatualizada**;
checar direto na calculadora oficial da Meta no momento da decisão.
Muitos BSPs também cobram uma mensalidade própria além do custo por
conversa.

**Tempo até funcionar**: dias a poucas semanas, por causa da verificação
da Meta — não é instantâneo.

**O que muda pro uso do número**: nenhum conflito com WhatsApp pessoal,
porque é estrutralmente separado — mas exige abrir mão do número atual
pro uso normal, ou usar um número novo só pra isso.

## Caminho 2 — Automação não-oficial (ex: whatsapp-web.js, Baileys)

**Como funciona**: um programa controla uma sessão de WhatsApp Web por
trás dos panos, como se fosse uma pessoa usando o navegador.

**Riscos reais**:
- Contra os termos de uso do WhatsApp — risco de **banimento do número**,
  sem aviso prévio, a qualquer momento.
- Exige manter um servidor rodando 24/7 com essa sessão sempre conectada
  (se cair, para de funcionar até reconectar manualmente, às vezes
  escaneando QR code de novo).
- Quebra sempre que o WhatsApp atualiza algo na versão web — manutenção
  constante.
- É exatamente o cenário que gerava a dúvida do conflito de sessão: ao
  rodar isso com o número de alguém, o WhatsApp Web "normal" dela nesse
  mesmo número para de funcionar (só um lugar pode estar logado via essa
  automação por vez).

**Vantagem**: grátis, sem aprovação de ninguém, começa a funcionar na hora.

## Recomendação

Caminho 1 (API oficial) é o único sem risco de perder o número do
cliente. O Caminho 2 é tentador pelo custo zero, mas pra um produto que
você vai vender/recomendar pra terceiros, um banimento de número é um
problema sério demais pra arriscar.

## IA de atendimento — o que depende de qual caminho

- **Ajudar quem atende (dentro do CRM)**: não depende de nenhum dos dois
  caminhos acima. Dá pra construir agora — é uma extensão do que o
  Assistente de Métricas já faz, mas sugerindo respostas/resumindo a
  conversa de um lead em vez de só explicar números do funil. Isso virou
  o próximo passo acordado (ver abaixo).
- **Responder o cliente sozinha, sem humano**: só é possível com o
  Caminho 1 conectado — é a API que recebe/envia as mensagens de verdade.
  Com o Caminho 2 também seria tecnicamente possível, mas herda todos os
  riscos de banimento do número.

## Próximos passos

1. ✅ Decidido por agora: construir a IA que ajuda quem atende (não
   depende do WhatsApp), ver `PLANO_IA_ATENDIMENTO.md`.
2. Em aberto: decidir entre os dois caminhos de conexão com WhatsApp
   quando fizer sentido investir nisso (provavelmente quando houver o
   primeiro cliente de verdade usando o CRM no dia a dia).
