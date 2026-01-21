import { useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { superheroApi } from '~entities/superhero';

import { useDebouncedCallback } from '~shared/hooks/useDebouncedCallback';
import { ErrorCard } from '~shared/ui';

export function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    data: superheros,
    isLoading,
    error,
  } = superheroApi.useSearchSuperheros({ query });

  const debouncedSetParams = useDebouncedCallback<(value: string) => void>(
    (value) => setSearchParams(value ? { q: value } : {}, { replace: true }),
    300
  );

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = query;
  }, [query]);

  useEffect(() => () => debouncedSetParams.cancel(), [debouncedSetParams]);

  return (
    <div className="mx-auto max-w-2xl p-6">
      <input
        type="text"
        ref={inputRef}
        defaultValue={query}
        onChange={(e) => debouncedSetParams(e.target.value)}
        placeholder="Search superheroes..."
        className="mb-6 w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
      />

      {isLoading && <p className="text-center text-gray-500">Loading...</p>}

      {error && (
        <ErrorCard
          title="Something went wrong"
          message="Failed to load superhero data."
        />
      )}

      {superheros?.response === 'error' && (
        <ErrorCard icon="🔍" title="Not found" message={superheros.error} />
      )}

      {!query && !isLoading && (
        <p className="text-center text-gray-500">Enter a name to search</p>
      )}

      {query &&
        !isLoading &&
        !error &&
        superheros?.response === 'success' &&
        !superheros.results.length && (
          <p className="text-center text-gray-500">
            No superheroes found for &quot;{query}&quot;
          </p>
        )}

      {superheros?.response === 'success' && superheros.results.length > 0 && (
        <ul className="space-y-4">
          {superheros.results.map((hero) => (
            <li key={hero.id}>
              <Link
                to={`/${hero.id}`}
                className="flex items-center gap-4 rounded-md bg-white p-4 shadow-md hover:shadow-lg"
              >
                <img
                  src={hero.image.url}
                  alt={hero.name}
                  className="h-16 w-16 rounded-full object-cover"
                />

                <div>
                  <h2 className="text-lg font-semibold">{hero.name}</h2>

                  <p className="text-sm text-gray-600">
                    {hero.biography['full-name']}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
