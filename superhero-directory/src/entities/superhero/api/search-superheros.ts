import { apiInstance, isApiError, apiConfig } from '~shared/api';
import { API_RETRY_COUNT } from '~shared/api/config';
import { ResponseSuccess } from '~shared/api/types';

import { useQuery } from '@tanstack/react-query';

import { superheroKeys } from './keys';

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
    queryKey: superheroKeys.search(query),
    queryFn: async (meta) => {
      const res = await apiInstance<ResponseSuccess<ResponsePayload>>(
        `${apiConfig.apiHost}/api/${apiConfig.apiToken}/search/${query}`,
        {
          signal: meta.signal,
        }
      );

      return res.results;
    },
    retry: (failureCount, error) => {
      if (isApiError(error)) {
        return false;
      }
      return failureCount < API_RETRY_COUNT;
    },
    enabled: !!query,
  });
}
