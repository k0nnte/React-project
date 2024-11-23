import { describe, expect, Mock, test, vi } from 'vitest';
// import { useRouter } from 'next/router';
import Repsonse from './Repsonse';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { useGetAllPeopleQuery } from './request';
import { useDispatch, useSelector } from 'react-redux';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import DetailPage from '../app/details/[id]/page';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(() => new URLSearchParams('search=test&page=1')),
  useRouter: vi.fn(),
  usePathname: vi.fn(),
  useParams: vi.fn(),
}));

vi.mock('./request', () => ({
  useGetAllPeopleQuery: vi.fn(),
}));

vi.mock('file-saver', () => ({
  saveAs: vi.fn(),
}));

const Ap: React.FC = () => {
  return <div>test</div>;
};

describe('test Response', () => {
  const mockData = {
    results: [
      { name: 'John' },
      { name: 'Jane' },
      { name: 'Alice' },
      { name: 'q' },
      { name: 'w' },
      { name: 'e' },
      { name: 'r' },
      { name: 't' },
      { name: 'y' },
      { name: 'u' },
      { name: 'i' },
      { name: 'o' },
      { name: 'p' },
      { name: 'a' },
      { name: 's' },
      { name: 'd' },
      { name: 'f' },
      { name: 'g' },
      { name: 'h' },
      { name: 'j' },
      { name: 'k' },
      { name: 'l' },
      { name: ';' },
      { name: 'z' },
      { name: 'x' },
    ],
    count: 20,
  };
  const mockIsLoading = false;
  const mockIsSuccess = true;
  const mockIsError = false;
  const mockIsFetching = false;
  (useGetAllPeopleQuery as Mock).mockReturnValue({
    data: mockData,
    isLoading: mockIsLoading,
    isSuccess: mockIsSuccess,
    isError: mockIsError,
    isFetching: mockIsFetching,
  });
  test('render Response', () => {
    (useRouter as Mock).mockReturnValue({
      asPath: '/?',
      push: vi.fn(),
    });
    const mockStore = { length: 1 };
    (useSelector as unknown as Mock).mockReturnValue(mockStore);
    render(<Repsonse children={<Ap />} />);
  });

  test('toggle', () => {
    (useRouter as Mock).mockReturnValue({
      asPath: '/?',
      push: vi.fn(),
    });
    const dispatch = vi.fn();
    (useDispatch as unknown as Mock).mockReturnValue(dispatch);
    const mockStore = { length: 1 };
    (useSelector as unknown as Mock).mockReturnValue(mockStore);
    render(<Repsonse children={<Ap />} />);
    const chekboxes = screen.getAllByRole('checkbox');
    const chek = chekboxes[0];
    fireEvent.click(chek);
    expect(chek).toBeChecked();
  });

  test('destroy', () => {
    (useRouter as Mock).mockReturnValue({
      push: vi.fn(),
    });
    (useParams as Mock).mockResolvedValue({
      id: '0',
    });
    const dispatch = vi.fn();
    (useDispatch as unknown as Mock).mockReturnValue(dispatch);
    const mockStore = { length: 1 };
    (useSelector as unknown as Mock).mockReturnValue(mockStore);
    render(<Repsonse children={<DetailPage />} />);
    const chekboxes = screen.getAllByRole('checkbox');
    fireEvent.click(chekboxes[0]);
    fireEvent.click(chekboxes[1]);
    const btn = screen.getByText('Unselect all');
    fireEvent.click(btn);
    expect(chekboxes[0]).not.toBeChecked();
    expect(chekboxes[1]).not.toBeChecked();
  });

  test('next page btn', () => {
    (useRouter as Mock).mockReturnValue({
      asPath: '/?',
      push: vi.fn(),
    });
    const dispatch = vi.fn();
    (useDispatch as unknown as Mock).mockReturnValue(dispatch);
    const mockStore = { length: 1 };
    (useSelector as unknown as Mock).mockReturnValue(mockStore);
    render(<Repsonse children={<Ap />} />);
    const btnnext = screen.getByText('next');
    fireEvent.click(btnnext);
  });
  test('err', () => {
    (useGetAllPeopleQuery as Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isSuccess: false,
      isError: true,
      isFetching: false,
    });
    (useRouter as Mock).mockReturnValue({
      asPath: '/?',
      push: vi.fn(),
    });
    const dispatch = vi.fn();
    (useDispatch as unknown as Mock).mockReturnValue(dispatch);
    const mockStore = { length: 1 };
    (useSelector as unknown as Mock).mockReturnValue(mockStore);
    render(<Repsonse children={<Ap />} />);
    const err = screen.getByText('Ошибка');
    expect(err).toBeInTheDocument();
  });
  test('isLoading', () => {
    (useGetAllPeopleQuery as Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });
    (useRouter as Mock).mockReturnValue({
      asPath: '/?',
      push: vi.fn(),
    });
    const dispatch = vi.fn();
    (useDispatch as unknown as Mock).mockReturnValue(dispatch);
    const mockStore = { length: 1 };
    (useSelector as unknown as Mock).mockReturnValue(mockStore);
    render(<Repsonse children={<Ap />} />);
    const img = screen.getAllByAltText('loading');
    expect(img[0]).toBeInTheDocument();
  });
  test('isFetching', () => {
    (useGetAllPeopleQuery as Mock).mockReturnValue({
      data: mockData,
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: false,
    });
    (useRouter as Mock).mockReturnValue({
      asPath: '/?',
      push: vi.fn(),
    });
    const dispatch = vi.fn();
    (useDispatch as unknown as Mock).mockReturnValue(dispatch);
    const mockStore = { length: 1 };
    (useSelector as unknown as Mock).mockReturnValue(mockStore);
    render(<Repsonse children={<Ap />} />);
    const img = screen.getAllByAltText('loading');
    expect(img[0]).toBeInTheDocument();
  });
  test('download', () => {
    (useGetAllPeopleQuery as Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isSuccess: true,
      isError: false,
      isFetching: false,
    });
    (useRouter as Mock).mockReturnValue({
      push: vi.fn(),
    });
    (useParams as Mock).mockReturnValue({
      id: '1',
    });
    const dispatch = vi.fn();
    (useDispatch as unknown as Mock).mockReturnValue(dispatch);
    const mockStore = { length: 1 };
    (useSelector as unknown as Mock).mockReturnValue(mockStore);
    render(<Repsonse children={<DetailPage />} />);
    const chekboxes = screen.getAllByRole('checkbox');
    fireEvent.click(chekboxes[0]);
    fireEvent.click(chekboxes[1]);
    const btn = screen.getByText('Download');
    fireEvent.click(btn);
  });
  test('clickrez', () => {
    (useGetAllPeopleQuery as Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isSuccess: true,
      isError: false,
      isFetching: false,
    });
    const pushM = vi.fn();
    (useRouter as Mock).mockReturnValue({
      push: pushM,
    });
    (useParams as Mock).mockReturnValue({
      id: '1',
    });
    (usePathname as Mock).mockReturnValue('/details/1');
    const dispatch = vi.fn();
    (useDispatch as unknown as Mock).mockReturnValue(dispatch);
    const mockStore = { length: 1 };
    (useSelector as unknown as Mock).mockReturnValue(mockStore);
    render(<Repsonse children={<Ap />} />);

    const clickrez = screen.getByText(/John/i);
    fireEvent.click(clickrez);
    expect(pushM).toHaveBeenCalledWith('/?search=test&page=1');
  });
  test('handlePreviousPage', () => {
    (useGetAllPeopleQuery as Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isSuccess: true,
      isError: false,
      isFetching: false,
    });
    const pushM = vi.fn();
    (useRouter as Mock).mockReturnValue({
      push: pushM,
    });
    (useParams as Mock).mockReturnValue({
      id: '0',
    });
    (useSearchParams as Mock).mockReturnValue({
      toString: vi.fn(() => 'page=2'),
    });
    const mockStore = { length: 3 };
    (useSelector as unknown as Mock).mockReturnValue(mockStore);
    render(<Repsonse children={<Ap />} />);
    const prevpage = screen.getByText('prev');
    fireEvent.click(prevpage);
    expect(pushM).toHaveBeenCalledWith('/?page=1');
  });
});
