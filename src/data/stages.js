// Etapas do funil comercial. A ordem aqui define a ordem das colunas no Kanban.
export const STAGES = [
  { id: 'novo', label: 'Novo', color: 'blue' },
  { id: 'em_contato', label: 'Em Contato', color: 'amber' },
  { id: 'orcamento', label: 'Orçamento Enviado', color: 'violet' },
  { id: 'fechado', label: 'Fechado', color: 'green' },
  { id: 'perdido', label: 'Perdido', color: 'red' },
];

export const STAGE_IDS = STAGES.map((s) => s.id);

export const ORIGENS = ['Instagram', 'Google Ads', 'Indicação', 'WhatsApp', 'Site', 'Outro'];

// Mapa de cor -> classes Tailwind (evita strings dinâmicas, que o Tailwind
// não consegue compilar corretamente em build de produção).
export const STAGE_COLOR_CLASSES = {
  blue: {
    dot: 'bg-blue-400',
    text: 'text-blue-400',
    badge: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    headerBorder: 'border-blue-500/40',
  },
  amber: {
    dot: 'bg-amber-400',
    text: 'text-amber-400',
    badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    headerBorder: 'border-amber-500/40',
  },
  violet: {
    dot: 'bg-violet-400',
    text: 'text-violet-400',
    badge: 'bg-violet-500/10 text-violet-300 border-violet-500/30',
    headerBorder: 'border-violet-500/40',
  },
  green: {
    dot: 'bg-green-400',
    text: 'text-green-400',
    badge: 'bg-green-500/10 text-green-300 border-green-500/30',
    headerBorder: 'border-green-500/40',
  },
  red: {
    dot: 'bg-red-400',
    text: 'text-red-400',
    badge: 'bg-red-500/10 text-red-300 border-red-500/30',
    headerBorder: 'border-red-500/40',
  },
};