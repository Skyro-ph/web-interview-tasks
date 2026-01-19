import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useDebounce } from '~shared/hooks';

export function useSearchQuery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const debouncedSearchQuery = useDebounce(query, 500);

  const setSearchQuery = useCallback(
    (value: string) => {
      setSearchParams(value ? { q: value } : {});
    },
    [setSearchParams]
  );

  return {
    searchQuery: query,
    setSearchQuery,
    debouncedSearchQuery,
  };
}
