import { SearchInput } from './components';

export function HomePage() {
  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="font-display mb-4 text-center text-4xl">
        Superhero Directory
      </h1>
      <p className="mb-8 text-center text-lg">
        Welcome to the Superhero Directory! Here you can find information about
        your favorite superheroes.
      </p>

      <SearchInput />
    </div>
  );
}
