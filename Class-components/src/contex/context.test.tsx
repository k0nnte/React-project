import React, { useContext } from 'react';
import { Contex, TheProvider } from './contex';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

const TestComponent: React.FC = () => {
  const { theme, setTheme } = useContext(Contex);

  return (
    <div>
      <p data-testid="theme-value">{theme ? 'Light' : 'Dark'}</p>
      <button onClick={() => setTheme(!theme)}>Toggle Theme</button>
    </div>
  );
};

describe('test, context', () => {
  test('should provide the default theme value', () => {
    render(
      <TheProvider>
        <TestComponent />
      </TheProvider>
    );
    const themeValue = screen.getByTestId('theme-value');
    expect(themeValue).toHaveTextContent('Light');
  });
  test('should toggle the theme value', async () => {
    render(
      <TheProvider>
        <TestComponent />
      </TheProvider>
    );

    const themeValue = screen.getByTestId('theme-value');
    expect(themeValue).toHaveTextContent('Light');

    const btn = screen.getByText('Toggle Theme');
    await userEvent.click(btn);
    expect(themeValue).toHaveTextContent('Dark');
  });
});
