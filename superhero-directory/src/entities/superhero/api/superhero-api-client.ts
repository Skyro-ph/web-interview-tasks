import { Superhero } from '~entities/superhero/superhero';

import { config } from '~shared/config';
import { ResponseError } from '~shared/response';

type SuperheroApiResponse = Superhero & {
  id: string;
  name: string;
};

type SearchResponse = {
  results: Superhero[];
};

class SuperheroApiClient {
  private readonly baseUrl: string;
  private readonly token: string;

  constructor() {
    this.baseUrl = config.apiHost;
    this.token = config.apiToken;
  }

  private async makeRequest<T>(
    endpoint: string,
    signal?: AbortSignal
  ): Promise<T> {
    const url = `${this.baseUrl}/api/${this.token}/${endpoint}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      signal,
    });

    if (!response.ok) {
      const error: ResponseError = await response.json();
      throw new Error(
        `Error ${response.status}: ${response.statusText} - ${error.error}`
      );
    }

    const data = await response.json();

    if (data.response === 'error') {
      throw new Error(`Error ${data.error}`);
    }

    return data;
  }

  async getSuperhero(id: string, signal?: AbortSignal): Promise<Superhero> {
    return this.makeRequest<SuperheroApiResponse>(id, signal);
  }

  async searchSuperheroes(
    query: string,
    signal?: AbortSignal
  ): Promise<SearchResponse> {
    return this.makeRequest<SearchResponse>(
      `search/${encodeURIComponent(query)}`,
      signal
    );
  }
}

export const superheroApiClient = new SuperheroApiClient();
