import { useParams } from 'react-router-dom';

import { SuperheroProfile } from '~widgets/superhero-profile/ui/superhero-profile';

import { superheroApi } from '~entities/superhero';

import { BackButton } from '~shared/ui/back-button';
import { Loader } from '~shared/ui/loader';

export function SuperheroPage() {
  const { id } = useParams();
  const {
    data: superhero,
    isLoading,
    error,
  } = superheroApi.useSuperhero({ id });

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  if (error || !superhero) {
    return (
      <p className="text-center text-red-500">Failed to load superhero data.</p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton className="mb-6" />
      <SuperheroProfile superhero={superhero} />
    </div>
  );
}
