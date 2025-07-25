import { Link } from 'react-router-dom';

import { Superhero } from '~entities/superhero/superhero';

export function HeroCard({ id, image, name, biography }: Superhero) {
  return (
    <Link
      to={`/${id}`}
      className="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-center space-x-3">
        <img
          src={image.url}
          alt={name}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600">{biography['full-name']}</p>
        </div>
      </div>
    </Link>
  );
}
