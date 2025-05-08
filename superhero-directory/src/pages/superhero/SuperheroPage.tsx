import { Link, useParams } from 'react-router-dom';

import { SuperheroInfo } from '~entities/superhero/ui/SuperheroInfo';

import { superheroApi } from '~entities/superhero';

export function SuperheroPage() {
  const { id } = useParams();
  const {
    data: superhero,
    isLoading,
    error,
  } = superheroApi.useSuperhero({ id });

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error || !superhero) {
    return (
      <div className='text-center'>
        <p className="text-red-500 mb-6">Failed to load superhero data.</p>
        <Link to={'/'} className='underline'>Go to main page</Link>
      </div>
    );
  }

  return <SuperheroInfo superhero={superhero} />;
}
