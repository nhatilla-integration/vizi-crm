import { useState } from 'react';
import { ORIGENS } from '../data/stages';

function LeadFormModal({ open, lead, onClose, onSubmit }) {
  const [nome, setNome] = useState(lead?.nome ?? '');
  const [origem, setOrigem] = useState(lead?.origem ?? ORIGENS[0]);
  const [valor, setValor] = useState(lead?.valor ?? '');
  const [telefone, setTelefone] = useState(lead?.telefone ?? '');
  const [tags, setTags] = useState((lead?.tags ?? []).join(', '));
  const [notas, setNotas] = useState(lead?.notas ?? '');

  if (!open) return null;

  const isEditing = Boolean(lead);

  function handleSubmit(e) {
    e.preventDefault();
    if (!nome.trim()) return;

    onSubmit({
      nome: nome.trim(),
      origem,
      valor: Number(valor) || 0,
      telefone: telefone.trim(),
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      notas: notas.trim(),
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-slate-900 font-semibold text-lg">{isEditing ? 'Editar lead' : 'Novo lead'}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700" aria-label="Fechar">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-slate-500 uppercase tracking-wide mb-1 block">Nome / Empresa</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Aura Estética"
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 uppercase tracking-wide mb-1 block">Origem</label>
              <select
                value={origem}
                onChange={(e) => setOrigem(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
              >
                {ORIGENS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-500 uppercase tracking-wide mb-1 block">Valor estimado (R$)</label>
              <input
                type="number"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                placeholder="0"
                min="0"
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-500 uppercase tracking-wide mb-1 block">Telefone / WhatsApp</label>
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="(11) 98888-0000"
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
            />
          </div>

          <div>
            <label className="text-xs text-slate-500 uppercase tracking-wide mb-1 block">Tags (separadas por vírgula)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="quente, recorrente"
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
            />
          </div>

          <div>
            <label className="text-xs text-slate-500 uppercase tracking-wide mb-1 block">Notas</label>
            <textarea
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              placeholder="Observações sobre esse lead..."
              rows={3}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue resize-none"
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-brand-orange hover:bg-brand-orangeDark transition-colors text-white text-sm font-semibold rounded-lg py-2.5 shadow-sm"
          >
            {isEditing ? 'Salvar alterações' : 'Adicionar lead'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LeadFormModal;
