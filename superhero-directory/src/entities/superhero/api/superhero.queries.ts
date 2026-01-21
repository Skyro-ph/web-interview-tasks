export const superheroQueries = {
  all: () => ['superhero'],
  list: () => [...superheroQueries.all(), 'list'],
  search: (q: string) => [...superheroQueries.list(), q],
  superhero: (id: string) => [...superheroQueries.all(), id],
};
