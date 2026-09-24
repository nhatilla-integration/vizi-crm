import { useState } from 'react';
import { STAGES } from '../data/stages';

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
}

function LeadCard({ lead, onMoveStage, onDelete, onEdit }) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const currentIndex = STAGES.findIndex((s) => s.id === lead.etapa);
  const prevStage = STAGES[currentIndex - 1];
  const nextStage = STAGES[currentIndex + 1];

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="text-slate-900 font-semibold text-sm leading-tight">{lead.nome}</h3>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onEdit(lead)}
            className="text-slate-400 hover:text-brand-blue text-xs"
            title="Editar lead"
            aria-label="Editar lead"
          >
            ✎
          </button>
          <button
            onClick={() => setConfirmingDelete(true)}
            className="text-slate-400 hover:text-red-500 text-xs"
            title="Remover lead"
            aria-label="Remover lead"
          >
            ✕
          </button>
        </div>
      </div>

      {lead.telefone && <p className="text-xs text-slate-500 mb-2">{lead.telefone}</p>}

      {confirmingDelete && (
        <div className="flex items-center justify-between gap-2 mb-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          <span className="text-xs text-red-700">Excluir este lead?</span>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => onDelete(lead.id)}
              className="text-xs px-2 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              Excluir
            </button>
            <button
              onClick={() => setConfirmingDelete(false)}
              className="text-xs px-2 py-1 rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-xs mb-2">
        <span className="text-slate-500">{lead.origem}</span>
        <span className="text-slate-900 font-semibold">{formatCurrency(lead.valor)}</span>
      </div>

      {lead.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {lead.tags.map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              {tag}
            </span>
          ))}
        </div>
      )}

      {lead.notas && (
        <p className="text-xs text-slate-500 italic mb-3 line-clamp-2" title={lead.notas}>
          {lead.notas}
        </p>
      )}

      <div className="flex items-center justify-between gap-2 mt-3">
        <button
          disabled={!prevStage}
          onClick={() => prevStage && onMoveStage(lead.id, prevStage.id)}
          className="text-xs px-2 py-1 rounded-md bg-slate-100 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-200 transition-colors"
        >
          ← Voltar
        </button>
        <button
          disabled={!nextStage}
          onClick={() => nextStage && onMoveStage(lead.id, nextStage.id)}
          className="text-xs px-2 py-1 rounded-md bg-slate-100 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-200 transition-colors"
        >
          Avançar →
        </button>
      </div>
    </div>
  );
}

export default LeadCard;
