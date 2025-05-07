import { config } from '~shared/config';
import { ResponseError, ResponseSuccess } from '~shared/response';

import { useQuery } from '@tanstack/react-query';

import { superheroKeys } from './keys';

import { Superhero } from '../superhero';

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
    queryFn: async () => {
      const res = await fetch(
        `/api-proxy/api/${config.apiToken}/search/${query}`
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data: ResponseError | ResponseSuccess<ResponsePayload> =
        await res.json();

      if (data.response === 'error') {
        throw new Error(data.error);
      }

      return data.results;
    },
    enabled: query.length > 0,
    retry: false,
  });
}
