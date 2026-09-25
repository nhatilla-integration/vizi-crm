export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método não permitido.' });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Assistente ainda não configurado (falta a chave da API).' });
    return;
  }

  const { question, summary } = req.body || {};
  if (!question || typeof question !== 'string' || !question.trim()) {
    res.status(400).json({ error: 'Digite uma pergunta.' });
    return;
  }

  const systemPrompt = `Você é um assistente que explica métricas de um funil de vendas em linguagem simples, para donos de pequenos negócios sem formação em análise de dados.

Responda em português, em no máximo 4 frases curtas, sem jargão técnico.
Baseie-se apenas nos números fornecidos abaixo — nunca invente dados que não estão aí.
Se os dados forem insuficientes pra responder com confiança, diga isso claramente em vez de especular.

Dados do funil (agregados, sem nomes ou dados pessoais de clientes):
${JSON.stringify(summary)}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        system: systemPrompt,
        messages: [{ role: 'user', content: question }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Erro da API da Anthropic:', errText);
      res.status(502).json({ error: 'Não consegui falar com o assistente agora. Tente de novo em instantes.' });
      return;
    }

    const data = await response.json();
    const answer = data.content?.[0]?.text ?? 'Não consegui gerar uma resposta.';
    res.status(200).json({ answer });
  } catch (err) {
    console.error('Erro ao chamar o assistente de métricas:', err.message);
    res.status(500).json({ error: 'Não consegui falar com o assistente agora. Tente de novo em instantes.' });
  }
}
