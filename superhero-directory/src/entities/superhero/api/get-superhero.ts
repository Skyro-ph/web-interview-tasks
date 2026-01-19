import { skipToken, useQuery } from '@tanstack/react-query';

import { superheroKeys } from './keys';
import { superheroQueries } from './superhero.queries';

export type Params = {
  id?: string;
};

export function useSuperhero(params: Params) {
  const { id } = params;

  return useQuery({
    queryKey: superheroKeys.superhero(id ?? ''),
    queryFn: id ? () => superheroQueries.getById(id) : skipToken,
  });
}
