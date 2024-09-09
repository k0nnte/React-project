import { afterEach, describe, test, vi } from 'vitest';
import Response from './Repsonse';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetAllPeopleQuery } from './request';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

vi.mock('../response/request', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useGetAllPeopleQuery: vi.fn(),
  };
});

describe('test repsonse', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  test('test', () => {
    vi.mocked(useSelector).mockReturnValue({
      length: 1, // Убедитесь, что длина корректна для теста
    });
    vi.mocked(useGetAllPeopleQuery).mockReturnValue({
      data: {
        results: [
          {
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            hair_color: 'blond',
            skin_color: 'fair',
            eye_color: 'blue',
            birth_year: '19BBY',
            gender: 'male',
          },
        ],
      },
      isLoading: false,
      isSuccess: true,
      isError: false,
      isFetching: false,
      refetch: vi.fn(),
    });
    render(
      <MemoryRouter>
        <Response search="test" />
      </MemoryRouter>
    );
    screen.debug();
  });
});
