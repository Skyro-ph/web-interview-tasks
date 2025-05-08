import { HeroSearch } from '~features/superhero/ui/HeroSearch';

export const MainPage = () => {
  return (
    <section>
      <h1 className="font-display text-center text-4xl">Superhero Directory</h1>
      <p className='text-center'>
        Welcome to the Superhero Directory! Here you can find information about
        your favorite superheroes.
      </p>
      <HeroSearch />
    </section>
  );
};
