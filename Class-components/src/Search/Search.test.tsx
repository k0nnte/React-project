import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { Contex } from '../contex/contex';
import Search from './Search';

vi.mock(import('../interfases/hooks'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLocalStorage: vi.fn(() => ['test', vi.fn(), vi.fn()]),
  };
});

describe('test Search', () => {
  const onSearch = vi.fn();

  test('render Search', () => {
    render(<Search onSearch={onSearch} />);
  });
  test('togle theme', () => {
    const setTheme = vi.fn();
    const contextValue = { theme: true, setTheme };
    render(
      <Contex.Provider value={contextValue}>
        <Search onSearch={onSearch} />
      </Contex.Provider>
    );
    fireEvent.click(screen.getByText(/togle theme/i));
    expect(setTheme).toBeCalledWith(false);
  });

  test('click btn', () => {
    render(<Search onSearch={onSearch} />);
    const input = screen.getByPlaceholderText('введите запрос');
    fireEvent.change(input, { target: { value: 'test' } });

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    expect(onSearch).toBeCalledWith('test');
  });
});
