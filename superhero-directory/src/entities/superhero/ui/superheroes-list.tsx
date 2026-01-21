import { SuperheroCard } from './superhero-card';

import { Superhero } from '../model/types';

interface SuperheroesListProps {
  superheroes: Superhero[];
}

export function SuperheroesList({ superheroes }: SuperheroesListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {superheroes.map((s) => (
        <SuperheroCard key={s.id} superhero={s} />
      ))}
    </div>
  );
}
