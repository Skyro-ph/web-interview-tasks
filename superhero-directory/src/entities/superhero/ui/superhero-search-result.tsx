import { Superhero } from "../superhero";
import { SuperheroCard } from './superhero-card';
import { SuperheroSkeleton } from './superhero-skeleton';

interface SuperheroSearchResultProps {
  heroes?: Superhero[];
  isFetching: boolean;
  isError: boolean;
  error?: Error | null;
}

export const SuperheroSearchResult = ({ heroes, isFetching, isError, error }: SuperheroSearchResultProps) => {
  if (heroes && heroes.length > 0) {
    return (
        <div className={`grid grid-cols-3 gap-6 lg:grid-cols-4`}>
          {heroes.map((hero) => (
            <SuperheroCard key={hero.id} hero={hero} />
          ))}
        </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 p-4 text-red-600 rounded-lg text-center">
        {error?.message || 'Something went wrong'}
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className="grid grid-cols-3 gap-6 lg:grid-cols-4">
        {[...Array(12)].map((_, index) => <SuperheroSkeleton key={index} />)}
      </div>
    );
  }

  return null;
};