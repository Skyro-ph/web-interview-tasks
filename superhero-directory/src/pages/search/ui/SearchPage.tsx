import { useNavigate, useSearchParams } from 'react-router-dom';

import { SearchForm } from '~entities/search';
import {
  type Superhero,
  useSuperheroSearchByNameQuery,
} from '~entities/superhero';

function SearchResults({
  isSearchLoading,
  hasSearchError,
  searchResultsData,
  searchQuery,
}: {
  isSearchLoading: boolean;
  hasSearchError: boolean;
  searchResultsData?: { results: Superhero[] };
  searchQuery: string;
}) {
  if (isSearchLoading) {
    return <p className="text-center text-gray-500">Searching...</p>;
  }

  if (hasSearchError) {
    return <p className="text-center text-red-400">Something went wrong.</p>;
  }

  const hasResults =
    searchResultsData?.results && searchResultsData.results.length > 0;

  if (hasResults) {
    return (
      <ul className="grid gap-4">
        {searchResultsData.results.map((hero) => (
          <li
            key={hero.id}
            className="rounded-xl border border-orange-900/40 bg-[#1a1412]/95 p-4 text-white"
          >
            <span className="font-semibold">{hero.name}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (searchQuery) {
    return (
      <p className="text-center text-gray-500 italic">
        No heroes found for "{searchQuery}"
      </p>
    );
  }

  return null;
}

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchQuery = searchParams.get('q') ?? '';

  const {
    data: searchResultsData,
    isLoading: isSearchLoading,
    isError: hasSearchError,
  } = useSuperheroSearchByNameQuery(searchQuery || undefined);

  function onSearchDebounceUpdate(inputValue: string) {
    const trimmedInput = inputValue.trim();

    if (trimmedInput) {
      setSearchParams({ q: trimmedInput }, { replace: true });
    } else {
      navigate('/', { state: { fromSearch: true } });
    }
  }

  function onSearchSubmit(inputValue: string) {
    const trimmedInput = inputValue.trim();

    if (trimmedInput) {
      navigate(`/search?q=${encodeURIComponent(trimmedInput)}`, {
        replace: true,
      });
    } else {
      navigate('/', { state: { fromSearch: true } });
    }
  }

  return (
    <div className="flex flex-col items-start">
      <div className="flex w-full flex-col gap-6 py-8">
        <SearchForm
          value={searchQuery}
          placeholder="Search for a superhero..."
          debounceMs={800}
          onSubmit={onSearchSubmit}
          onDebounceChange={onSearchDebounceUpdate}
        />

        <div className="px-4">
          <SearchResults
            isSearchLoading={isSearchLoading}
            hasSearchError={hasSearchError}
            searchResultsData={searchResultsData}
            searchQuery={searchQuery}
          />
        </div>
      </div>
    </div>
  );
}
