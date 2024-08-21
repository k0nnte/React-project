import Cart from './Cart';
import '@testing-library/jest-dom';
import { Iresponse } from '../interfases/interfases';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('testing Cart', () => {
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

  test('render text', () => {
    render(<Cart response={mockResponse} index={1} />);
    expect(screen.getByText(/name: Luke Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/height: 172/i)).toBeInTheDocument();
    expect(screen.getByText(/mass: 77/i)).toBeInTheDocument();
    expect(screen.getByText(/hair_color: blond/i)).toBeInTheDocument();
    expect(screen.getByText(/skin_color: fair/i)).toBeInTheDocument();
    expect(screen.getByText(/eye_color: blue/i)).toBeInTheDocument();
    expect(screen.getByText(/birth_year: 19BBY/i)).toBeInTheDocument();
    expect(screen.getByText(/gender: male/i)).toBeInTheDocument();
  });
  test('called console log', async () => {
    render(<Cart response={mockResponse} index={1} />);
    const consoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});
    await userEvent.click(screen.getByText(/name: Luke Skywalker/i));
    expect(consoleLog).toHaveBeenCalledWith(1);
    consoleLog.mockRestore();
  });
});
