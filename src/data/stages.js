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
    dot: 'bg-blue-500',
    text: 'text-blue-700',
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    headerBar: 'bg-blue-500',
  },
  amber: {
    dot: 'bg-amber-500',
    text: 'text-amber-700',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    headerBar: 'bg-amber-500',
  },
  violet: {
    dot: 'bg-violet-500',
    text: 'text-violet-700',
    badge: 'bg-violet-50 text-violet-700 border-violet-200',
    headerBar: 'bg-violet-500',
  },
  green: {
    dot: 'bg-green-500',
    text: 'text-green-700',
    badge: 'bg-green-50 text-green-700 border-green-200',
    headerBar: 'bg-green-500',
  },
  red: {
    dot: 'bg-red-500',
    text: 'text-red-700',
    badge: 'bg-red-50 text-red-700 border-red-200',
    headerBar: 'bg-red-500',
  },
};
