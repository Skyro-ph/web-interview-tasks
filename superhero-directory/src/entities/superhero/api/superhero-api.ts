import { ResponseSuccess } from "~shared/response";
import { Superhero } from "../superhero";
import { httpClient, HttpClient } from "~shared/api";

type SuperheroSearchResponse = {
  'results-for': string;
  results: Superhero[];
};

export class SuperheroApiService {
  constructor(private client: HttpClient) {}

  getById(id: string, signal?: AbortSignal) {
    return this.client.get<ResponseSuccess<Superhero>>(`/${id}`, signal);
  }

  search(query: string, signal?: AbortSignal) {
    return this.client.get<ResponseSuccess<SuperheroSearchResponse>>(`/search/${encodeURIComponent(query)}`, signal);
  }
}

export const superheroApi = new SuperheroApiService(httpClient);