import { skipToken, useQuery } from '@tanstack/react-query';

import { superheroKeys } from './keys';
import { superheroQueries } from './superhero.queries';

export type Params = {
  query: string;
};

export function useSearchSuperheros(params: Params) {
  const { query } = params;

  const formattedQuery = query.trim().toLowerCase();

  // Method documentation: https://superheroapi.com/#name
  // Example call: GET https://superheroapi.com/api/${access-token}/search/${superhero-name}
  return useQuery({
    queryKey: superheroKeys.search(formattedQuery),
    queryFn: query ? () => superheroQueries.search(formattedQuery) : skipToken,
    retry: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
  });
}
