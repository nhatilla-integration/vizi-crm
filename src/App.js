import { useMemo, useState } from 'react';
import MetricCard from './components/MetricCard';
import KanbanColumn from './components/KanbanColumn';
import NewLeadModal from './components/NewLeadModal';
import { useLeads } from './hooks/useLeads';
import { STAGES } from './data/stages';

function App() {
  const { leads, loading, isDemoMode, createLead, moveStage, deleteLead } = useLeads();
  const [modalOpen, setModalOpen] = useState(false);

  const metrics = useMemo(() => {
    const orcamentosSolicitados = leads.filter((l) => l.etapa === 'orcamento' || l.etapa === 'fechado' || l.etapa === 'perdido').length;
    const orcamentosEncaminhados = leads.filter((l) => l.etapa === 'fechado').length;
    const mensagensParadas = leads.filter((l) => l.etapa === 'em_contato').length;

    return { orcamentosSolicitados, orcamentosEncaminhados, mensagensParadas };
  }, [leads]);

  const leadsByStage = useMemo(() => {
    const grouped = {};
    STAGES.forEach((stage) => {
      grouped[stage.id] = leads.filter((l) => l.etapa === stage.id);
    });
    return grouped;
  }, [leads]);

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center pt-12 pb-16 px-4">

      <h1 className="text-6xl font-bold text-white tracking-widest mb-2">ViZi</h1>
      <p className="text-gray-400 text-lg mb-2">Visibilidade comercial em tempo real</p>

      {isDemoMode && !loading && (
        <span className="text-xs text-amber-400/80 bg-amber-500/10 border border-amber-500/30 rounded-full px-3 py-1 mb-8">
          Modo demonstração — conecte o Supabase para dados reais
        </span>
      )}
      {!isDemoMode && <div className="mb-8" />}

      <div className="flex gap-6 mb-12 flex-wrap justify-center">
        <MetricCard label="Orçamentos Solicitados" value={metrics.orcamentosSolicitados} />
        <MetricCard label="Orçamentos Encaminhados" value={metrics.orcamentosEncaminhados} valueColor="text-green-400" />
        <MetricCard label="Mensagens Paradas" value={metrics.mensagensParadas} valueColor="text-red-400" />
      </div>

      <div className="w-full max-w-7xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-300 text-sm uppercase tracking-wider font-semibold">Funil de Leads</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 transition-colors text-white text-sm font-medium rounded-lg px-4 py-2"
          >
            + Novo lead
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500 text-sm">Carregando leads...</p>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {STAGES.map((stage) => (
              <KanbanColumn
                key={stage.id}
                stage={stage}
                leads={leadsByStage[stage.id]}
                onMoveStage={moveStage}
                onDelete={deleteLead}
              />
            ))}
          </div>
        )}
      </div>

      <NewLeadModal open={modalOpen} onClose={() => setModalOpen(false)} onCreate={createLead} />

      <p className="text-gray-700 text-xs mt-12">Vizi CRM · github.com/nhatilla-integration/vizi-crm</p>
    </div>
  );
}

export default App;