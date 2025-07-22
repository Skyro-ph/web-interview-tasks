import {
  useState,
  useTransition,
  useEffect,
  useRef,
} from 'react';
import { useSearchParams } from 'react-router-dom';

import { useSearchSuperheros } from '~entities/superhero/api/search-superheros';

import debounce from 'debounce';

const DEBOUNCE_DELAY = 500;
export function SearchInput() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [inputValue, setInputValue] = useState(
    () => searchParams.get('query') || ''
  );

  const [query, setQuery] = useState(inputValue);

  const [isPending, startTransition] = useTransition();

const debouncedSetQuery = useRef(
  debounce((value: string) => {
    startTransition(() => {
      setQuery(value);
      setSearchParams(value ? { query: value } : {});
    });
  }, DEBOUNCE_DELAY)
);

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(value);
    debouncedSetQuery.current(value);
  };

  useEffect(() => {
    const param = searchParams.get('query') || '';
    if (param !== inputValue) {
      setInputValue(param);
      setQuery(param);
    }
  }, [searchParams]);

  useEffect(() => {
  return () => {
    debouncedSetQuery.current.clear();
  };
}, []);

  const { data, isLoading, error } = useSearchSuperheros({ query });

  return (
    <div className="mx-auto max-w-xl p-4">
      <input
        value={inputValue}
        type="text"
        placeholder="Search superheroes"
        className="w-full rounded border p-2"
        onChange={handleChange}
      />

      {isLoading || isPending ? (
        <p className="mt-4 text-gray-500">Loading...</p>
      ) : error ? (
        <p className="mt-4 text-red-500">
          {error.message || 'Error loading superheroes.'}
        </p>
      ) : data?.results?.length === 0 ? (
        <p className="mt-4 text-gray-500">No results found.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {data?.results?.map((hero) => (
            <li key={hero.id} className="rounded border p-2">
              {hero.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
