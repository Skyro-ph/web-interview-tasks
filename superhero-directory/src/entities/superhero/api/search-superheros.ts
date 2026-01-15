import { skipToken, useQuery } from '@tanstack/react-query';
import { superheroKeys } from './keys';
import { superheroApi } from "./superhero-api";

export type Params = {
  query: string;
};

export function useSearchSuperheros(params: Params) {
  const {query} = params;
  const normalizedQuery = query.trim().toLowerCase();

  return useQuery({
    queryKey: superheroKeys.search(normalizedQuery),
    queryFn: normalizedQuery
      ? ({ signal }) => superheroApi.search(normalizedQuery, signal)
      : skipToken,
    retry: false,
    staleTime: 1000 * 60 * 15,
  });
}