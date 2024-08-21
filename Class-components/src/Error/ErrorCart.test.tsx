import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorCart from './ErrorCart';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('ErrorCart component', () => {
  beforeEach(() => {
    render(<ErrorCart />);
  });

  test('render errorcart', () => {
    const Element = screen.getByText('404 PAGE NOT FAUND');
    expect(Element).toBeInTheDocument();
  });

  test('click btn', async () => {
    const btn = screen.getByText('Main');
    await userEvent.click(btn);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
