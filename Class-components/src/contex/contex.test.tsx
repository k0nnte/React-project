import { describe, expect, test } from 'vitest';
import { Contex, TheProvider } from './contex';
import { useContext } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

describe('test contex', () => {
  test('ligth', () => {
    const TestComponent = () => {
      const { theme } = useContext(Contex);
      return <div>{theme ? 'light' : 'dark'}</div>;
    };
    render(
      <TheProvider>
        <TestComponent />
      </TheProvider>
    );
    expect(screen.getByText('light')).toBeInTheDocument();
  });

  test('dark', () => {
    const TestComponent = () => {
      const { theme, setTheme } = useContext(Contex);
      return (
        <>
          <div>{theme ? 'light' : 'dark'}</div>;
          <button onClick={() => setTheme(!theme)}>Toggle Theme</button>;
        </>
      );
    };
    render(
      <TheProvider>
        <TestComponent />
      </TheProvider>
    );
    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(screen.getByText('dark')).toBeInTheDocument();
  });
  test('err', () => {
    const TestComponent = () => {
      const { setTheme } = useContext(Contex);
      return <button onClick={() => setTheme(true)}>Set Theme</button>;
    };
    render(
      <TheProvider>
        <TestComponent />
      </TheProvider>
    );
    expect(screen.getByText('Set Theme')).toBeInTheDocument();
  });
});
