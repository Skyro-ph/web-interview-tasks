export const SUPERHERO_QUERY_KEYS = {
  superheroById: (id: string | undefined) => ['superhero', id],
  searchByName: (name: string | undefined) => ['superhero', 'search', name],
};
