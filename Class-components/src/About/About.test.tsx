import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, Mock, test, vi } from 'vitest';
import About from './About';
import { useParams, useRouter } from 'next/navigation';
import { useGetAllPeopleQuery } from '../response/request';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useParams: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('./About.module.scss', () => ({
  about: '.about',
  default: '',
}));

vi.mock('../light.module.scss', () => ({
  black: '.black',
  default: '',
}));

vi.mock('../response/request', () => ({
  useGetAllPeopleQuery: vi.fn(),
}));

const mockUseRouter = useRouter as ReturnType<typeof vi.fn>;

describe('test About', () => {
  test('error ', () => {
    (useParams as Mock).mockReturnValue({
      id: '0',
    });
    (useGetAllPeopleQuery as ReturnType<typeof vi.fn>).mockReturnValue({
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
      isSuccess: false,
      isError: true,
      isFetching: false,
    });

    render(<About />);

    expect(screen.getByText('Не удалось загрузить')).toBeInTheDocument();
  });
  test('secsess', async () => {
    (useParams as Mock).mockReturnValue({
      id: '0',
    });
    (useGetAllPeopleQuery as ReturnType<typeof vi.fn>).mockReturnValue({
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
    render(<About />);
    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
  });

  test('Loading', () => {
    (useParams as Mock).mockReturnValue({
      id: '0',
    });
    (useGetAllPeopleQuery as ReturnType<typeof vi.fn>).mockReturnValue({
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
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: false,
    });
    render(<About />);
    const loadingGif = screen.getByAltText('loading');
    expect(loadingGif).toBeInTheDocument();
  });

  test('click btn', () => {
    mockUseRouter.mockReturnValue({
      push: vi.fn(),
    });
    (useParams as Mock).mockReturnValue({
      id: '0',
    });
    (useGetAllPeopleQuery as ReturnType<typeof vi.fn>).mockReturnValue({
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
    render(<About />);
    const btn = screen.getByText('close');
    fireEvent.click(btn);
  });
});
