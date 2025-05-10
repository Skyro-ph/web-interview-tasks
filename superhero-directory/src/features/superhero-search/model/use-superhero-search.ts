import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { superheroApi } from '~entities/superhero';

import { useDebounceCallback } from '~shared/lib/hooks';

const SEARCH_QUERY_PARAM = 'q';

export const useSuperheroSearch = ({
  debounceMs = 500,
}: {
  debounceMs?: number;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get(SEARCH_QUERY_PARAM) ?? ''
  );
  const [debouncedQuery, setDebouncedQuery] = useState(
    searchParams.get(SEARCH_QUERY_PARAM) ?? ''
  );

  const {
    data: superheroes,
    isLoading,
    error,
  } = superheroApi.useSearchSuperheros({ query: debouncedQuery });

  const debouncedSetSearchQuery = useDebounceCallback(
    setDebouncedQuery,
    debounceMs
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    debouncedSetSearchQuery(query);

    if (query) {
      setSearchParams({ [SEARCH_QUERY_PARAM]: query });
    } else {
      setSearchParams({});
    }
  };

  // Sync URL with search query on mount
  useEffect(() => {
    const queryFromUrl = searchParams.get(SEARCH_QUERY_PARAM);
    if (queryFromUrl && queryFromUrl !== searchQuery) {
      setSearchQuery(queryFromUrl);
      setDebouncedQuery(queryFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    searchQuery,
    handleSearch,
    superheroes,
    isLoading,
    error,
  };
};
