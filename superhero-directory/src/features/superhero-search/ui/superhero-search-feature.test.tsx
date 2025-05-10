import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import { SuperheroSearchFeature } from './superhero-search-feature';

import { useSuperheroSearch } from '../model/use-superhero-search';

// Mock the API config to avoid import.meta.env issues
jest.mock('~shared/api/config', () => ({
  apiConfig: {
    apiHost: 'http://test-api.example.com',
    apiToken: 'test-token',
  },
}));

// Mock the hook
jest.mock('../model/use-superhero-search');

describe('SuperheroSearchFeature', () => {
  const mockHandleSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useSuperheroSearch as jest.Mock).mockReturnValue({
      searchQuery: '',
      handleSearch: mockHandleSearch,
      superheroes: [],
      isLoading: false,
      error: null,
    });
  });

  it('should render search input', () => {
    render(<SuperheroSearchFeature />);
    expect(
      screen.getByPlaceholderText('Search for superheroes...')
    ).toBeInTheDocument();
  });

  it('should show loading state', () => {
    (useSuperheroSearch as jest.Mock).mockReturnValue({
      searchQuery: '',
      handleSearch: mockHandleSearch,
      superheroes: [],
      isLoading: true,
      error: null,
    });

    render(<SuperheroSearchFeature />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should show error message', () => {
    const error = new Error('API Error');
    (useSuperheroSearch as jest.Mock).mockReturnValue({
      searchQuery: '',
      handleSearch: mockHandleSearch,
      superheroes: [],
      isLoading: false,
      error,
    });

    render(<SuperheroSearchFeature />);
    expect(screen.getByText('Error: Something went wrong')).toBeInTheDocument();
  });

  it('should show no results message when search returns empty array', () => {
    (useSuperheroSearch as jest.Mock).mockReturnValue({
      searchQuery: 'nonexistent',
      handleSearch: mockHandleSearch,
      superheroes: [],
      isLoading: false,
      error: null,
    });

    render(<SuperheroSearchFeature />);
    expect(screen.getByText('No superheroes found')).toBeInTheDocument();
  });

  it('should render superhero cards when results are available', () => {
    const mockSuperheroes = [
      { id: 1, name: 'Batman', powerstats: { intelligence: 100 } },
      { id: 2, name: 'Superman', powerstats: { intelligence: 100 } },
    ];

    (useSuperheroSearch as jest.Mock).mockReturnValue({
      searchQuery: 'bat',
      handleSearch: mockHandleSearch,
      superheroes: mockSuperheroes,
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <SuperheroSearchFeature />
      </MemoryRouter>
    );
    expect(screen.getByText('Batman')).toBeInTheDocument();
    expect(screen.getByText('Superman')).toBeInTheDocument();
  });

  it('should call handleSearch when input changes', () => {
    render(<SuperheroSearchFeature />);
    const searchInput = screen.getByPlaceholderText(
      'Search for superheroes...'
    );

    fireEvent.change(searchInput, { target: { value: 'spider' } });
    expect(mockHandleSearch).toHaveBeenCalledWith('spider');
  });
});
