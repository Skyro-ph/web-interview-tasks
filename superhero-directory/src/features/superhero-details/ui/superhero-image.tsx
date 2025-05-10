import { useState } from 'react';

import { Superhero } from '~entities/superhero/model/types';

import { SuperheroImageSkeleton } from './superhero-image-skeleton';

type Props = {
  image: Superhero['image'];
  name: string;
};

export function SuperheroImage({ image, name }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <SuperheroImageSkeleton />}
      <img
        src={image.url}
        alt={name}
        className={`mx-auto mb-4 block rounded-md shadow-md ${
          isLoading ? 'hidden' : ''
        }`}
        onLoad={() => setIsLoading(false)}
      />
    </>
  );
}
