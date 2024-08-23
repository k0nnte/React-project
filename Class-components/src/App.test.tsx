import { describe, expect, test, vi } from 'vitest';
import App from './App';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('test app', () => {
  test('click btn Search', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const btn = screen.getByText(/Search/);
    expect(btn).toBeInTheDocument();
    await userEvent.click(btn);
    expect(mockNavigate).toBeCalledWith('/');
  });
});
