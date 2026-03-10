import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { SearchForm } from '~entities/search';
import {
  HeroCard,
  type Superhero,
  useFavoritesStore,
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
  const favorites = useFavoritesStore((s) => s.favorites);
  const showFavorites = useFavoritesStore((s) => s.showFavorites);
  const toggleShowFavorites = useFavoritesStore((s) => s.toggleShowFavorites);

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
          <li
            key={i}
            className="h-[400px] animate-pulse rounded-xl border border-white/5 bg-[#1a1412]/60"
          />
        ))}
      </ul>
    );
  }

  if (hasSearchError) {
    return (
      <p className="text-center font-medium text-red-500">
        Something went wrong fetching the heroes.
      </p>
    );
  }

  const results = searchResultsData?.results ?? [];
  const filteredResults = showFavorites
    ? results.filter((hero) => favorites.has(hero.id))
    : results;
  const hasResults = filteredResults.length > 0;

  if (results.length > 0) {
    const visibleResults = filteredResults.slice(0, visibleCount);
    const hasMore = visibleCount < filteredResults.length;

    return (
      <div className="flex w-full flex-col items-center gap-10">
        <div className="flex w-full items-center justify-end">
          <button
            type="button"
            onClick={toggleShowFavorites}
            className={`flex cursor-pointer items-center gap-2.5 rounded-full border-2 px-4 py-2 text-sm font-bold tracking-wide transition-all ${showFavorites
              ? 'border-red-500/50 bg-red-500/10 text-red-400'
              : 'border-white/10 bg-white/5 text-white/50 [@media(hover:hover)]:hover:border-white/20 [@media(hover:hover)]:hover:text-white/70'
              }`}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${showFavorites ? 'fill-red-500 text-red-500' : ''
                }`}
            />
            Show Favorites
          </button>
        </div>

        {hasResults ? (
          <>
            <ul className="grid w-full grid-cols-2 gap-4 max-[400px]:grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {visibleResults.map((hero, index) => (
                <HeroCard key={hero.id} hero={hero} index={index} />
              ))}
            </ul>

            {hasMore && (
              <motion.button
                type="button"
                className="font-bangers flex cursor-pointer items-center justify-center rounded-xl border-4 border-black bg-yellow-400 px-10 py-3 text-2xl tracking-wider text-black uppercase shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-colors hover:bg-yellow-300 focus-visible:ring-4 focus-visible:ring-yellow-500 focus-visible:outline-none"
                whileHover={{
                  x: -1,
                  y: -1,
                  boxShadow: '8px 8px 0px rgba(0,0,0,1)',
                }}
                whileTap={{ x: 2, y: 2, boxShadow: '0px 0px 0px rgba(0,0,0,1)' }}
                onClick={onLoadMore}
              >
                Show More
              </motion.button>
            )}
          </>
        ) : (
          <p className="mt-8 text-center text-lg text-gray-500 italic">
            No favorites found among the results. Try adding some!
          </p>
        )}
      </div>
    );
  }

  if (searchQuery) {
    return (
      <p className="mt-8 text-center text-lg text-gray-500 italic">
        No heroes found matching &quot;{searchQuery}&quot;. Try another name.
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
