const BASE_KEY = 'superhero';

export const superheroKeys = {
  all: () => [BASE_KEY],
  search: (q: string) => [BASE_KEY, q],
  superhero: (id: string) => [BASE_KEY, id],
} as const;
