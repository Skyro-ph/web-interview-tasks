import { Link } from 'react-router-dom';

import { Superhero } from '~entities/superhero';

import { getSuperheroPath } from '~shared/config';

type Props = {
  hero: Superhero;
};

export const SuperheroCard = ({ hero }: Props) => {
  return (
    <Link
      to={getSuperheroPath(hero.id)}
      className="cursor-pointer rounded-lg border p-4 shadow-sm transition-all duration-200 hover:scale-[1.02] hover:border-blue-500 hover:shadow-md"
    >
      <h2 className="mb-2 text-xl font-semibold">{hero.name}</h2>
      {hero.biography && (
        <p className="text-gray-600">{hero.biography['full-name']}</p>
      )}
    </Link>
  );
};
