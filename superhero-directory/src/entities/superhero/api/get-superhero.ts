import { superheroApiClient } from '~entities/superhero/api/superhero-api-client';

import { skipToken, useQuery } from '@tanstack/react-query';

import { superheroKeys } from './keys';

export type Params = {
  id?: string;
};

export function useSuperhero({ id }: Params) {
  return useQuery({
    queryKey: superheroKeys.superhero(id ?? ''),
    queryFn: id
      ? ({ signal }) => superheroApiClient.getSuperhero(id, signal)
      : skipToken,
  });
}
