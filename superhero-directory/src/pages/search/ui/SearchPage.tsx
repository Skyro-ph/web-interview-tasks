import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import { SearchForm } from '~entities/search';
import {
  HeroCard,
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
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    setVisibleCount(10);
  }, [searchQuery]);

  function onLoadMore() {
    setVisibleCount((prev) => prev + 10);
  }

  if (isSearchLoading) {
    return (
      <ul className="grid w-full grid-cols-2 gap-4 max-[400px]:grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <li key={i} className="h-[400px] animate-pulse rounded-xl border border-white/5 bg-[#1a1412]/60" />
        ))}
      </ul>
    );
  }

  if (hasSearchError) {
    return <p className="text-center text-red-500 font-medium">Something went wrong fetching the heroes.</p>;
  }

  const results = searchResultsData?.results ?? [];
  const hasResults = results.length > 0;

  if (hasResults) {
    const visibleResults = results.slice(0, visibleCount);
    const hasMore = visibleCount < results.length;

    return (
      <div className="flex w-full flex-col items-center gap-10">
        <ul className="grid w-full grid-cols-2 gap-4 max-[400px]:grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {visibleResults.map((hero, index) => (
            <HeroCard key={hero.id} hero={hero} index={index} />
          ))}
        </ul>

        {hasMore && (
          <motion.button
            type="button"
            className="cursor-pointer flex items-center justify-center rounded-xl bg-yellow-400 px-10 py-3 text-2xl font-bangers tracking-wider text-black border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-colors hover:bg-yellow-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow-500 uppercase"
            whileHover={{ x: -1, y: -1, boxShadow: '8px 8px 0px rgba(0,0,0,1)' }}
            whileTap={{ x: 2, y: 2, boxShadow: '0px 0px 0px rgba(0,0,0,1)' }}
            onClick={onLoadMore}
          >
            Show More
          </motion.button>
        )}
      </div>
    );
  }

  if (searchQuery) {
    return (
      <p className="text-center text-gray-500 italic mt-8 text-lg">
        No heroes found matching "{searchQuery}". Try another name.
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
    <div className="flex w-full flex-col pt-8">
      <div className="sticky top-8 z-20">
        <SearchForm
          value={searchQuery}
          placeholder="Search for a superhero..."
          debounceMs={800}
          onSubmit={onSearchSubmit}
          onDebounceChange={onSearchDebounceUpdate}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-8 xl:px-8">
        <SearchResults
          isSearchLoading={isSearchLoading}
          hasSearchError={hasSearchError}
          searchResultsData={searchResultsData}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}
