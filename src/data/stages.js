// Etapas do funil comercial. A ordem aqui define a ordem das colunas no Kanban.
export const STAGES = [
  { id: 'novo', label: 'Novo', color: 'cyan' },
  { id: 'em_contato', label: 'Em Contato', color: 'orange' },
  { id: 'orcamento', label: 'Orçamento Enviado', color: 'fuchsia' },
  { id: 'fechado', label: 'Fechado', color: 'emerald' },
  { id: 'perdido', label: 'Perdido', color: 'rose' },
];

export const STAGE_IDS = STAGES.map((s) => s.id);

export const ORIGENS = ['Instagram', 'Google Ads', 'Indicação', 'WhatsApp', 'Site', 'Outro'];

// Mapa de cor -> classes Tailwind (evita strings dinâmicas, que o Tailwind
// não consegue compilar corretamente em build de produção).
export const STAGE_COLOR_CLASSES = {
  cyan: {
    dot: 'bg-cyan-400',
    dotGlow: 'shadow-[0_0_10px_2px_rgba(34,211,238,0.6)]',
    text: 'text-cyan-400',
    badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-400/40',
    headerBorder: 'border-cyan-400/50',
  },
  orange: {
    dot: 'bg-orange-400',
    dotGlow: 'shadow-[0_0_10px_2px_rgba(251,146,60,0.6)]',
    text: 'text-orange-400',
    badge: 'bg-orange-500/15 text-orange-300 border-orange-400/40',
    headerBorder: 'border-orange-400/50',
  },
  fuchsia: {
    dot: 'bg-fuchsia-400',
    dotGlow: 'shadow-[0_0_10px_2px_rgba(232,121,249,0.6)]',
    text: 'text-fuchsia-400',
    badge: 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-400/40',
    headerBorder: 'border-fuchsia-400/50',
  },
  emerald: {
    dot: 'bg-emerald-400',
    dotGlow: 'shadow-[0_0_10px_2px_rgba(52,211,153,0.6)]',
    text: 'text-emerald-400',
    badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/40',
    headerBorder: 'border-emerald-400/50',
  },
  rose: {
    dot: 'bg-rose-400',
    dotGlow: 'shadow-[0_0_10px_2px_rgba(251,113,133,0.6)]',
    text: 'text-rose-400',
    badge: 'bg-rose-500/15 text-rose-300 border-rose-400/40',
    headerBorder: 'border-rose-400/50',
  },
};