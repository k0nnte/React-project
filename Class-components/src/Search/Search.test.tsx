import { describe, expect, test, vi } from 'vitest';
import Search from './Search';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Contex } from '../contex/contex';
import React, { ReactNode } from 'react';

const onsearch = vi.fn();

describe('search component', () => {
  test('inputchange', async () => {
    render(<Search onSearch={onsearch} />);
    const input = screen.getByPlaceholderText('введите запрос');
    expect(input).toBeInTheDocument();
    await userEvent.type(input, 'test value');
    expect(input).toHaveValue('test value');
  });

  test('togle theme', async () => {
    const mockTheme = vi.fn();

    const mockContext = {
      theme: false,
      setTheme: mockTheme,
    };
    render(
      <Contex.Provider value={mockContext}>
        <Search onSearch={onsearch} />
      </Contex.Provider>
    );
    const toggleButton = screen.getByText('togle theme');
    expect(toggleButton).toBeInTheDocument();
    await userEvent.click(toggleButton);
    expect(mockTheme).toHaveBeenCalledWith(true);
  });
  test('click btn', async () => {
    render(<Search onSearch={onsearch} />);
    const input = screen.getByPlaceholderText('введите запрос');
    await userEvent.type(input, '  test value  ');
    const searchButton = screen.getByText('Search');
    await userEvent.click(searchButton);
    expect(localStorage.getItem('text')).toBe('test value');
    expect(onsearch).toHaveBeenCalledWith('test value');
  });
  test('click error', async () => {
    class TestErrorBoundary extends React.Component<
      { children: ReactNode },
      { hasError: boolean }
    > {
      state = { hasError: false };

      static getDerivedStateFromError() {
        return { hasError: true };
      }

      render() {
        if (this.state.hasError) {
          return <div>Произошла ошибка</div>;
        }
        return this.props.children;
      }
    }

    render(
      <TestErrorBoundary>
        <Search onSearch={onsearch} />
      </TestErrorBoundary>
    );
    const errorButton = screen.getByText(/Throw ERROR/i);
    await userEvent.click(errorButton);
    expect(screen.getByText('Произошла ошибка')).toBeInTheDocument();
  });
});
