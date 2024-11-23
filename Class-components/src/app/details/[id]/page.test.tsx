import { describe, Mock, test, vi } from 'vitest';
import DetailPage from './page';
import { render } from '@testing-library/react';
import { useParams } from 'next/navigation';
import { useGetAllPeopleQuery } from '../../../response/request';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useParams: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('../../../response/request', () => ({
  useGetAllPeopleQuery: vi.fn(),
}));

describe('test detail page', () => {
  test('render DetailPage', () => {
    (useParams as Mock).mockReturnValue({
      id: '0',
    });
    (useGetAllPeopleQuery as Mock).mockReturnValue({
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
            homeworld: 'https://swapi.dev/api/planets/1/',
          },
        ],
      },
      isLoading: false,
      isSuccess: true,
      isError: false,
      isFetching: false,
    });
    render(<DetailPage />);
  });
});
