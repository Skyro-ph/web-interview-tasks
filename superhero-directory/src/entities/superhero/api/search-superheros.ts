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
      const response: ResponseSuccess<ResponsePayload> = await fetch(
        `${config.apiHost}/superhero/name/${query}`
      )
        .then(async (res) => {
          if (!res.ok) {
            const error: ResponseError = await res.json();

            throw new Error(
              `Error ${res.status}: ${res.statusText} - ${error.error}`
            );
          }

          return res.json();
        })
        .then((res) => res.results);

      return response;
    },
  });
}
