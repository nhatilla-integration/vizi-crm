import Logo from './Logo';

const STEPS = [
  {
    title: 'Registre o que chegou',
    description: 'Assim que a mensagem cai no WhatsApp, vira um lead: pedido de orçamento, dúvida sobre um produto ou solicitação de serviço.',
    icon: (
      <>
        <rect x="4" y="6" width="16" height="12" rx="2" />
        <path d="M4 8l8 5 8-5" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: 'Acompanhe pela etapa certa',
    description: 'Mova entre Novo, Em Contato, Orçamento Enviado, Fechado ou Perdido. O funil serve tanto pra quem vende peça e aparelho quanto pra quem cobra pelo conserto.',
    icon: (
      <>
        <rect x="4" y="4" width="4" height="16" rx="1" />
        <rect x="10" y="4" width="4" height="10" rx="1" />
        <rect x="16" y="4" width="4" height="13" rx="1" />
      </>
    ),
  },
  {
    title: 'Entenda o resultado',
    description: 'Veja de onde vêm os clientes que mais fecham negócio, e onde as conversas estão travando antes de virar venda.',
    icon: (
      <>
        <circle cx="10" cy="10" r="6" />
        <path d="M15 15l5 5" strokeLinecap="round" />
      </>
    ),
  },
];

// Miniaturas em HTML/CSS que imitam uma tela real do produto (não temos
// gerador de imagem disponível aqui, então isso substitui uma foto/ilustração).
// O "porta-retrato" (janela + inclinação + sombra) fica no MockupFrame; aqui
// só o conteúdo de cada mini-tela.
const MOCKUPS = {
  funil: (
    <div className="flex gap-1.5">
      <div className="flex-1 space-y-1">
        <div className="h-1.5 w-6 rounded-full bg-blue-400" />
        <div className="h-7 rounded bg-blue-50 border border-blue-200" />
        <div className="h-7 rounded bg-blue-50 border border-blue-200" />
      </div>
      <div className="flex-1 space-y-1">
        <div className="h-1.5 w-6 rounded-full bg-amber-400" />
        <div className="h-7 rounded bg-amber-50 border border-amber-200" />
      </div>
      <div className="flex-1 space-y-1">
        <div className="h-1.5 w-6 rounded-full bg-green-400" />
        <div className="h-7 rounded bg-green-50 border border-green-200" />
        <div className="h-7 rounded bg-green-50 border border-green-200" />
      </div>
    </div>
  ),
  metricas: (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="h-1.5 w-12 rounded-full bg-slate-200" />
        <div className="h-3 w-7 rounded bg-blue-500" />
      </div>
      <div className="flex items-center justify-between">
        <div className="h-1.5 w-12 rounded-full bg-slate-200" />
        <div className="h-3 w-5 rounded bg-green-500" />
      </div>
      <div className="flex items-center justify-between">
        <div className="h-1.5 w-12 rounded-full bg-slate-200" />
        <div className="h-3 w-9 rounded bg-red-500" />
      </div>
    </div>
  ),
  produto: (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 shrink-0 rounded bg-blue-100 flex items-center justify-center text-blue-600 text-[10px] font-bold">P</div>
        <div className="h-1.5 flex-1 rounded-full bg-slate-200" />
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 shrink-0 rounded bg-orange-100 flex items-center justify-center text-brand-orange text-[10px] font-bold">S</div>
        <div className="h-1.5 flex-1 rounded-full bg-slate-200" />
      </div>
    </div>
  ),
  assistente: (
    <div className="space-y-1.5">
      <div className="ml-auto max-w-[80%] bg-brand-blue text-white text-[9px] leading-tight rounded-lg rounded-br-sm px-2 py-1.5">
        Por que essa campanha vendeu mais?
      </div>
      <div className="max-w-[85%] bg-slate-100 text-slate-500 text-[9px] leading-tight rounded-lg rounded-bl-sm px-2 py-1.5">
        Os leads chegam mais qualificados no orçamento.
      </div>
    </div>
  ),
  conexao: (
    <div>
      <div className="flex items-center gap-1.5 mb-2">
        <div className="w-3.5 h-3.5 rounded-full bg-green-500" />
        <div className="h-1.5 w-16 rounded-full bg-slate-200" />
      </div>
      <div className="space-y-1">
        <div className="h-4 w-32 rounded bg-slate-100" />
        <div className="h-4 w-24 rounded bg-slate-100 ml-auto" />
      </div>
    </div>
  ),
};

const STATUS_BADGE = {
  disponivel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.4" className="w-4 h-4">
      <path d="M5 13l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  embreve: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.2" className="w-4 h-4">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

function MockupFrame({ children, status }) {
  return (
    <div className="relative">
      <div className="w-48 bg-white rounded-lg shadow-2xl -rotate-3 overflow-hidden translate-y-2">
        <div className="flex items-center gap-1 px-2.5 py-1.5 border-b border-slate-100">
          <span className="w-1.5 h-1.5 rounded-full bg-red-300" />
          <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
          <span className="w-1.5 h-1.5 rounded-full bg-green-300" />
        </div>
        <div className="p-3">{children}</div>
      </div>
      <div className="absolute -bottom-2 -right-2 bg-white rounded-full shadow-lg p-2">
        {STATUS_BADGE[status ? 'embreve' : 'disponivel']}
      </div>
    </div>
  );
}

const FEATURES = [
  {
    title: 'Funil visual por etapa',
    description: 'Veja de relance quantos atendimentos estão parados em cada fase, do primeiro contato ao orçamento fechado.',
    status: null,
    mockup: 'funil',
  },
  {
    title: 'Métricas em tempo real',
    description: 'Orçamentos solicitados, encaminhados e mensagens paradas, sempre atualizados conforme o funil muda.',
    status: null,
    mockup: 'metricas',
  },
  {
    title: 'Produto e serviço, no mesmo funil',
    description: 'Venda peça, aparelho ou o conserto: as etapas se adaptam a qualquer combinação de produto e serviço.',
    status: null,
    mockup: 'produto',
  },
  {
    title: 'Assistente de métricas',
    description: 'Pergunte por que uma campanha vendeu bem e outra não. A resposta vem em linguagem simples, sem jargão.',
    status: 'Em breve',
    mockup: 'assistente',
  },
  {
    title: 'Conexão com WhatsApp',
    description: 'Puxe automaticamente o que está pendente de atendimento direto das suas conversas.',
    status: 'Em breve',
    mockup: 'conexao',
  },
];

function FeatureCard({ f }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div className="h-40 bg-gradient-to-br from-brand-blue to-brand-orange flex items-center justify-center relative overflow-hidden">
        <span className="absolute w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <span className="absolute top-4 left-6 w-1.5 h-1.5 rounded-full bg-white/50" />
        <span className="absolute bottom-6 right-8 w-1 h-1 rounded-full bg-white/40" />
        <MockupFrame status={f.status}>{MOCKUPS[f.mockup]}</MockupFrame>
      </div>

      <div className="p-5">
        <span
          className={`inline-block text-[10px] font-bold uppercase tracking-wide rounded-full px-2 py-0.5 mb-3 border ${
            f.status ? 'text-brand-orange bg-orange-50 border-orange-200' : 'text-brand-blue bg-blue-50 border-blue-200'
          }`}
        >
          {f.status ?? 'Disponível'}
        </span>
        <h3 className="font-bold text-brand-blueDark mb-1.5">{f.title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
      </div>
    </div>
  );
}

function LandingPage({ onLogin, onSignup, onPreview }) {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-3 items-center">
          <div className="flex items-center gap-2.5">
            <Logo size={34} />
            <span className="text-lg font-bold text-brand-blueDark tracking-tight">ViZi</span>
          </div>

          <div className="hidden md:flex items-center justify-center gap-8 text-sm font-semibold text-slate-700">
            <a href="#como-funciona" className="hover:text-brand-blue transition-colors">Como funciona</a>
            <a href="#funcionalidades" className="hover:text-brand-blue transition-colors">Funcionalidades</a>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onLogin}
              className="border border-slate-300 hover:border-brand-blue hover:text-brand-blue transition-colors text-slate-700 text-sm font-semibold rounded-lg px-4 py-2"
            >
              Entrar
            </button>
            <button
              onClick={onSignup}
              className="bg-brand-orange hover:bg-brand-orangeDark transition-colors text-white text-sm font-semibold rounded-lg px-4 py-2 shadow-sm"
            >
              Experimente grátis
            </button>
          </div>
        </div>
      </nav>

      <header className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <p className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-4">
          CRM para quem atende pelo WhatsApp
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-blueDark tracking-tight leading-tight mb-6">
          Pare de perder venda pra mensagem esquecida no WhatsApp.
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
          O Vizi organiza seus atendimentos por etapa, do primeiro contato até o orçamento ou a venda fechada, e
          mostra onde eles estão travando. Funciona pra quem vende produto, presta serviço, ou os dois ao mesmo tempo.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={onSignup}
            className="bg-brand-orange hover:bg-brand-orangeDark transition-colors text-white text-base font-semibold rounded-lg px-6 py-3 shadow-sm"
          >
            Experimente grátis
          </button>
          <button
            onClick={onPreview}
            className="border border-slate-300 hover:border-brand-blue hover:text-brand-blue transition-colors text-slate-700 text-base font-semibold rounded-lg px-6 py-3"
          >
            Ver o funil em ação
          </button>
        </div>
      </header>

      <section className="bg-[#F4F6F9] py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-start">
          <h2 className="text-3xl font-bold text-brand-blueDark">O que é o Vizi?</h2>
          <p className="text-slate-600 leading-relaxed">
            O Vizi funciona como uma "peneira inteligente" para o seu processo comercial: ele analisa os dados do
            seu funil para identificar padrões, gargalos e oportunidades de melhoria. A ideia é simples: ajudar
            você a entender quais ações estão gerando resultado e quais processos precisam de ajuste, seja numa
            venda de produto, num conserto ou em qualquer serviço fechado pelo WhatsApp.
          </p>
        </div>
      </section>

      <section id="como-funciona" className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <p className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-3">Passo a passo</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blueDark tracking-tight mb-4">Como funciona</h2>
          <span className="inline-block w-14 h-1 rounded-full bg-brand-orange mb-5" />
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            Do primeiro "oi" no WhatsApp até fechar a venda ou o serviço, sem planilha e sem perder o fio da conversa.
          </p>
        </div>
        <div className="grid sm:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-stretch">
          {STEPS.flatMap((step, i) => {
            const card = (
              <div key={step.title} className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-orange flex items-center justify-center mb-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" className="w-6 h-6">
                    {step.icon}
                  </svg>
                </div>
                <h3 className="font-bold text-brand-blueDark mb-1.5">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            );

            if (i === STEPS.length - 1) return [card];

            const arrow = (
              <div key={`arrow-${i}`} className="hidden sm:flex items-center justify-center text-slate-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            );

            return [card, arrow];
          })}
        </div>
      </section>

      <section id="funcionalidades" className="bg-[#F4F6F9] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-3">Funcionalidades</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blueDark tracking-tight mb-4">O que já dá pra fazer</h2>
            <span className="inline-block w-14 h-1 rounded-full bg-brand-orange mb-5" />
            <p className="text-lg text-slate-600 max-w-xl mx-auto">
              Um pedaço de cada tela do Vizi, pra você ver como a informação aparece na prática.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <FeatureCard key={f.title} f={f} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-blueDark py-20 text-center relative overflow-hidden">
        <span className="pointer-events-none absolute -top-16 -left-16 w-72 h-72 bg-brand-blue/40 rounded-full blur-3xl" />
        <span className="pointer-events-none absolute -bottom-20 -right-16 w-72 h-72 bg-brand-orange/25 rounded-full blur-3xl" />

        <div className="relative max-w-2xl mx-auto px-6">
          <div className="flex justify-center mb-6">
            <Logo size={44} />
          </div>
          <p className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-3">Ainda em fase de testes</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Pronto pra organizar seu funil?
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-lg mx-auto">
            Entre, mexa nos leads de exemplo e me diga o que faz sentido pra você. Sua opinião ajuda a moldar o
            Vizi nessa fase inicial.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={onSignup}
              className="bg-brand-orange hover:bg-brand-orangeDark transition-colors text-white text-base font-semibold rounded-lg px-7 py-3.5 shadow-lg"
            >
              Experimente grátis
            </button>
            <button
              onClick={onLogin}
              className="border border-white/30 hover:border-white transition-colors text-white text-base font-semibold rounded-lg px-7 py-3.5"
            >
              Entrar
            </button>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center">
        <p className="text-slate-400 text-xs">Vizi CRM · github.com/nhatilla-integration/vizi-crm</p>
      </footer>
    </div>
  );
}

export default LandingPage;
