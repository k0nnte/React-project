import { describe, expect, Mock, test, vi } from 'vitest';
import Response from './Repsonse';

import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import request from './request';
import userEvent from '@testing-library/user-event';

vi.mock('./request');

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: () => ({ page: '2' }),
}));

describe('test response', () => {
  const mockData = {
    count: 100,
    next: null,
    previous: null,
    results: [{ id: 1, name: 'Item 1', height: '20' }],
  };
  const mockDataZero = {
    count: 100,
    next: null,
    previous: null,
    results: [],
  };
  test('fetchData', async () => {
    (request as Mock).mockResolvedValueOnce(mockData);
    await act(async () => {
      render(<Response search="Luke" />);
    });
    expect(screen.getByText(/Item 1/)).toBeInTheDocument();
  });

  test('fetchData Error', async () => {
    const mockError = new Error('not found');
    (request as Mock).mockRejectedValueOnce(mockError);
    await act(async () => {
      render(<Response search="test" />);
    });
    expect(screen.getByText(/NOT FOUND/)).toBeInTheDocument();
  });

  test('nextpage', async () => {
    (request as Mock).mockResolvedValueOnce(mockData);
    await act(async () => {
      render(<Response search="test" />);
    });
    const btnnext = screen.getByText(/next/);
    expect(btnnext).toBeInTheDocument();
    await userEvent.click(btnnext);
    expect(mockNavigate).toHaveBeenCalledWith('/page/3');
  });
  test('prevpage', async () => {
    (request as Mock).mockResolvedValueOnce(mockData);
    await act(async () => {
      render(<Response search="test" />);
    });
    const prevBtn = screen.getByText(/prev/);
    expect(prevBtn).toBeInTheDocument();
    await userEvent.click(prevBtn);
    expect(mockNavigate).toHaveBeenCalledWith('/page/1');
  });

  test('rez.length == 0', async () => {
    (request as Mock).mockResolvedValueOnce(mockDataZero);
    await act(async () => {
      render(<Response search="test" />);
    });
    expect(screen.getByText(/Not Found/)).toBeInTheDocument();
  });
});
