import { apiFetch } from '~shared/api/api-fetch';
import { ApiResponse } from '~shared/api/response';

import { skipToken, useQuery } from '@tanstack/react-query';

import { superheroQueries } from './superhero.queries';

import { Superhero } from '../model/types';

type ResponsePayload = {
  'results-for': string;
  results: Superhero[];
};

export type Params = {
  query: string;
};

export function useSearchSuperheros(params: Params) {
  const { query } = params;

  return useQuery({
    queryKey: superheroQueries.search(query),
    queryFn:
      query && query.trim().length > 0
        ? async ({ signal }) =>
            apiFetch<ApiResponse<ResponsePayload>>(
              `/search/${encodeURIComponent(query)}`,
              { signal }
            )
        : skipToken,
  });
}
