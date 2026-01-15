import { superheroApi, SuperheroSearchResult } from '~entities/superhero';
import { SearchInput, useSuperheroSearchParams } from "~features/search-superheroes";

export const HomePage = () => {
  const {searchInput, setSearchInput, debouncedQuery} = useSuperheroSearchParams()

  const {
    data,
    isFetching,
    isError,
    error,
  } = superheroApi.useSearchSuperheros({ query: debouncedQuery });

  return (
    <div className="space-y-6">
      <h1 className="font-display text-center text-4xl mb-4">Superhero Directory</h1>
      <p className="text-center text-gray-600 mb-4">
        Welcome to the Superhero Directory! Here you can find information about your favorite superheroes.
      </p>

      <SearchInput 
        value={searchInput} 
        onChange={setSearchInput} 
        isFetching={isFetching} 
      />

      <SuperheroSearchResult
        heroes={data?.results} 
        isFetching={isFetching}
        isError={isError}
        error={error}
      />
    </div>
  );
}
