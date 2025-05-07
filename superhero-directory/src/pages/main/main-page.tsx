import { useState } from 'react';

import { superheroApi } from '~entities/superhero';
import { Superhero } from '~entities/superhero/superhero';
import { SuperheroCard } from '~entities/superhero/ui/superhero-card';

import { useDebounce } from '~shared/lib/debounce';

import { TextField } from '@radix-ui/themes';

const SEARCH_DEBOUNCE_TIME = 500;

export function MainPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, SEARCH_DEBOUNCE_TIME);

  const { data: superheroes, isLoading } = superheroApi.useSearchSuperheros({
    query: debouncedSearchQuery,
  });

  return (
    <>
      <h1 className="font-display text-center text-4xl">Superhero Directory</h1>

      <p className="mb-8 text-center">
        Welcome to the Superhero Directory! Here you can find information about
        your favorite superheroes.
      </p>

      <div className="mx-auto my-8 max-w-4xl">
        <TextField.Root
          size="3"
          placeholder="Enter superhero name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading && <div className="text-center">Loading...</div>}

      <div className="flex flex-wrap justify-center gap-4">
        {superheroes?.map((hero: Superhero) => (
          <SuperheroCard key={hero.id} superhero={hero} />
        ))}
      </div>
    </>
  );
}
