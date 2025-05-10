import { Superhero } from '~entities/superhero/model/types';

type Props = {
  appearance: Superhero['appearance'];
};

export function Appearance({ appearance }: Props) {
  return (
    <section className="mb-6">
      <h2 className="mb-2 text-2xl font-semibold">Appearance</h2>
      <p>
        <strong>Gender:</strong> {appearance.gender}
      </p>
      <p>
        <strong>Race:</strong> {appearance.race}
      </p>
      <p>
        <strong>Height:</strong> {appearance.height.join(' / ')}
      </p>
      <p>
        <strong>Weight:</strong> {appearance.weight.join(' / ')}
      </p>
      <p>
        <strong>Eye Color:</strong> {appearance['eye-color']}
      </p>
      <p>
        <strong>Hair Color:</strong> {appearance['hair-color']}
      </p>
    </section>
  );
}
