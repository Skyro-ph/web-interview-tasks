import { httpClient } from '~shared/api';
import { ResponseSuccess } from '~shared/response';

import { Superhero } from '../superhero';

type SearchResponsePayload = {
  'results-for': string;
  results: Superhero[];
};

export const superheroQueries = {
  getById(id: string) {
    return httpClient.get<ResponseSuccess<Superhero>>(`/${id}`);
  },
  search(query: string) {
    return httpClient.get<ResponseSuccess<SearchResponsePayload>>(
      `/search/${encodeURIComponent(query)}`
    );
  },
};
