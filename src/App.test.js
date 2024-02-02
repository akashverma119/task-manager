import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const item = screen.getByRole('link', {
    name: /task manager app/i
  });
  expect(item).toBeInTheDocument();
});
