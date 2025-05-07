export const superheroKeys = {
  all: () => ['superhero'],
  list: () => [...superheroKeys.all(), 'list'],
  search: (q: string) => [...superheroKeys.list(), q],
  superhero: (id: string) => [...superheroKeys.all(), id],
};
