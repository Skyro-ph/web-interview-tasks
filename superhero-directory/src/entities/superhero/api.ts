import type { AxiosResponse } from 'axios';

import { api } from '~shared/api';
import { env } from '~shared/config';

import { Superhero } from './types';

export type ApiResponse<T> =
  | ({ response: 'success' } & T)
  | { response: 'error'; error: string };

export interface SearchSuperheroResponse {
  results: Superhero[];
  'results-for': string;
}

function handleApiResponse<T>(res: AxiosResponse<ApiResponse<T>>): T {
  if (res.data.response === 'error') {
    throw new Error(res.data.error);
  }
  return res.data as T;
}

export const SuperheroAPI = {
  getSuperheroById(id: string): Promise<Superhero> {
    return api
      .get<ApiResponse<Superhero>>(`/api/${env.API_TOKEN}/${id}`)
      .then(handleApiResponse);
  },
  searchSuperheroByName(name: string): Promise<SearchSuperheroResponse> {
    return api
      .get<
        ApiResponse<SearchSuperheroResponse>
      >(`/api/${env.API_TOKEN}/search/${name}`)
      .then((res) => {
        if (res.data.response === 'error') {
          return {
            results: [],
            'results-for': name,
          };
        }

        return res.data;
      });
  },
};
