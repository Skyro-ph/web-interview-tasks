import { Superhero } from '~entities/superhero/model/types';

type Props = {
  powerstats: Superhero['powerstats'];
};

export function PowerStats({ powerstats }: Props) {
  return (
    <section className="mb-6">
      <h2 className="mb-2 text-2xl font-semibold">Powerstats</h2>
      <ul className="grid grid-cols-2 gap-4">
        {Object.entries(powerstats).map(([key, value]) => (
          <li key={key} className="flex justify-between">
            <span className="font-medium capitalize">{key}:</span>
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
