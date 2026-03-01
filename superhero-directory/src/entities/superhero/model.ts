import { useQuery, skipToken } from '@tanstack/react-query';

import { SuperheroAPI } from './api';
import { SUPERHERO_QUERY_KEYS } from './config';

export function useSuperheroByIdQuery(id: string | undefined) {
  return useQuery({
    queryKey: SUPERHERO_QUERY_KEYS.superheroById(id),
    queryFn: id
      ? () =>
        SuperheroAPI.getSuperheroById(id).catch((cause) => {
          throw new Error('ERROR_GET_SUPERHERO_BY_ID', { cause });
        })
      : skipToken,
    staleTime: Infinity,
  });
}

export function useSuperheroSearchByNameQuery(name: string | undefined) {
  return useQuery({
    queryKey: SUPERHERO_QUERY_KEYS.searchByName(name),
    queryFn: name
      ? () =>
        SuperheroAPI.searchSuperheroByName(name).catch((cause) => {
          throw new Error('ERROR_SEARCH_SUPERHERO_BY_NAME', { cause });
        })
      : skipToken,
  });
}
