import { SearchInput } from './search-input';
import { SearchResults } from './search-results';

import { useHeroSearch } from '../hooks/use-hero-search';

export function HeroSearch() {
  const { searchValue, setSearchValue, debouncedSearchValue } = useHeroSearch();

  return (
    <div className="space-y-6">
      <SearchInput value={searchValue} onChange={setSearchValue} />
      <SearchResults searchValue={debouncedSearchValue} />
    </div>
  );
}
