import { Link } from 'react-router-dom';

import { useSearchQuery, SearchInput } from '~features/search-superheroes';

import { superheroApi } from '~entities/superhero';

export function HomePage() {
  const { searchQuery, setSearchQuery, debouncedSearchQuery } =
    useSearchQuery();

  const {
    data: superheroes,
    isLoading,
    isError,
    error,
  } = superheroApi.useSearchSuperheros({
    query: debouncedSearchQuery,
  });

  return (
    <>
      <h1 className="font-display text-center text-4xl">Superhero Directory</h1>
      <p>
        Welcome to the Superhero Directory! Here you can find information about
        your favorite superheroes.
      </p>
      <SearchInput value={searchQuery} onChange={setSearchQuery} />
      <section className="mt-4">
        {(() => {
          if (isLoading) {
            return <p className="text-center text-gray-500">Loading...</p>;
          }

          if (isError) {
            return <p className="text-center text-red-500">{error.message}</p>;
          }

          if (!superheroes) {
            return null;
          }

          return (
            <ul>
              {superheroes.results.map((superhero) => (
                <li key={superhero.id}>
                  <Link to={{ pathname: `/${superhero.id}` }}>
                    {superhero.name}
                  </Link>
                </li>
              ))}
            </ul>
          );
        })()}
      </section>
    </>
  );
}
