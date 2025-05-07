import { Link } from 'react-router-dom';

import { Superhero } from '../superhero';

interface Props {
  superhero: Superhero;
}

export function SuperheroCard({ superhero }: Props) {
  return (
    <Link
      to={`/${superhero.id}`}
      className="group block w-64 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={superhero.image.url}
          alt={superhero.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-1 text-xl font-bold text-gray-900">
          {superhero.name}
        </h3>
        <p className="mb-2 text-sm text-gray-600">
          {superhero.biography['full-name'] || 'Unknown identity'}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="capitalize">{superhero.appearance.gender}</span>
          <span className="capitalize">{superhero.biography.publisher}</span>
        </div>
      </div>
    </Link>
  );
}
