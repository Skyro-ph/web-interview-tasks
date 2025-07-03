import { SearchBlock } from '../../../components/SearchBlock';

export const MainPage = () => {
    return (
        <div className="px-4 max-w-4xl mx-auto text-center">
            <h1 className="font-display text-center text-4xl my-5">
            Superhero Directory
            </h1>
            <p>
            Welcome to the Superhero Directory! Here you can find
            information about your favorite superheroes.
            </p>
            <SearchBlock/>
        </div>
    )
}