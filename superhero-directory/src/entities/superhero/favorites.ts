import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (id: string) => {
        const current = get().favorites;
        const exists = current.includes(id);

        set({
          favorites: exists
            ? current.filter((fid) => fid !== id)
            : [...current, id],
        });
      },

      isFavorite: (id: string) => {
        return get().favorites.includes(id);
      },
    }),
    {
      name: 'superhero-favorites',
    }
  )
);
