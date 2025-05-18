export const ROUTER_PATHS = {
  HOME: '/',
  SUPERHERO: ':id',
} as const;

export const getSuperheroPath = (id: string) =>
  ROUTER_PATHS.SUPERHERO.replace(':id', id);
