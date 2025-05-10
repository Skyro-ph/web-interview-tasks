import { SuperheroSearchFeature } from '~features/superhero-search/ui';

export function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display mb-8 text-center text-4xl">
        Superhero Directory
      </h1>
      <p className="mb-8 text-center">
        Welcome to the Superhero Directory! Here you can find information about
        your favorite superheroes.
      </p>

      <SuperheroSearchFeature />
    </div>
  );
}
