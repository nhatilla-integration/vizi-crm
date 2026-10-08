import { createClient } from '@supabase/supabase-js';

const LIMITE_PERGUNTAS_POR_DIA = 20;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método não permitido.' });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!apiKey || !supabaseUrl || !supabaseAnonKey) {
    res.status(500).json({ error: 'Assistente ainda não configurado neste ambiente.' });
    return;
  }

  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) {
    res.status(401).json({ error: 'Não autenticado.' });
    return;
  }

  // Cliente com a chave anon, mas autenticado como o próprio usuário (token
  // dele no header) — nunca service_role. Toda leitura/escrita abaixo passa
  // pela RLS de metrics_assistant_usos, igual aconteceria vindo do navegador.
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });

  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  if (userError || !userData?.user) {
    res.status(401).json({ error: 'Sessão inválida ou expirada. Atualize a página e entre de novo.' });
    return;
  }
  const userId = userData.user.id;

  const desde = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { count, error: countError } = await supabase
    .from('metrics_assistant_usos')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('criado_em', desde);

  if (!countError && count >= LIMITE_PERGUNTAS_POR_DIA) {
    res.status(429).json({ error: 'Você atingiu o limite de perguntas por hoje. Tente de novo amanhã.' });
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

    // Não bloqueia a resposta se o log falhar — só registra o problema.
    const { error: logError } = await supabase.from('metrics_assistant_usos').insert({ user_id: userId });
    if (logError) console.error('Erro ao registrar uso do assistente:', logError.message);

    res.status(200).json({ answer });
  } catch (err) {
    console.error('Erro ao chamar o assistente de métricas:', err.message);
    res.status(500).json({ error: 'Não consegui falar com o assistente agora. Tente de novo em instantes.' });
  }
}
