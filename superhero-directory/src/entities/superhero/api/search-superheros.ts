import { superheroApiClient } from '~entities/superhero/api/superhero-api-client';

import { useQuery } from '@tanstack/react-query';

import { superheroKeys } from './keys';

export type Params = {
  query: string;
};

export function useSearchSuperheros({ query }: Params) {
  return useQuery({
    queryKey: superheroKeys.search(query),
    queryFn: ({ signal }) =>
      superheroApiClient.searchSuperheroes(query, signal),
    enabled: !!query.trim(),
  });
}
