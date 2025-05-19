import { useState } from 'react';
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
    const formattedQuery = query.trim();
    setSearchQuery(formattedQuery);
    debouncedSetSearchQuery(formattedQuery);

    if (formattedQuery) {
      setSearchParams({ [SEARCH_QUERY_PARAM]: formattedQuery });
    } else {
      setSearchParams({});
    }
  };

  return {
    searchQuery,
    handleSearch,
    superheroes,
    isLoading,
    error,
  };
};
