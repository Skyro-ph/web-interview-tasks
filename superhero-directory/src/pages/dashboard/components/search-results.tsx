import { superheroApi } from '~entities/superhero';

import { HeroCard } from './hero-card';

interface SearchResultsProps {
  searchValue: string;
}

export function SearchResults({ searchValue }: SearchResultsProps) {
  const { data, isFetching, error } = superheroApi.useSearchSuperheros({
    query: searchValue,
  });

  if (isFetching) {
    return (
      <div className="text-center">
        <p className="text-gray-500">Searching...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500">
          Error searching for superheroes. Please try again.
        </p>
      </div>
    );
  }

  if (!data?.results.length) {
    return searchValue ? (
      <div className="text-center">
        <p className="text-gray-500">
          No superheroes found for &#34;{searchValue}&#34;.
        </p>
      </div>
    ) : null;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.results.map((hero) => (
        <HeroCard key={hero.id} {...hero} />
      ))}
    </div>
  );
}
