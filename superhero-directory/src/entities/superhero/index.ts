import { useSuperhero } from './api/get-superhero';
import { useSearchSuperheros } from './api/search-superheros';

export const superheroApi = {
  useSuperhero,
  useSearchSuperheros,
};

export { SuperheroCard } from './ui/superhero-card';
