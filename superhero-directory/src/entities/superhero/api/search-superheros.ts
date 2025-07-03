import { config } from '~shared/config';
import { ResponseError, ResponseSuccess } from '~shared/response';

import { skipToken, useQuery, UseQueryResult } from '@tanstack/react-query';

import { superheroKeys } from './keys';

import { Superhero } from '../superhero';

type ResponsePayload = 
  | {
      response: "success";
      'results-for': string;
      results: Superhero[];
    }
  | {
      response: "error";
      error: string;
    };


export type Params = {
  query: string;
};

export function useSearchSuperheros(params: Params): UseQueryResult<ResponsePayload> {
  const { query } = params;

  
  return useQuery({
    queryKey: superheroKeys.superhero(query),
    queryFn: query
      ? async () => {
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

              throw new Error(
                `Error ${res.status}: ${res.statusText} - ${error.error}`
              );
            }

            return res.json();
          });
          return response;
      }
      : skipToken,
  });
}
