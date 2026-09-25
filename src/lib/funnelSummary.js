// Monta um resumo agregado do funil pra mandar pro assistente de métricas.
// Só números — nunca nome, telefone ou notas de lead nenhum.
export function buildFunnelSummary(leads) {
  const porEtapa = {};
  const porOrigem = {};
  let totalValor = 0;

  leads.forEach((lead) => {
    porEtapa[lead.etapa] = (porEtapa[lead.etapa] || 0) + 1;

    if (!porOrigem[lead.origem]) {
      porOrigem[lead.origem] = { quantidade: 0, valorTotal: 0, fechados: 0, perdidos: 0 };
    }
    porOrigem[lead.origem].quantidade += 1;
    porOrigem[lead.origem].valorTotal += lead.valor || 0;
    if (lead.etapa === 'fechado') porOrigem[lead.origem].fechados += 1;
    if (lead.etapa === 'perdido') porOrigem[lead.origem].perdidos += 1;

    totalValor += lead.valor || 0;
  });

  return {
    totalLeads: leads.length,
    totalValorEmJogo: totalValor,
    porEtapa,
    porOrigem,
  };
}
