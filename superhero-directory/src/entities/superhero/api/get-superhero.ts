import { apiFetch } from '~shared/api/api-fetch';
import { ApiResponse } from '~shared/api/response';

import { skipToken, useQuery } from '@tanstack/react-query';

import { superheroQueries } from './superhero.queries';

import { Superhero } from '../model/types';

export type Params = {
  id?: string;
};

export function useSuperhero(params: Params) {
  const { id } = params;

  return useQuery({
    queryKey: superheroQueries.superhero(id ?? ''),
    queryFn: id
      ? ({ signal }) => apiFetch<ApiResponse<Superhero>>(`/${id}`, { signal })
      : skipToken,
  });
}
