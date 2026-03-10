import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favorites: Set<string>;
  showFavorites: boolean;
  toggleFavorite: (id: string) => void;
  toggleShowFavorites: () => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: new Set<string>(),
      showFavorites: false,

      toggleFavorite: (id: string) => {
        const current = get().favorites;
        const next = new Set(current);

        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }

        set({ favorites: next });
      },

      toggleShowFavorites: () => {
        set({ showFavorites: !get().showFavorites });
      },

      isFavorite: (id: string) => {
        return get().favorites.has(id);
      },
    }),
    {
      name: 'superhero-favorites',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;

          const parsed = JSON.parse(str);
          return {
            ...parsed,
            state: {
              ...parsed.state,
              favorites: new Set<string>(parsed.state.favorites),
            },
          };
        },
        setItem: (name, value) => {
          const serialized = {
            ...value,
            state: {
              ...value.state,
              favorites: [...value.state.favorites],
            },
          };
          localStorage.setItem(name, JSON.stringify(serialized));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
