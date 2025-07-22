import { config } from '~shared/config';

import { useQuery } from '@tanstack/react-query';

import { superheroKeys } from './keys';

import { Superhero } from '../types';

type ResponsePayload = {
  'results-for': string;
  results: Superhero[];
};

export type Params = {
  query: string;
};

export function useSearchSuperheros({ query }: Params) {
  // Method documentation: https://superheroapi.com/#name
  // Example call: GET https://superheroapi.com/api/${access-token}/search/${superhero-name}
  return useQuery<ResponsePayload, Error>({
    retry: false,
    queryKey: superheroKeys.search(query),
    enabled: query.length > 0,
    queryFn: async () => {
      try {
        const response = await fetch(
          `${config.apiHost}/api/${config.apiToken}/search/${query}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const data = await response.json();

        if (data.response === 'error') {
          throw new Error(data.error || 'Error');
        }

        return data;
      } catch (e: unknown) {
        if (e instanceof Error) {
          throw e;
        }
        throw new Error(String(e));
      }
    },
  });
}
