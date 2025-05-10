import { ChangeEvent } from 'react';

import { SearchInput } from '~shared/ui';

type Props = {
  onSearch: (query: string) => void;
  value: string;
  placeholder?: string;
  className?: string;
};

export const HeroSearch = ({
  onSearch,
  value,
  placeholder = 'Search for superheroes...',
  className = '',
}: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const handleClear = () => {
    onSearch('');
  };

  return (
    <SearchInput
      value={value}
      onChange={handleChange}
      onClear={handleClear}
      placeholder={placeholder}
      className={className}
    />
  );
};
