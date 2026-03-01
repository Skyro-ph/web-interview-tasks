import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { SearchForm } from '~entities/search';

import { useSearchAnimation } from '../model';

export function MainPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const isNavigatingFromSearchPage = state?.fromSearch === true;

  const { searchContainerScope, triggerSearchExitAnimation } =
    useSearchAnimation({
      isNavigatingFromSearchPage,
    });

  const pendingUrl = useRef<string | null>(null);

  async function onSubmitSearch(value: string) {
    const trimmed = value.trim();

    if (!trimmed) {
      return;
    }

    pendingUrl.current = `/search?q=${encodeURIComponent(trimmed)}`;

    await triggerSearchExitAnimation();

    if (pendingUrl.current) {
      navigate(pendingUrl.current);
      pendingUrl.current = null;
    }
  }

  return (
    <div
      ref={searchContainerScope}
      className="absolute inset-x-0"
      style={{
        top: isNavigatingFromSearchPage ? '32px' : '50%',
        transform: isNavigatingFromSearchPage
          ? 'translateY(0)'
          : 'translateY(-50%)',
      }}
    >
      <SearchForm
        placeholder="Search for a superhero..."
        debounceMs={800}
        onSubmit={onSubmitSearch}
        onDebounceChange={onSubmitSearch}
      />
    </div>
  );
}
