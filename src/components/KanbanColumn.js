import LeadCard from './LeadCard';
import { STAGE_COLOR_CLASSES } from '../data/stages';

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
}

function KanbanColumn({ stage, leads, onMoveStage, onDelete, onEdit }) {
  const colors = STAGE_COLOR_CLASSES[stage.color];
  const total = leads.reduce((sum, l) => sum + (l.valor || 0), 0);

  return (
    <div className="flex flex-col bg-slate-100/70 rounded-xl min-w-[320px] w-[320px] shrink-0 border border-slate-200 overflow-hidden">
      <span className={`block h-1 ${colors.headerBar}`} />

      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
          <h3 className="text-sm font-semibold text-slate-700">{stage.label}</h3>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full border ${colors.badge}`}>{leads.length}</span>
      </div>

      <p className="text-xs text-slate-500 px-4 pb-3">{formatCurrency(total)} em jogo</p>

      <div className="flex flex-col gap-2 overflow-y-auto max-h-[520px] px-3 pb-3">
        {leads.length === 0 && (
          <p className="text-xs text-slate-400 italic py-4 text-center">Nenhum lead nesta etapa</p>
        )}
        {leads.map((lead) => (
          <LeadCard key={lead.id} lead={lead} onMoveStage={onMoveStage} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
}

export default KanbanColumn;
