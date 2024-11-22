import { describe, expect, Mock, test, vi } from 'vitest';
import Loyaut from './loyaut';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useGetAllPeopleQuery } from '../response/request';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const Ap: React.FC = () => {
  return <div>test</div>;
};

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));
vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(() => new URLSearchParams('search=test&page=1')),
}));
vi.mock('../response/request', () => ({
  useGetAllPeopleQuery: vi.fn(),
}));

describe('test loyaut', () => {
  test('render loyaut', () => {
    const mockData = {
      results: [{ name: 'John' }, { name: 'Jane' }, { name: 'Alice' }],
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
    const mockStore = { length: 1 };
    (useSelector as unknown as Mock).mockReturnValue(mockStore);
    const mockpush = vi.fn();

    (useRouter as Mock).mockReturnValue({
      asPath: '/?',
      push: mockpush,
    });
    render(
      <Loyaut>
        <Ap />
      </Loyaut>
    );
    const input = screen.getByPlaceholderText('введите запрос');
    fireEvent.change(input, { target: { value: 'test' } });
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    expect(mockpush).toHaveBeenCalledWith('/?search=test');
  });
});
