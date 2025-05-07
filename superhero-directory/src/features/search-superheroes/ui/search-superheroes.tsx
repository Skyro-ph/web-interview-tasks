import { useState } from 'react';

import { superheroApi } from '~entities/superhero';
import { Superhero } from '~entities/superhero/superhero';
import { SuperheroCard } from '~entities/superhero/ui/superhero-card';

import { useDebounce } from '~shared/lib/debounce';

import { Spinner, TextField } from '@radix-ui/themes';

const SEARCH_DEBOUNCE_TIME = 500;

export function SearchSuperheroes() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, SEARCH_DEBOUNCE_TIME);

  const {
    data: superheroes,
    isLoading,
    error,
  } = superheroApi.useSearchSuperheros({
    query: debouncedSearchQuery,
  });

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center">
          <Spinner size="3" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center text-red-500">
          Error:{' '}
          {error instanceof Error ? error.message : 'Something went wrong'}
        </div>
      );
    }

    if (!debouncedSearchQuery) {
      return (
        <div className="w-full text-center">
          Enter a superhero name to search
        </div>
      );
    }

    if (!superheroes?.length) {
      return (
        <div className="w-full text-center">
          No superheroes found for &ldquo;{debouncedSearchQuery}&rdquo;
        </div>
      );
    }

    return (
      <div className="flex flex-wrap justify-center gap-4">
        {superheroes.map((hero: Superhero) => (
          <SuperheroCard key={hero.id} superhero={hero} />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="mx-auto my-8 max-w-4xl">
        <TextField.Root
          size="3"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {renderContent()}
    </>
  );
}
