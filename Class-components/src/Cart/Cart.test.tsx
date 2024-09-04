import '@testing-library/jest-dom';
import Cart from './Cart';
import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Iresponse } from '../interfases/interfases';
import userEvent from '@testing-library/user-event';
import { add, remove } from '../store/reduser';
const mockNavigate = vi.fn();
const mockLocation = vi.fn();
const mockDispatch = vi.fn();
const mockToogle = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation,
}));

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

describe('test Cart', () => {
  const mockResponse: Iresponse = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    created: '',
    edited: '',
    films: [],
    homeworld: '',
    species: [],
    starships: [],
    url: '',
    vehicles: [],
  };
  test('test click navigate', async () => {
    render(
      <Cart
        response={mockResponse}
        index={1}
        isChecked={false}
        toogle={() => {}}
      />
    );
    const Luke = screen.getByText(/Luke/i);
    await userEvent.click(Luke);
    expect(mockNavigate).toHaveBeenCalledWith('/details/1?');
  });
  test('add dispatch', async () => {
    render(
      <Cart
        response={mockResponse}
        index={1}
        isChecked={false}
        toogle={mockToogle}
      />
    );
    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    expect(mockToogle).toHaveBeenCalledWith(1);
    expect(mockDispatch).toHaveBeenCalledWith(add(mockResponse));
  });
  test('remove dispatch', async () => {
    render(
      <Cart
        response={mockResponse}
        index={1}
        isChecked={true}
        toogle={mockToogle}
      />
    );
    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    expect(mockToogle).toHaveBeenCalledWith(1);
    expect(mockDispatch).toHaveBeenCalledWith(remove(mockResponse));
  });
});
