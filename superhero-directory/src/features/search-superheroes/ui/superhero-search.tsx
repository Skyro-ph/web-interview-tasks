import * as React from 'react';

import { superheroApi } from '~entities/superhero';
import { SuperheroesList } from '~entities/superhero/ui/superheroes-list';

import { useDebounce } from '~shared/hooks/use-debounce';

import { ErrorMessage } from './error-message';
import { Loading } from './loading';
import { SearchField } from './search-field';

import { useSearchParam } from '../model/use-search-param';

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return 'Something went wrong';
}

export function SuperheroSearch() {
  const { search, setSearch } = useSearchParam();
  const debouncedQuery = useDebounce(search);

  const { data, error, isFetching } = superheroApi.useSearchSuperheros({
    query: debouncedQuery,
  });

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const hasSuccessData = data?.response === 'success';
  const hasApiErrorData = data?.response === 'error';

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <SearchField value={search} onChange={handleSearchInputChange} />

        {isFetching && <span className="text-sm opacity-70">Updating…</span>}
      </div>

      <div className="mt-4">
        {hasSuccessData ? (
          <>
            {error && (
              <div className="mb-3">
                <ErrorMessage message={getErrorMessage(error)} />
              </div>
            )}

            <SuperheroesList superheroes={data.results} />
          </>
        ) : hasApiErrorData ? (
          <ErrorMessage message={data.error} />
        ) : error ? (
          <ErrorMessage message={getErrorMessage(error)} />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
