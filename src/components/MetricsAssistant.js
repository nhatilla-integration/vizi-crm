import { useState } from 'react';
import { buildFunnelSummary } from '../lib/funnelSummary';

function MetricsAssistant({ leads }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleAsk(e) {
    e.preventDefault();
    if (!question.trim() || loading) return;

    setLoading(true);
    setError('');
    setAnswer('');

    try {
      const res = await fetch('/api/metrics-assistant', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ question, summary: buildFunnelSummary(leads) }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        setError('O assistente ainda não está disponível neste ambiente.');
        return;
      }

      if (!res.ok) {
        setError(data.error || 'Não consegui responder agora.');
      } else {
        setAnswer(data.answer);
      }
    } catch {
      setError('Não consegui falar com o assistente agora. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 mb-8">
      <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-1">Assistente de métricas</h2>
      <p className="text-xs text-slate-500 mb-4">Pergunte sobre o seu funil, em português simples.</p>

      <form onSubmit={handleAsk} className="flex gap-2 mb-3 flex-wrap">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ex: por que a maioria dos leads está parada em Em Contato?"
          className="flex-1 min-w-[200px] bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-brand-orange hover:bg-brand-orangeDark transition-colors text-white text-sm font-semibold rounded-lg px-4 py-2 shadow-sm disabled:opacity-60 shrink-0"
        >
          {loading ? 'Pensando...' : 'Perguntar'}
        </button>
      </form>

      {error && (
        <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
      )}

      {answer && (
        <p className="text-sm text-slate-700 bg-blue-50/60 border border-blue-100 rounded-lg px-4 py-3 leading-relaxed">
          {answer}
        </p>
      )}
    </div>
  );
}

export default MetricsAssistant;
