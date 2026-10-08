import { useState } from 'react';
import Logo from './Logo';

function ResetPasswordScreen({ onUpdatePassword }) {
  const [senha, setSenha] = useState('');
  const [confirmacao, setConfirmacao] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg('');

    if (senha.length < 6) {
      setErrorMsg('A senha precisa ter pelo menos 6 caracteres.');
      return;
    }

    if (senha !== confirmacao) {
      setErrorMsg('As senhas não são iguais.');
      return;
    }

    setSubmitting(true);
    const { error } = await onUpdatePassword(senha);
    setSubmitting(false);

    if (error) {
      setErrorMsg(error);
    } else {
      setDone(true);
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col items-center justify-center px-4 py-12">
      <div className="absolute top-6 left-6 flex items-center gap-2.5">
        <Logo size={30} />
        <span className="text-sm font-bold text-brand-blueDark">ViZi</span>
      </div>

      <div className="bg-white rounded-xl p-8 w-full max-w-sm border border-slate-200 shadow-sm">
        {done ? (
          <>
            <h1 className="text-xl font-bold text-brand-blueDark mb-1">Senha atualizada</h1>
            <p className="text-sm text-slate-500">Sua senha foi alterada. Recarregue a página pra entrar no Vizi.</p>
          </>
        ) : (
          <>
            <h1 className="text-xl font-bold text-brand-blueDark mb-1">Definir nova senha</h1>
            <p className="text-sm text-slate-500 mb-6">Escolha uma nova senha pra sua conta.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-slate-500 uppercase tracking-wide mb-1 block">Nova senha</label>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                  autoFocus
                />
              </div>

              <div>
                <label className="text-xs text-slate-500 uppercase tracking-wide mb-1 block">Confirmar nova senha</label>
                <input
                  type="password"
                  value={confirmacao}
                  onChange={(e) => setConfirmacao(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                />
              </div>

              {errorMsg && (
                <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 bg-brand-orange hover:bg-brand-orangeDark transition-colors text-white text-sm font-semibold rounded-lg py-2.5 shadow-sm disabled:opacity-60"
              >
                {submitting ? 'Salvando...' : 'Salvar nova senha'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ResetPasswordScreen;
