import { useSuperhero } from './api/get-superhero';
import { useSearchSuperheros } from './api/search-superheros';

export const superheroApi = {
  useSuperhero,
  useSearchSuperheros,
};

export { SuperheroCard } from './ui/superhero-card';
export type { Superhero } from './superhero';
export {
  QUERY_STORAGE_KEY,
  RESULTS_STORAGE_KEY,
} from './api/search-superheros';
