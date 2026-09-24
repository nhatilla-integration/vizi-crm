import { useState } from 'react';
import Logo from './Logo';

const FUNCOES = ['Dono(a) do negócio', 'Vendas / Atendimento', 'Marketing', 'Outro'];

function LoginScreen({ mode = 'login', onLogin, onLoginSubmit, onBack }) {
  const isSignup = mode === 'signup';

  const [nome, setNome] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [funcao, setFuncao] = useState(FUNCOES[0]);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg('');

    if (isSignup) {
      onLogin();
      return;
    }

    setSubmitting(true);
    const { error } = await onLoginSubmit(email, senha);
    setSubmitting(false);

    if (error) {
      setErrorMsg(error);
    } else {
      onLogin();
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col items-center justify-center px-4 py-12">
      <button onClick={onBack} className="absolute top-6 left-6 flex items-center gap-2.5">
        <Logo size={30} />
        <span className="text-sm font-bold text-brand-blueDark">ViZi</span>
      </button>

      <div className="bg-white rounded-xl p-8 w-full max-w-sm border border-slate-200 shadow-sm">
        <h1 className="text-xl font-bold text-brand-blueDark mb-1">
          {isSignup ? 'Comece a usar o Vizi' : 'Entrar no Vizi'}
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          {isSignup ? 'Sem compromisso. Você decide depois se quer continuar.' : 'Acesse seu funil de leads.'}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isSignup && (
            <>
              <div>
                <label className="text-xs text-slate-500 uppercase tracking-wide mb-1 block">Nome completo</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                  autoFocus
                />
              </div>

              <div>
                <label className="text-xs text-slate-500 uppercase tracking-wide mb-1 block">Nome da empresa</label>
                <input
                  type="text"
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                  placeholder="Ex: Loja do Pedro"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="text-xs text-slate-500 uppercase tracking-wide mb-1 block">Função</label>
                <select
                  value={funcao}
                  onChange={(e) => setFuncao(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                >
                  {FUNCOES.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div>
            <label className="text-xs text-slate-500 uppercase tracking-wide mb-1 block">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@empresa.com"
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
              autoFocus={!isSignup}
            />
          </div>

          <div>
            <label className="text-xs text-slate-500 uppercase tracking-wide mb-1 block">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
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
            {submitting ? 'Entrando...' : isSignup ? 'Criar minha conta' : 'Entrar'}
          </button>
        </form>

        {isSignup && (
          <p className="text-xs text-slate-400 text-center mt-5">
            Esse cadastro ainda é só visual. Ao continuar você acessa o modo demonstração.
          </p>
        )}
      </div>
    </div>
  );
}

export default LoginScreen;
