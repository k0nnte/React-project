// @vitest-environment jsdom
import { describe, expect, Mock, test, vi } from 'vitest';
import Cart from './Cart';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { add, remove } from '../store/reduser';

const rez = {
  birth_year: '52BBY',
  created: '2014-12-10T15:52:14.024000Z',
  edited: '2014-12-20T21:17:50.317000Z',
  eye_color: 'blue',
  films: [
    'https://swapi.dev/api/films/1/',
    'https://swapi.dev/api/films/5/',
    'https://swapi.dev/api/films/6/',
  ],
  gender: 'male',
  hair_color: 'brown, grey',
  height: '178',
  homeworld: 'https://swapi.dev/api/planets/1/',
  mass: '120',
  name: 'Owen Lars',
  skin_color: 'light',
  species: [],
  starships: [],
  url: 'https://swapi.dev/api/people/6/',
  vehicles: [],
};

describe('test Cart', () => {
  vi.mock('next/router', () => ({
    useRouter: vi.fn(),
  }));

  vi.mock('react-redux', () => ({
    useDispatch: vi.fn(),
  }));

  const func = vi.fn();
  const navigator = useRouter as ReturnType<typeof vi.fn>;
  test('render', () => {
    navigator.mockReturnValue({
      asPath: '/',
    });
    render(<Cart index={0} isChecked={false} toogle={func} response={rez} />);
    expect(screen.getByText(/Owen Lars/i)).toBeInTheDocument();
  });

  test('push', () => {
    const push = vi.fn();
    navigator.mockReturnValue({
      asPath: '/?search=test&page=1',
      push,
    });
    render(<Cart index={0} isChecked={false} toogle={func} response={rez} />);
    fireEvent.click(screen.getByText(/Owen Lars/i));
    expect(push).toBeCalledWith('/details/0?search=test&page=1');
  });
  test('toggle and dispatch', () => {
    navigator.mockReturnValue({
      asPath: '/',
      push: vi.fn(),
    });
    const dispatch = vi.fn();
    (useDispatch as unknown as Mock).mockReturnValue(dispatch);
    render(<Cart index={0} isChecked={false} toogle={func} response={rez} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(func).toHaveBeenCalledWith(0);
    expect(dispatch).toHaveBeenCalledWith(add(rez));
  });

  test('dispatch remove', () => {
    navigator.mockReturnValue({
      asPath: '/',
      push: vi.fn(),
    });
    const dispatch = vi.fn();
    (useDispatch as unknown as Mock).mockReturnValue(dispatch);
    render(<Cart index={0} isChecked={true} toogle={func} response={rez} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(func).toHaveBeenCalledWith(0);
    expect(dispatch).toHaveBeenCalledWith(remove(rez));
  });
});
