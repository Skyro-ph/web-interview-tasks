import { SuperheroSearch } from '~features/search-superheroes';

export function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="font-display text-4xl">Superhero Directory</h1>
        <p>
          Welcome to the Superhero Directory! Here you can find information
          about your favorite superheroes.
        </p>
      </div>

      <SuperheroSearch />
    </div>
  );
}
