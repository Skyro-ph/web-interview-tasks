import {
  SuperheroImage,
  SuperheroHeader,
  PowerStats,
  Biography,
  Appearance,
  WorkAndConnections,
} from '~features/superhero-details';

import { Superhero } from '~entities/superhero';

type Props = {
  superhero: Superhero;
};

export function SuperheroProfile({ superhero }: Props) {
  return (
    <article className="mx-auto rounded-md bg-white p-6 shadow-md">
      <header className="mb-6">
        <SuperheroImage image={superhero.image} name={superhero.name} />
        <SuperheroHeader
          name={superhero.name}
          fullName={superhero.biography['full-name']}
        />
      </header>

      <PowerStats powerstats={superhero.powerstats} />
      <Biography biography={superhero.biography} />
      <Appearance appearance={superhero.appearance} />
      <WorkAndConnections
        work={superhero.work}
        connections={superhero.connections}
      />
    </article>
  );
}
