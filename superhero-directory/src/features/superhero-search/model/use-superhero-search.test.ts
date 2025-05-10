import { useSearchParams } from 'react-router-dom';

import { superheroApi } from '~entities/superhero';

import '@testing-library/jest-dom';
import { renderHook, act } from '@testing-library/react';

import { useSuperheroSearch } from './use-superhero-search';

// Mock util.promisify
jest.mock('util', () => ({
  promisify: (fn: (...args: unknown[]) => unknown) => fn,
}));

// Mock the dependencies
jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}));

jest.mock('~entities/superhero', () => ({
  superheroApi: {
    useSearchSuperheros: jest.fn(),
  },
}));

describe('useSuperheroSearch', () => {
  const mockSetSearchParams = jest.fn();
  const mockSearchParams = new URLSearchParams();

  beforeEach(() => {
    jest.clearAllMocks();
    (useSearchParams as jest.Mock).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);
    (superheroApi.useSearchSuperheros as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });
  });

  describe('debounce', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should debounce API calls', () => {
      const { result } = renderHook(() =>
        useSuperheroSearch({ debounceMs: 500 })
      );

      act(() => {
        result.current.handleSearch('bat');
        result.current.handleSearch('batm');
        result.current.handleSearch('batma');
        result.current.handleSearch('batman');
      });

      // Fast-forward half of the debounce time
      act(() => {
        jest.advanceTimersByTime(250);
      });

      // There should be no call with query 'batman' yet
      const callsMid = (superheroApi.useSearchSuperheros as jest.Mock).mock
        .calls;
      expect(callsMid.some(([arg]) => arg.query === 'batman')).toBe(false);

      // Fast-forward the remaining debounce time
      act(() => {
        jest.advanceTimersByTime(250);
      });

      // Now there should be a call with the final query
      const callsEnd = (superheroApi.useSearchSuperheros as jest.Mock).mock
        .calls;
      expect(callsEnd.some(([arg]) => arg.query === 'batman')).toBe(true);
    });

    it('should cancel previous debounced calls', () => {
      const { result } = renderHook(() =>
        useSuperheroSearch({ debounceMs: 500 })
      );

      // First search
      act(() => {
        result.current.handleSearch('spider');
      });

      // Fast-forward half of the debounce time
      act(() => {
        jest.advanceTimersByTime(250);
      });

      // New search before the first debounce completes
      act(() => {
        result.current.handleSearch('batman');
      });

      // Fast-forward the remaining debounce time
      act(() => {
        jest.advanceTimersByTime(500);
      });

      // There should be no call with query 'spider'
      const calls = (superheroApi.useSearchSuperheros as jest.Mock).mock.calls;
      expect(calls.some(([arg]) => arg.query === 'spider')).toBe(false);

      // The last call should be with { query: 'batman' }
      expect(calls[calls.length - 1][0]).toEqual({ query: 'batman' });
    });
  });

  it('should initialize with empty search query when no URL params', () => {
    const { result } = renderHook(() => useSuperheroSearch({}));
    expect(result.current.searchQuery).toBe('');
  });

  it('should initialize with search query from URL params', () => {
    mockSearchParams.set('q', 'batman');
    const { result } = renderHook(() => useSuperheroSearch({}));
    expect(result.current.searchQuery).toBe('batman');
  });

  it('should update search query and URL params when searching', () => {
    const { result } = renderHook(() => useSuperheroSearch({}));

    act(() => {
      result.current.handleSearch('spiderman');
    });

    expect(result.current.searchQuery).toBe('spiderman');
    expect(mockSetSearchParams).toHaveBeenCalledWith({ q: 'spiderman' });
  });

  it('should clear URL params when search query is empty', () => {
    const { result } = renderHook(() => useSuperheroSearch({}));

    act(() => {
      result.current.handleSearch('');
    });

    expect(result.current.searchQuery).toBe('');
    expect(mockSetSearchParams).toHaveBeenCalledWith({});
  });

  it('should return loading state from API', () => {
    (superheroApi.useSearchSuperheros as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
    });

    const { result } = renderHook(() => useSuperheroSearch({}));
    expect(result.current.isLoading).toBe(true);
  });

  it('should return error state from API', () => {
    const mockError = new Error('API Error');
    (superheroApi.useSearchSuperheros as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: mockError,
    });

    const { result } = renderHook(() => useSuperheroSearch({}));
    expect(result.current.error).toBe(mockError);
  });

  it('should return superheroes data from API', () => {
    const mockSuperheroes = [{ id: 1, name: 'Batman' }];
    (superheroApi.useSearchSuperheros as jest.Mock).mockReturnValue({
      data: mockSuperheroes,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useSuperheroSearch({}));
    expect(result.current.superheroes).toEqual(mockSuperheroes);
  });
});
