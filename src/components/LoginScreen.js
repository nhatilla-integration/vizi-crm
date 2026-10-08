import { useState } from 'react';
import Logo from './Logo';

const FUNCOES = ['Dono(a) do negócio', 'Vendas / Atendimento', 'Marketing', 'Outro'];

function LoginScreen({ mode = 'login', onLogin, onLoginSubmit, onSignupSubmit, onForgotSubmit, onModeChange, onBack }) {
  const isSignup = mode === 'signup';
  const isForgot = mode === 'forgot';

  const [nome, setNome] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [funcao, setFuncao] = useState(FUNCOES[0]);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [signupDone, setSignupDone] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg('');

    if (isForgot) {
      setSubmitting(true);
      const { error } = await onForgotSubmit(email);
      setSubmitting(false);
      if (error) {
        setErrorMsg(error);
      } else {
        setResetSent(true);
      }
      return;
    }

    if (isSignup) {
      setSubmitting(true);
      const { error } = await onSignupSubmit(email, senha, { nome, empresa, funcao });
      setSubmitting(false);
      if (error) {
        setErrorMsg(error);
      } else {
        setSignupDone(true);
      }
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

  const titulo = isForgot ? 'Recuperar senha' : isSignup ? 'Comece a usar o Vizi' : 'Entrar no Vizi';
  const subtitulo = isForgot
    ? 'Informe seu e-mail e enviamos um link pra você criar uma nova senha.'
    : isSignup
    ? 'Grátis, sem prazo. Você decide depois se quer continuar.'
    : 'Acesse seu funil de leads.';

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col items-center justify-center px-4 py-12">
      <button onClick={onBack} className="absolute top-6 left-6 flex items-center gap-2.5">
        <Logo size={30} />
        <span className="text-sm font-bold text-brand-blueDark">ViZi</span>
      </button>

      <div className="bg-white rounded-xl p-8 w-full max-w-sm border border-slate-200 shadow-sm">
        {signupDone ? (
          <>
            <h1 className="text-xl font-bold text-brand-blueDark mb-1">Confirme seu e-mail</h1>
            <p className="text-sm text-slate-500">
              Mandamos um link de confirmação pra <strong>{email}</strong>. Clique nele pra ativar sua conta e entrar.
            </p>
          </>
        ) : resetSent ? (
          <>
            <h1 className="text-xl font-bold text-brand-blueDark mb-1">Verifique seu e-mail</h1>
            <p className="text-sm text-slate-500">
              Se houver uma conta com o e-mail <strong>{email}</strong>, enviamos um link pra você definir uma nova
              senha.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-xl font-bold text-brand-blueDark mb-1">{titulo}</h1>
            <p className="text-sm text-slate-500 mb-6">{subtitulo}</p>

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

              {!isForgot && (
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
              )}

              {!isSignup && !isForgot && (
                <button
                  type="button"
                  onClick={() => onModeChange('forgot')}
                  className="text-xs text-brand-blue hover:underline text-left -mt-2"
                >
                  Esqueci minha senha
                </button>
              )}

              {errorMsg && (
                <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 bg-brand-orange hover:bg-brand-orangeDark transition-colors text-white text-sm font-semibold rounded-lg py-2.5 shadow-sm disabled:opacity-60"
              >
                {submitting
                  ? 'Enviando...'
                  : isForgot
                  ? 'Enviar link de recuperação'
                  : isSignup
                  ? 'Criar minha conta'
                  : 'Entrar'}
              </button>

              {isForgot && (
                <button
                  type="button"
                  onClick={() => onModeChange('login')}
                  className="text-xs text-slate-500 hover:text-brand-blueDark text-center"
                >
                  Voltar para entrar
                </button>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginScreen;
