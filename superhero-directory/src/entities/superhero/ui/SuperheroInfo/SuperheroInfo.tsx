import { Superhero } from '~entities/superhero/model/superhero';

type SuperheroInfo = { superhero: Superhero };
export const SuperheroInfo = ({ superhero }: SuperheroInfo) => {
  return (
    <article className="mx-auto rounded-md bg-white p-6 shadow-md">
      <header className="mb-6">
        <img
          src={superhero.image.url}
          alt={superhero.name}
          className="mx-auto mb-4 block rounded-md shadow-md"
        />
        <h1 className="mb-2 text-center text-4xl font-bold">
          {superhero.name}
        </h1>
        <p className="text-center text-gray-600">
          {superhero.biography['full-name']}
        </p>
      </header>
      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">Powerstats</h2>
        <ul className="grid grid-cols-2 gap-4">
          {Object.entries(superhero.powerstats).map(([key, value]) => (
            <li key={key} className="flex justify-between">
              <span className="font-medium capitalize">{key}:</span>
              <span>{value === 'null' ? '-' : value}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">Biography</h2>
        <p>
          <strong>Place of Birth:</strong>{' '}
          {superhero.biography['place-of-birth']}
        </p>
        <p>
          <strong>First Appearance:</strong>{' '}
          {superhero.biography['first-appearance']}
        </p>
        <p>
          <strong>Publisher:</strong> {superhero.biography.publisher}
        </p>
        <p>
          <strong>Alignment:</strong> {superhero.biography.alignment}
        </p>
      </section>
      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">Appearance</h2>
        <p>
          <strong>Gender:</strong> {superhero.appearance.gender}
        </p>
        <p>
          <strong>Race:</strong> {superhero.appearance.race}
        </p>
        <p>
          <strong>Height:</strong> {superhero.appearance.height.join(' / ')}
        </p>
        <p>
          <strong>Weight:</strong> {superhero.appearance.weight.join(' / ')}
        </p>
        <p>
          <strong>Eye Color:</strong> {superhero.appearance['eye-color']}
        </p>
        <p>
          <strong>Hair Color:</strong> {superhero.appearance['hair-color']}
        </p>
      </section>
      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">Work</h2>
        <p>
          <strong>Occupation:</strong> {superhero.work.occupation}
        </p>
        <p>
          <strong>Base:</strong> {superhero.work.base}
        </p>
      </section>
      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">Connections</h2>
        <p>
          <strong>Group Affiliation:</strong>{' '}
          {superhero.connections['group-affiliation']}
        </p>
        <p>
          <strong>Relatives:</strong> {superhero.connections.relatives}
        </p>
      </section>
    </article>
  );
};
