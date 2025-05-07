import { SearchSuperheroes } from '~features/search-superheroes';

export function MainPage() {
  return (
    <>
      <h1 className="font-display text-center text-4xl">Superhero Directory</h1>

      <p className="mb-8 text-center">
        Welcome to the Superhero Directory! Here you can find information about
        your favorite superheroes.
      </p>

      <SearchSuperheroes />
    </>
  );
}
