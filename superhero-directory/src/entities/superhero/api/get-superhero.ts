import { config } from '~shared/config';
import { ResponseError, ResponseSuccess } from '~shared/model/response';

import { skipToken, useQuery } from '@tanstack/react-query';

import { superheroKeys } from './keys';

import { Superhero } from '../model/superhero';

export type Params = {
  id?: string;
};

export function useSuperhero(params: Params) {
  const { id } = params;

  return useQuery({
    queryKey: superheroKeys.superhero(id ?? 'none'),
    queryFn: id
      ? async () => {
          const response: ResponseSuccess<Superhero> = await fetch(
            `${config.apiHost}/api/${config.apiToken}/${id}`,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          ).then(async (res) => {
            if (!res.ok) {
              const error: ResponseError = await res.json();

              throw new Error(
                `Error ${res.status}: ${res.statusText} - ${error.error}`
              );
            }

            const result = await res.json();
            if (result.response === 'error') {
              const error: ResponseError = result;

              throw new Error(error.error);
            }

            return result;
          });

          return response;
        }
      : skipToken,
    retry: (failureCount) => {
      return failureCount < 1;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  });
}
