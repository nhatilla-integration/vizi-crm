import { render, screen } from '@testing-library/react';
import App from './App';

test('renders o titulo ViZi', () => {
  render(<App />);
  const titleElement = screen.getByRole('heading', { name: 'ViZi' });
  expect(titleElement).toBeInTheDocument();
});

test('renders o botao de novo lead', () => {
  render(<App />);
  const buttonElement = screen.getByText(/\+ Novo lead/i);
  expect(buttonElement).toBeInTheDocument();
});
