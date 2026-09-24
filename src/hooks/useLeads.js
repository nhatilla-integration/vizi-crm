import { useEffect, useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { seedLeads } from '../data/seedLeads';

export function useLeads(session) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isAuthenticated = isSupabaseConfigured && Boolean(session);

  const fetchLeads = useCallback(async () => {
    if (!isAuthenticated) {
      setLeads(seedLeads);
      setError(null);
      setLoading(false);
      return;
    }

    const { data, error: fetchError } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      // Se a busca falhar (rede, permissão, etc.), avisa em vez de deixar a
      // tela em branco ou quebrada.
      console.error('Erro ao buscar leads do Supabase:', fetchError.message);
      setError('Não foi possível carregar os leads. Tente atualizar a página.');
    } else {
      setLeads(data);
      setError(null);
    }
    setLoading(false);
  }, [isAuthenticated]);

  useEffect(() => {
    setLoading(true);
    fetchLeads();
  }, [fetchLeads]);

  // Realtime: qualquer mudança na tabela 'leads' atualiza a tela sozinha.
  useEffect(() => {
    if (!isAuthenticated) return;

    const channel = supabase
      .channel('leads-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, () => {
        fetchLeads();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAuthenticated, fetchLeads]);

  async function createLead(newLead) {
    if (!isAuthenticated) {
      setLeads((prev) => [
        { ...newLead, id: `demo-${Date.now()}`, created_at: new Date().toISOString() },
        ...prev,
      ]);
      return;
    }

    const { error: createError } = await supabase.from('leads').insert([newLead]);
    if (createError) {
      console.error('Erro ao criar lead:', createError.message);
      setError('Não foi possível salvar o lead. Tente novamente.');
    }
  }

  async function moveStage(id, novaEtapa) {
    if (!isAuthenticated) {
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, etapa: novaEtapa } : l)));
      return;
    }

    const { error: moveError } = await supabase.from('leads').update({ etapa: novaEtapa }).eq('id', id);
    if (moveError) {
      console.error('Erro ao mover etapa:', moveError.message);
      setError('Não foi possível mover o lead. Tente novamente.');
    }
  }

  async function updateLead(id, updates) {
    if (!isAuthenticated) {
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)));
      return;
    }

    const { error: updateError } = await supabase.from('leads').update(updates).eq('id', id);
    if (updateError) {
      console.error('Erro ao atualizar lead:', updateError.message);
      setError('Não foi possível atualizar o lead. Tente novamente.');
    }
  }

  async function deleteLead(id) {
    if (!isAuthenticated) {
      setLeads((prev) => prev.filter((l) => l.id !== id));
      return;
    }

    const { error: deleteError } = await supabase.from('leads').delete().eq('id', id);
    if (deleteError) {
      console.error('Erro ao remover lead:', deleteError.message);
      setError('Não foi possível remover o lead. Tente novamente.');
    }
  }

  return {
    leads,
    loading,
    isDemoMode: !isAuthenticated,
    error,
    clearError: () => setError(null),
    createLead,
    updateLead,
    moveStage,
    deleteLead,
  };
}
