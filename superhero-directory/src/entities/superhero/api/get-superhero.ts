import { apiInstance, isApiError, apiConfig } from '~shared/api';
import { API_RETRY_COUNT } from '~shared/api/config';
import { ResponseSuccess } from '~shared/api/types';

import { useQuery } from '@tanstack/react-query';

import { superheroKeys } from './keys';

import { Superhero } from '../model/types';

export type Params = {
  id?: string;
};

export function useSuperhero(params: Params) {
  const { id } = params;

  return useQuery({
    queryKey: superheroKeys.superhero(id ?? ''),
    queryFn: (meta) =>
      apiInstance<ResponseSuccess<Superhero>>(
        `${apiConfig.apiHost}/api/${apiConfig.apiToken}/${id}`,
        {
          signal: meta.signal,
        }
      ),
    retry: (failureCount, error) => {
      if (isApiError(error)) {
        return false;
      }
      return failureCount < API_RETRY_COUNT;
    },
    enabled: !!id,
  });
}
