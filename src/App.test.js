import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('landing page mostra a proposta do produto e o CTA principal', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /mensagem esquecida no whatsapp/i })).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: /experimente grátis/i }).length).toBeGreaterThan(0);
});

test('login real mostra erro quando o Supabase não está configurado', async () => {
  render(<App />);

  userEvent.click(screen.getAllByRole('button', { name: 'Entrar' })[0]);
  expect(await screen.findByRole('heading', { name: /entrar no vizi/i })).toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: 'Entrar' }));

  expect(await screen.findByText(/supabase não está configurado/i)).toBeInTheDocument();
});

test('"Ver o funil em ação" pula direto pro app, sem passar por login', async () => {
  render(<App />);

  userEvent.click(screen.getByRole('button', { name: /ver o funil em ação/i }));

  expect(await screen.findByRole('heading', { name: 'ViZi' })).toBeInTheDocument();
  expect(screen.getByText(/\+ Novo lead/i)).toBeInTheDocument();
});

test('"Experimente grátis" mostra o formulário de cadastro completo', async () => {
  render(<App />);

  userEvent.click(screen.getAllByRole('button', { name: /experimente grátis/i })[0]);

  expect(await screen.findByRole('heading', { name: /comece a usar o vizi/i })).toBeInTheDocument();
  expect(screen.getByText(/nome completo/i)).toBeInTheDocument();
  expect(screen.getByText(/nome da empresa/i)).toBeInTheDocument();
});
