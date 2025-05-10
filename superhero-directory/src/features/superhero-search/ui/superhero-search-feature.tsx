import { Superhero } from '~entities/superhero/model/types';

import { isApiError } from '~shared/api/api-error';
import { Loader } from '~shared/ui/loader';

import { HeroSearch } from './hero-search';
import { SuperheroCard } from './superhero-card';

import { useSuperheroSearch } from '../model/use-superhero-search';

export const SuperheroSearchFeature = () => {
  const { searchQuery, handleSearch, superheroes, isLoading, error } =
    useSuperheroSearch({ debounceMs: 500 });

  return (
    <div>
      <HeroSearch
        value={searchQuery}
        onSearch={handleSearch}
        placeholder="Search for superheroes..."
        className="mb-8"
      />

      {isLoading && (
        <div className="flex justify-center">
          <Loader />
        </div>
      )}

      {error && (
        <p className="text-center text-red-500">
          Error: {isApiError(error) ? error.message : 'Something went wrong'}
        </p>
      )}

      {superheroes && superheroes.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {superheroes.map((hero: Superhero) => (
            <SuperheroCard key={hero.id} hero={hero} />
          ))}
        </div>
      )}

      {superheroes && superheroes.length === 0 && (
        <p className="text-center text-gray-500">No superheroes found</p>
      )}
    </div>
  );
};
