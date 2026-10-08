import { useEffect, useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { traduzirErroAuth } from '../lib/authErrors';

export function useAuth() {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(isSupabaseConfigured);
  // true quando o usuário chegou aqui clicando no link de "esqueci minha
  // senha" do e-mail (evento PASSWORD_RECOVERY) — App.js usa isso pra
  // mostrar a tela de definir nova senha em vez de entrar direto no app.
  const [passwordRecovery, setPasswordRecovery] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setAuthLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);
      if (event === 'PASSWORD_RECOVERY') {
        setPasswordRecovery(true);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const signIn = useCallback(async (email, password) => {
    if (!isSupabaseConfigured) {
      return { error: 'Supabase não está configurado neste ambiente.' };
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error ? traduzirErroAuth(error.message) : null };
  }, []);

  // metadata: { nome, empresa, funcao } — vira profile automaticamente via
  // trigger no banco (handle_new_user), não precisa de insert separado aqui.
  const signUp = useCallback(async (email, password, metadata) => {
    if (!isSupabaseConfigured) {
      return { error: 'Supabase não está configurado neste ambiente.' };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      return { error: traduzirErroAuth(error.message) };
    }

    // Por segurança, o Supabase não diz diretamente "esse e-mail já existe"
    // quando a confirmação de e-mail está ligada — devolve uma resposta de
    // "sucesso" com identities vazio nesse caso específico, em vez de erro.
    if (data?.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
      return { error: 'Esse e-mail já está cadastrado. Tente entrar ou recuperar sua senha.' };
    }

    return { error: null };
  }, []);

  const resetPasswordForEmail = useCallback(async (email) => {
    if (!isSupabaseConfigured) {
      return { error: 'Supabase não está configurado neste ambiente.' };
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });
    return { error: error ? traduzirErroAuth(error.message) : null };
  }, []);

  const updatePassword = useCallback(async (novaSenha) => {
    if (!isSupabaseConfigured) {
      return { error: 'Supabase não está configurado neste ambiente.' };
    }

    const { error } = await supabase.auth.updateUser({ password: novaSenha });
    if (!error) setPasswordRecovery(false);
    return { error: error ? traduzirErroAuth(error.message) : null };
  }, []);

  const signOut = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    await supabase.auth.signOut();
  }, []);

  return {
    session,
    authLoading,
    passwordRecovery,
    clearPasswordRecovery: () => setPasswordRecovery(false),
    signIn,
    signUp,
    resetPasswordForEmail,
    updatePassword,
    signOut,
  };
}
