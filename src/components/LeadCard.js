import { STAGES } from '../data/stages';

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
}

function LeadCard({ lead, onMoveStage, onDelete }) {
  const currentIndex = STAGES.findIndex((s) => s.id === lead.etapa);
  const prevStage = STAGES[currentIndex - 1];
  const nextStage = STAGES[currentIndex + 1];

  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-md border border-gray-700/60 hover:border-gray-600 transition-colors">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-white font-medium text-sm leading-tight">{lead.nome}</h3>
        <button
          onClick={() => onDelete(lead.id)}
          className="text-gray-500 hover:text-red-400 text-xs shrink-0"
          title="Remover lead"
          aria-label="Remover lead"
        >
          ✕
        </button>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
        <span>{lead.origem}</span>
        <span className="text-gray-300 font-medium">{formatCurrency(lead.valor)}</span>
      </div>

      <div className="flex items-center justify-between gap-2">
        <button
          disabled={!prevStage}
          onClick={() => prevStage && onMoveStage(lead.id, prevStage.id)}
          className="text-xs px-2 py-1 rounded-md bg-gray-700/60 text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
        >
          ← Voltar
        </button>
        <button
          disabled={!nextStage}
          onClick={() => nextStage && onMoveStage(lead.id, nextStage.id)}
          className="text-xs px-2 py-1 rounded-md bg-gray-700/60 text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
        >
          Avançar →
        </button>
      </div>
    </div>
  );
}

export default LeadCard;