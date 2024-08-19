import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import Search from './Search';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from '../Error/Error';

describe('search test', () => {
  let mockOnSearch: ReturnType<typeof vi.fn>;
  beforeEach(() => {
    mockOnSearch = vi.fn();
    render(
      <ErrorBoundary>
        <Search onSearch={mockOnSearch} />
      </ErrorBoundary>
    );
  });

  test('test enter text in placeholder', async () => {
    const inputElement = screen.getByPlaceholderText(/введите запрос/i);
    expect(inputElement).toHaveValue('');
    await userEvent.type(inputElement, 'Test Input');
    expect(inputElement).toHaveValue('Test Input');
  });

  test('enter localstorage', async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    const inputElement = screen.getByPlaceholderText(/введите запрос/i);
    const searchButton = screen.getByText(/Search/i);

    await userEvent.type(inputElement, 'Test Input');

    await userEvent.click(searchButton);

    expect(setItemSpy).toHaveBeenCalledWith('text', 'Test Input');
    expect(mockOnSearch).toHaveBeenCalledWith('Test Input');
    setItemSpy.mockRestore();
  });

  test('error btn', async () => {
    const errorButton = screen.getByText(/Throw ERROR/i);
    await userEvent.click(errorButton);
    const errorIndicator = screen.queryByText(/Click error/i);
    expect(errorIndicator).not.toBeInTheDocument();
  });
});
