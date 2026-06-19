import { useEffect, useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { seedLeads } from '../data/seedLeads';

export function useLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(!isSupabaseConfigured);

  const fetchLeads = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setLeads(seedLeads);
      setIsDemoMode(true);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      // Se a tabela ainda não existe ou algo falha, cai em modo demo
      // em vez de deixar a tela quebrada ou em branco.
      console.error('Erro ao buscar leads do Supabase:', error.message);
      setLeads(seedLeads);
      setIsDemoMode(true);
    } else {
      setLeads(data);
      setIsDemoMode(false);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Realtime: qualquer mudança na tabela 'leads' atualiza a tela sozinha.
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const channel = supabase
      .channel('leads-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, () => {
        fetchLeads();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchLeads]);

  async function createLead(newLead) {
    if (isDemoMode) {
      setLeads((prev) => [
        { ...newLead, id: `demo-${Date.now()}`, created_at: new Date().toISOString() },
        ...prev,
      ]);
      return;
    }

    const { error } = await supabase.from('leads').insert([newLead]);
    if (error) console.error('Erro ao criar lead:', error.message);
  }

  async function moveStage(id, novaEtapa) {
    if (isDemoMode) {
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, etapa: novaEtapa } : l)));
      return;
    }

    const { error } = await supabase.from('leads').update({ etapa: novaEtapa }).eq('id', id);
    if (error) console.error('Erro ao mover etapa:', error.message);
  }

  async function deleteLead(id) {
    if (isDemoMode) {
      setLeads((prev) => prev.filter((l) => l.id !== id));
      return;
    }

    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (error) console.error('Erro ao remover lead:', error.message);
  }

  return { leads, loading, isDemoMode, createLead, moveStage, deleteLead };
}