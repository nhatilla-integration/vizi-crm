// Dados usados em modo demonstração, quando o app roda sem Supabase configurado.
// Isso garante que o Vizi sempre tem algo pra mostrar, mesmo sem banco de dados.
export const seedLeads = [
  { id: 'demo-1', nome: 'Aura Estética', origem: 'Instagram', etapa: 'novo', valor: 1800, telefone: '(11) 98888-1001', tags: ['quente'], notas: 'Pediu orçamento pelo direct, ainda não respondeu ao contato.', created_at: '2026-06-10T10:00:00Z' },
  { id: 'demo-2', nome: 'MariDecor', origem: 'Indicação', etapa: 'em_contato', valor: 3200, telefone: '(11) 98888-1002', tags: ['indicação'], notas: 'Indicada por cliente antigo, aguardando retorno sobre orçamento.', created_at: '2026-06-09T14:30:00Z' },
  { id: 'demo-3', nome: 'Studio Bella', origem: 'Google Ads', etapa: 'orcamento', valor: 2400, telefone: '(11) 98888-1003', tags: ['quente', 'recorrente'], notas: 'Já é cliente, quer expandir contrato.', created_at: '2026-06-08T09:15:00Z' },
  { id: 'demo-4', nome: 'Casa Verde Decorações', origem: 'WhatsApp', etapa: 'orcamento', valor: 1950, telefone: '(11) 98888-1004', tags: [], notas: '', created_at: '2026-06-07T16:45:00Z' },
  { id: 'demo-5', nome: 'Loja do Pedro', origem: 'Site', etapa: 'fechado', valor: 4100, telefone: '(11) 98888-1005', tags: ['recorrente'], notas: 'Fechou pacote anual.', created_at: '2026-06-05T11:00:00Z' },
  { id: 'demo-6', nome: 'Ateliê Flor de Lis', origem: 'Instagram', etapa: 'fechado', valor: 2700, telefone: '(11) 98888-1006', tags: [], notas: '', created_at: '2026-06-03T08:30:00Z' },
  { id: 'demo-7', nome: 'Doce Sabor Confeitaria', origem: 'Indicação', etapa: 'perdido', valor: 1200, telefone: '(11) 98888-1007', tags: ['frio'], notas: 'Achou o valor alto e foi pra um concorrente.', created_at: '2026-06-01T13:00:00Z' },
  { id: 'demo-8', nome: 'Espaço Zen', origem: 'Google Ads', etapa: 'novo', valor: 2900, telefone: '(11) 98888-1008', tags: ['quente'], notas: '', created_at: '2026-06-11T17:20:00Z' },
];
