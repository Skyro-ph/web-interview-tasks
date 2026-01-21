import { Link } from 'react-router-dom';

import { Superhero } from '~entities/superhero/model/types';

import { Card } from '@radix-ui/themes';

export function SuperheroCard({ superhero }: { superhero: Superhero }) {
  return (
    <Link key={superhero.id} to={`/${superhero.id}`}>
      <Card className="h-full cursor-pointer transition-shadow hover:shadow">
        <div className="flex flex-col items-center gap-4 p-4">
          <img
            src={superhero.image.url}
            alt={superhero.name}
            className="h-32 w-32 rounded object-cover"
          />
          <div className="text-center">
            <h3 className="font-display mb-1 text-xl">{superhero.name}</h3>
            {superhero.biography.publisher && (
              <p className="text-sm text-gray-600">
                {superhero.biography.publisher}
              </p>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
