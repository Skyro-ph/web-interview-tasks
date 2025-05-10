import { Superhero } from '~entities/superhero/model/types';

type Props = {
  work: Superhero['work'];
  connections: Superhero['connections'];
};

export function WorkAndConnections({ work, connections }: Props) {
  return (
    <>
      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">Work</h2>
        <p>
          <strong>Occupation:</strong> {work.occupation}
        </p>
        <p>
          <strong>Base:</strong> {work.base}
        </p>
      </section>
      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">Connections</h2>
        <p>
          <strong>Group Affiliation:</strong> {connections['group-affiliation']}
        </p>
        <p>
          <strong>Relatives:</strong> {connections.relatives}
        </p>
      </section>
    </>
  );
}
