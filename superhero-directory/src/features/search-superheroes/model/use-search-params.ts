import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from "~shared/hooks";

export const useSuperheroSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryFromUrl = searchParams.get('name') || '';

  const [searchInput, setSearchInput] = useState(queryFromUrl);

  const debouncedQuery = useDebounce(searchInput, 500);

  useEffect(() => {
    setSearchInput(queryFromUrl);
  }, [searchParams]);

  useEffect(() => {
    const trimmed = debouncedQuery.trim();

    if (trimmed !== queryFromUrl) {
      setSearchParams((prevSearchParams) => {
        if (trimmed) {
          prevSearchParams.set('name', trimmed);
        } else {
          prevSearchParams.delete('name');
        }
        return prevSearchParams;
      })
    }
  }, [debouncedQuery]);

  return {
    searchInput,
    setSearchInput,
    debouncedQuery: queryFromUrl,
  };
};
