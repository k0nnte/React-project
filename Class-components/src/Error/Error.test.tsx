import { describe, expect, test } from 'vitest';
import ErrorBoundary from './Error';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('test ErrorBoundary', () => {
  test('click reset button', async () => {
    const ErrorComp = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ErrorComp />
      </ErrorBoundary>
    );

    const resetButton = screen.getByText('Reset');

    await userEvent.click(resetButton);
    render(
      <ErrorBoundary>
        <div>New Content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('New Content')).toBeInTheDocument();
  });
});
