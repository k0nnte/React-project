import { describe, Mock, test, vi } from 'vitest';
import DetailPage from './[id]';
import { render } from '@testing-library/react';
import { useRouter } from 'next/router';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('test detail page', () => {
  test('render DetailPage', () => {
    (useRouter as Mock).mockReturnValue({
      pathname: '/',
    });
    render(<DetailPage />);
  });
});
