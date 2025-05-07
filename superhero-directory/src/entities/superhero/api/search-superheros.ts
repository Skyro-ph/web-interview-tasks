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

export const QUERY_STORAGE_KEY = 'query';
export const RESULTS_STORAGE_KEY = 'results';

export function useSearchSuperheros(params: Params) {
  const { query } = params;

  return useQuery({
    queryKey: superheroKeys.search(query),
    queryFn: async () => {
      const res = await fetch(
        `${config.apiHost}/api/${config.apiToken}/search/${query}`
      );
      localStorage.setItem(QUERY_STORAGE_KEY, query);

      if (!res.ok) {
        setResultsToLocalStorage([]);
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data: ResponseError | ResponseSuccess<ResponsePayload> =
        await res.json();

      if (data.response === 'error') {
        setResultsToLocalStorage([]);
        throw new Error(data.error);
      }

      setResultsToLocalStorage(data.results);

      return data.results;
    },
    initialData: () => {
      const results = localStorage.getItem(RESULTS_STORAGE_KEY);
      return results ? JSON.parse(results) : undefined;
    },
    enabled: query.length > 0,
    retry: false,
  });
}

function setResultsToLocalStorage(results: Superhero[]) {
  localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(results));
}
