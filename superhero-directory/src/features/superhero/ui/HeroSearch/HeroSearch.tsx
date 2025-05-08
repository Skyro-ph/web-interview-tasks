import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

import { superheroApi } from '~entities/superhero';
import { SuperheroCard } from '~entities/superhero/ui';

import { useDebounce } from '~shared/hooks/useDebounce';
import { SearchInput } from '~shared/ui/SearchInput';
import { capitalize } from '~shared/utils/capitalize';

export const HeroSearch = () => {
  const [params, setParams] = useSearchParams();
  const defaultValue = params.get('query') || '';

  const setDeferredValue = (value: string) => {
    if (!value) {
      setParams({});
    } else {
      setParams({ query: value }, { replace: true });
    }
  };

  const {
    data: superheroes,
    isSuccess,
    isLoading,
    error,
  } = superheroApi.useSearchSuperheros({ query: defaultValue });

  const debouncedOnChange = useDebounce(setDeferredValue, 500);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedOnChange(e.target.value);
  };
  return (
    <div className="text-center">
      <SearchInput
        name="query"
        placeholder="Search for a superhero..."
        defaultValue={defaultValue}
        className="mb-4"
        onChange={(e) => onChange(e)}
      />
      {isLoading && <p>Loading superheroes...</p>}
      {error && <p className='text-red-500'>{capitalize(error.message)}</p>}
      {isSuccess && (
        <ul className="grid grid-flow-row grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
          {superheroes?.results.map((hero) => (
            <li key={hero.id} className="size-full">
              <SuperheroCard name={hero.name} image={hero.image} id={hero.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
