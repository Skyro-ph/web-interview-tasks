import { config } from '~shared/config';
import { ResponseError, ResponseSuccess } from '~shared/model/response';

import { skipToken, useQuery } from '@tanstack/react-query';

import { superheroKeys } from './keys';

import { Superhero } from '../model/superhero';

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
    queryFn: !query
      ? skipToken
      : async () => {
          const response: ResponseSuccess<ResponsePayload> = await fetch(
            `${config.apiHost}/api/${config.apiToken}/search/${query}`,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          ).then(async (res) => {
            if (!res.ok) {
              const error: ResponseError = await res.json();

              throw new Error(error.error);
            }

            const result = await res.json();
            if (result.response === 'error') {
              const error: ResponseError = result;

              throw new Error(error.error);
            }

            return result;
          });

          return response;
        },
    retry: (failureCount, error) => {
      const isNotFoundError = error.message.includes('not found');
      if (isNotFoundError) {
        return false;
      }

      return failureCount < 3;
    },
    staleTime: 5 * 60 * 1000,
  });
}
