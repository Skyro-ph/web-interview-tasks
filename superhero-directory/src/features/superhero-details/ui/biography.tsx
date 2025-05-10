import { Superhero } from '~entities/superhero/model/types';

type Props = {
  biography: Superhero['biography'];
};

export function Biography({ biography }: Props) {
  return (
    <section className="mb-6">
      <h2 className="mb-2 text-2xl font-semibold">Biography</h2>
      <p>
        <strong>Place of Birth:</strong> {biography['place-of-birth']}
      </p>
      <p>
        <strong>First Appearance:</strong> {biography['first-appearance']}
      </p>
      <p>
        <strong>Publisher:</strong> {biography.publisher}
      </p>
      <p>
        <strong>Alignment:</strong> {biography.alignment}
      </p>
    </section>
  );
}
