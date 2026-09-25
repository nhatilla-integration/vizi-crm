import { useEffect, useMemo, useState } from 'react';
import MetricCard from './components/MetricCard';
import KanbanColumn from './components/KanbanColumn';
import LeadFormModal from './components/LeadFormModal';
import Logo from './components/Logo';
import LandingPage from './components/LandingPage';
import LoginScreen from './components/LoginScreen';
import MetricsAssistant from './components/MetricsAssistant';
import { useAuth } from './hooks/useAuth';
import { useLeads } from './hooks/useLeads';
import { STAGES } from './data/stages';

function App() {
  const { session, authLoading, signIn, signOut } = useAuth();
  const { leads, loading, isDemoMode, error, clearError, createLead, updateLead, moveStage, deleteLead } = useLeads(session);
  const [formState, setFormState] = useState({ open: false, lead: null });
  const [view, setView] = useState('landing');
  const [authMode, setAuthMode] = useState('login');

  // Se já existe uma sessão ativa (ex: usuário atualizou a página depois de
  // logar), pula a landing/login e vai direto pro funil.
  useEffect(() => {
    if (!authLoading && session) {
      setView('app');
    }
  }, [authLoading, session]);

  function goToAuth(mode) {
    setAuthMode(mode);
    setView('login');
  }

  async function handleSignOut() {
    await signOut();
    setView('landing');
  }

  function openCreateForm() {
    setFormState({ open: true, lead: null });
  }

  function openEditForm(lead) {
    setFormState({ open: true, lead });
  }

  function closeForm() {
    setFormState({ open: false, lead: null });
  }

  function handleFormSubmit(data) {
    if (formState.lead) {
      updateLead(formState.lead.id, data);
    } else {
      createLead({ ...data, etapa: 'novo' });
    }
  }

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

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#F4F6F9] flex items-center justify-center">
        <p className="text-slate-400 text-sm">Carregando...</p>
      </div>
    );
  }

  if (view === 'landing') {
    return (
      <LandingPage
        onLogin={() => goToAuth('login')}
        onSignup={() => goToAuth('signup')}
        onPreview={() => setView('app')}
      />
    );
  }

  if (view === 'login') {
    return (
      <LoginScreen
        mode={authMode}
        onLogin={() => setView('app')}
        onLoginSubmit={signIn}
        onBack={() => setView('landing')}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[#F4F6F9] overflow-hidden">
      <header className="relative z-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Logo size={34} />
            <div className="flex items-baseline gap-2">
              <h1 className="text-xl font-bold text-brand-blueDark tracking-tight">ViZi</h1>
              <p className="text-slate-400 text-xs hidden sm:block">Visibilidade comercial em tempo real</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isDemoMode && !loading && (
              <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
                Modo demonstração — dados de exemplo, não estão sendo salvos
              </span>
            )}
            <button onClick={handleSignOut} className="text-sm font-medium text-slate-500 hover:text-brand-blueDark">
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-4 flex items-center justify-between gap-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-2.5">
            <span>{error}</span>
            <button onClick={clearError} className="text-red-400 hover:text-red-600 shrink-0" aria-label="Fechar aviso">✕</button>
          </div>
        )}

        <div className="flex gap-4 mb-8 flex-wrap">
          <MetricCard label="Orçamentos Solicitados" value={metrics.orcamentosSolicitados} accent="blue" />
          <MetricCard label="Orçamentos Encaminhados" value={metrics.orcamentosEncaminhados} accent="green" />
          <MetricCard label="Mensagens Paradas" value={metrics.mensagensParadas} accent="red" />
        </div>

        <MetricsAssistant leads={leads} />

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-slate-700 text-sm uppercase tracking-wider font-semibold">Funil de Leads</h2>
          <button
            onClick={openCreateForm}
            className="bg-brand-orange hover:bg-brand-orangeDark transition-colors text-white text-sm font-semibold rounded-lg px-4 py-2 shadow-sm"
          >
            + Novo lead
          </button>
        </div>

        {loading ? (
          <p className="text-slate-500 text-sm">Carregando leads...</p>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {STAGES.map((stage) => (
              <KanbanColumn
                key={stage.id}
                stage={stage}
                leads={leadsByStage[stage.id]}
                onMoveStage={moveStage}
                onDelete={deleteLead}
                onEdit={openEditForm}
              />
            ))}
          </div>
        )}

        <LeadFormModal
          key={formState.lead?.id ?? 'new'}
          open={formState.open}
          lead={formState.lead}
          onClose={closeForm}
          onSubmit={handleFormSubmit}
        />

        <p className="text-slate-400 text-xs mt-12 text-center">Vizi CRM · github.com/nhatilla-integration/vizi-crm</p>
      </main>
    </div>
  );
}

export default App;