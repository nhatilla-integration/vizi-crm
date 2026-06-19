import LeadCard from './LeadCard';
import { STAGE_COLOR_CLASSES } from '../data/stages';

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
}

function KanbanColumn({ stage, leads, onMoveStage, onDelete }) {
  const colors = STAGE_COLOR_CLASSES[stage.color];
  const total = leads.reduce((sum, l) => sum + (l.valor || 0), 0);

  return (
    <div className="flex flex-col bg-gray-900/60 rounded-2xl p-3 min-w-[260px] w-[260px] shrink-0">
      <div className={`flex items-center justify-between mb-3 pb-3 border-b ${colors.headerBorder}`}>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
          <h3 className="text-sm font-semibold text-gray-200">{stage.label}</h3>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full border ${colors.badge}`}>{leads.length}</span>
      </div>

      <p className="text-xs text-gray-500 mb-3">{formatCurrency(total)} em jogo</p>

      <div className="flex flex-col gap-2 overflow-y-auto max-h-[420px] pr-1">
        {leads.length === 0 && (
          <p className="text-xs text-gray-600 italic py-4 text-center">Nenhum lead nesta etapa</p>
        )}
        {leads.map((lead) => (
          <LeadCard key={lead.id} lead={lead} onMoveStage={onMoveStage} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}

export default KanbanColumn;