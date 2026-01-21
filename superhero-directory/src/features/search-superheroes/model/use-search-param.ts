import { useSearchParams } from 'react-router-dom';

export function useSearchParam() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') ?? '';

  const setSearch = (value: string) => {
    setSearchParams((params) => {
      const next = new URLSearchParams(params);
      const v = value.trim();

      if (v) next.set('search', value);
      else next.delete('search');

      return next;
    });
  };

  return { search, setSearch };
}
