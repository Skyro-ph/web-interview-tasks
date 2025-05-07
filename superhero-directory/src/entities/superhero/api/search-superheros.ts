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
        const error: ResponseError = await res.json();
        throw new Error(
          `Error ${res.status}: ${res.statusText} - ${error.error}`
        );
      }

      const data: ResponseSuccess<ResponsePayload> = await res.json();
      return data.results;
    },
    enabled: query.length > 0,
  });
}
