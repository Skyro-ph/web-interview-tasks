import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useDebounce } from '~shared/hooks/use-debounce';

import { DashboardUrlParams } from '../constants';

export function useHeroSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get(DashboardUrlParams.search) || ''
  );

  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    setSearchParams((prevSearchParams) => {
      if (debouncedSearchValue.trim()) {
        prevSearchParams.set(DashboardUrlParams.search, debouncedSearchValue);
      } else {
        prevSearchParams.delete(DashboardUrlParams.search);
      }

      return prevSearchParams;
    });
  }, [debouncedSearchValue, setSearchParams]);

  return {
    searchValue,
    setSearchValue,
    debouncedSearchValue,
  };
}
