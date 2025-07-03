import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import debounce from "lodash/debounce";
import { superheroApi } from "../../src/entities/superhero";

export const SearchBlock = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query") || "";

    const [searchText, setSearchText] = useState(query);

    const debouncedUpdateQuery = useMemo(
    () =>
      debounce((text: string) => {
        const trimmed = text.trim();
        if (trimmed) {
          setSearchParams({ query: trimmed });
        } else {
          setSearchParams({});
        }
      }, 300),
        [setSearchParams]
    );

    useEffect(() => {
        debouncedUpdateQuery(searchText);
        return () => debouncedUpdateQuery.cancel();
    }, [searchText, debouncedUpdateQuery]);

    const { data: superheroes, isLoading, isSuccess, error } = superheroApi.useSearchSuperheros({ query });
    return (
        <div className="mt-6">
        <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search superheroes..."
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-800"
        />

        {isLoading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error.message}</p>}
        {!isLoading && isSuccess && superheroes.response === "error" && query && (
            <p className="text-gray-500">No results found</p>
        )}
        {isSuccess && superheroes.response === "success" &&
        <ul className="space-y-4">
            {superheroes?.results?.map((hero) => (
            <li key={hero.id}>
                <Link to={`/${hero.id}`} className="block hover:shadow-md transition rounded border p-4">
                    <div className="flex items-center space-x-4">
                    <img src={hero.image.url} alt={hero.name} className="w-16 h-16 object-cover rounded-full" />
                    <div>
                        <h2 className="text-lg font-semibold">{hero.name}</h2>
                        <p className="text-sm text-gray-600">
                        {hero.biography["full-name"] || "No full name"}
                        </p>
                    </div>
                    </div>
                </Link>
            </li>
            ))}
        </ul>
        }
        
        </div>
    )
}