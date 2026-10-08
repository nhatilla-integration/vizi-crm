// Supabase Auth devolve mensagens de erro em inglês. Traduz as mais comuns
// pra português; o que não reconhece, devolve como veio (melhor que nada).
const TRADUCOES = [
  [/invalid login credentials/i, 'E-mail ou senha incorretos.'],
  [/email not confirmed/i, 'Confirme seu e-mail antes de entrar — verifique sua caixa de entrada.'],
  [/user already registered/i, 'Esse e-mail já está cadastrado. Tente entrar ou recuperar sua senha.'],
  [/password should be at least/i, 'A senha precisa ter pelo menos 6 caracteres.'],
  [/unable to validate email address/i, 'E-mail inválido.'],
  [/new password should be different/i, 'A nova senha precisa ser diferente da atual.'],
  [/for security purposes.*after (\d+) seconds?/i, (m) => `Por segurança, espere ${m[1]} segundos antes de tentar de novo.`],
  [/email rate limit exceeded/i, 'Muitas tentativas com esse e-mail. Espere um pouco antes de tentar de novo.'],
  [/network/i, 'Falha de conexão. Verifique sua internet e tente de novo.'],
];

export function traduzirErroAuth(mensagem) {
  if (!mensagem) return 'Não foi possível completar a ação. Tente novamente.';

  for (const [padrao, traducao] of TRADUCOES) {
    const match = mensagem.match(padrao);
    if (match) {
      return typeof traducao === 'function' ? traducao(match) : traducao;
    }
  }

  return mensagem;
}
