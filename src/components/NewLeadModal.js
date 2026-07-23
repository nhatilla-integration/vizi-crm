import { useState } from 'react';
import { ORIGENS } from '../data/stages';

function NewLeadModal({ open, onClose, onCreate }) {
  const [nome, setNome] = useState('');
  const [origem, setOrigem] = useState(ORIGENS[0]);
  const [valor, setValor] = useState('');

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!nome.trim()) return;

    onCreate({
      nome: nome.trim(),
      origem,
      valor: Number(valor) || 0,
      etapa: 'novo',
    });

    setNome('');
    setValor('');
    setOrigem(ORIGENS[0]);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-cyan-400/20 shadow-[0_0_40px_-12px_rgba(34,211,238,0.4)]">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-semibold text-lg">Novo lead</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Fechar">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wide mb-1 block">Nome / Empresa</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Aura Estética"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-400"
              autoFocus
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wide mb-1 block">Origem</label>
            <select
              value={origem}
              onChange={(e) => setOrigem(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-400"
            >
              {ORIGENS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wide mb-1 block">Valor estimado (R$)</label>
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="0"
              min="0"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:brightness-110 transition-all text-white text-sm font-medium rounded-lg py-2.5 shadow-[0_0_20px_-6px_rgba(232,121,249,0.8)]"
          >
            Adicionar lead
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewLeadModal;