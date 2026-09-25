import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MetricsAssistant from './MetricsAssistant';

const leads = [
  { etapa: 'novo', origem: 'Instagram', valor: 100 },
  { etapa: 'fechado', origem: 'Indicação', valor: 200 },
];

describe('MetricsAssistant', () => {
  afterEach(() => {
    delete global.fetch;
  });

  test('mostra a resposta do assistente quando a chamada funciona', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ answer: 'A maioria dos leads vem do Instagram.' }),
    });

    render(<MetricsAssistant leads={leads} />);

    userEvent.type(screen.getByPlaceholderText(/por que/i), 'de onde vêm meus leads?');
    userEvent.click(screen.getByRole('button', { name: /perguntar/i }));

    expect(await screen.findByText(/a maioria dos leads vem do instagram/i)).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/metrics-assistant',
      expect.objectContaining({ method: 'POST' })
    );
  });

  test('mostra erro quando o assistente responde com falha', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Não consegui responder agora.' }),
    });

    render(<MetricsAssistant leads={leads} />);

    userEvent.type(screen.getByPlaceholderText(/por que/i), 'de onde vêm meus leads?');
    userEvent.click(screen.getByRole('button', { name: /perguntar/i }));

    expect(await screen.findByText(/não consegui responder agora/i)).toBeInTheDocument();
  });
});
