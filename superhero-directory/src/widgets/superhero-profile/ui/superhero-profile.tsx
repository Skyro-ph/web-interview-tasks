import { Appearance } from '~features/superhero-details/ui/appearance';
import { Biography } from '~features/superhero-details/ui/biography';
import { PowerStats } from '~features/superhero-details/ui/power-stats';
import { SuperheroHeader } from '~features/superhero-details/ui/superhero-header';
import { SuperheroImage } from '~features/superhero-details/ui/superhero-image';
import { WorkAndConnections } from '~features/superhero-details/ui/work-and-connections';

import { Superhero } from '~entities/superhero/model/types';

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
