import { renderHook, waitFor, act } from '@testing-library/react';
import { useLeads } from './useLeads';
import { seedLeads } from '../data/seedLeads';

// Sem REACT_APP_SUPABASE_URL/KEY no ambiente de teste, o app sempre cai em modo demo.
describe('useLeads (modo demo)', () => {
  test('carrega os leads de exemplo e marca isDemoMode', async () => {
    const { result } = renderHook(() => useLeads());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.isDemoMode).toBe(true);
    expect(result.current.leads).toEqual(seedLeads);
  });

  test('createLead adiciona um novo lead no topo da lista', async () => {
    const { result } = renderHook(() => useLeads());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.createLead({ nome: 'Nova Empresa', origem: 'Site', valor: 500, etapa: 'novo' });
    });

    expect(result.current.leads).toHaveLength(seedLeads.length + 1);
    expect(result.current.leads[0]).toMatchObject({ nome: 'Nova Empresa', origem: 'Site', valor: 500, etapa: 'novo' });
  });

  test('moveStage atualiza a etapa do lead correto', async () => {
    const { result } = renderHook(() => useLeads());
    await waitFor(() => expect(result.current.loading).toBe(false));

    const [firstLead] = result.current.leads;

    await act(async () => {
      await result.current.moveStage(firstLead.id, 'fechado');
    });

    const updated = result.current.leads.find((l) => l.id === firstLead.id);
    expect(updated.etapa).toBe('fechado');
  });

  test('updateLead altera os dados do lead correto sem mexer nos demais', async () => {
    const { result } = renderHook(() => useLeads());
    await waitFor(() => expect(result.current.loading).toBe(false));

    const [firstLead, secondLead] = result.current.leads;

    await act(async () => {
      await result.current.updateLead(firstLead.id, { nome: 'Nome Editado', valor: 999 });
    });

    const updated = result.current.leads.find((l) => l.id === firstLead.id);
    const untouched = result.current.leads.find((l) => l.id === secondLead.id);
    expect(updated).toMatchObject({ nome: 'Nome Editado', valor: 999 });
    expect(untouched).toEqual(secondLead);
  });

  test('deleteLead remove o lead da lista', async () => {
    const { result } = renderHook(() => useLeads());
    await waitFor(() => expect(result.current.loading).toBe(false));

    const [firstLead] = result.current.leads;

    await act(async () => {
      await result.current.deleteLead(firstLead.id);
    });

    expect(result.current.leads.find((l) => l.id === firstLead.id)).toBeUndefined();
    expect(result.current.leads).toHaveLength(seedLeads.length - 1);
  });
});
