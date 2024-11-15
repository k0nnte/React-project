import { afterEach, describe, expect, test, vi } from 'vitest';
import About from './About';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { useGetAllPeopleQuery } from '../response/request';
import userEvent from '@testing-library/user-event';
vi.mock('../response/request', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useGetAllPeopleQuery: vi.fn(),
  };
});
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useParams: () => ({ id: '0' }),
    useLocation: () => ({ search: '' }),
    useNavigate: () => mockNavigate,
  };
});
describe('testing about', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  test('return error', () => {
    vi.mocked(useGetAllPeopleQuery).mockReturnValue({
      data: null,
      isLoading: false,
      isSuccess: false,
      isError: true,
      isFetching: false,
      refetch: vi.fn(),
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <About />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Не удалось загрузить/i)).toBeInTheDocument();
  });
  test('Loading', () => {
    vi.mocked(useGetAllPeopleQuery).mockReturnValue({
      data: null,
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: false,
      refetch: vi.fn(),
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <About />
        </MemoryRouter>
      </Provider>
    );
    const img = screen.getByAltText(/loading/i);
    expect(img).toBeInTheDocument();
  });
  test('return', async () => {
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
      <Provider store={store}>
        <MemoryRouter>
          <About />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/name: Luke Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/height: 172/i)).toBeInTheDocument();
    expect(screen.getByText(/mass: 77/i)).toBeInTheDocument();
    expect(screen.getByText(/hair_color: blond/i)).toBeInTheDocument();
    expect(screen.getByText(/skin_color: fair/i)).toBeInTheDocument();
    expect(screen.getByText(/eye_color: blue/i)).toBeInTheDocument();
    expect(screen.getByText(/birth_year: 19BBY/i)).toBeInTheDocument();
    expect(screen.getByText(/gender: male/i)).toBeInTheDocument();
    const closeButton = screen.getByText(/close/i);
    await userEvent.click(closeButton);
    expect(mockNavigate).toHaveBeenCalledWith('/?');
  });
});
