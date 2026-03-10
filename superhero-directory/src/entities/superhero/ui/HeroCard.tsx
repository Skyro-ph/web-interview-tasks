import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

import { memo } from 'react';
import { Link } from 'react-router-dom';

import { useFavoritesStore } from '../store';
import type { Superhero } from '../types';

const FALLBACK_IMAGE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" fill="%23262626"><rect width="100%25" height="100%25"/></svg>';

function getSubtitle(hero: Superhero): string {
  const fullName = hero.biography?.['full-name'];
  const publisher = hero.biography?.publisher;

  if (fullName && fullName !== '-' && fullName !== hero.name) {
    return fullName;
  }

  if (publisher && publisher !== '-') {
    return publisher;
  }

  return 'Unknown Origin';
}

export const HeroCard = memo(function HeroCard({
  hero,
  index = 0,
}: {
  hero: Superhero;
  index?: number;
}) {
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const favorited = useFavoritesStore((s) => s.favorites.has(hero.id));
  const displaySubtitle = getSubtitle(hero);

  function onImageError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
  }

  function onToggleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(hero.id);
  }

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
        delay: (index % 10) * 0.05,
      }}
      whileTap={{ scale: 0.97 }}
      className="group list-none"
    >
      <Link
        to={`/${hero.id}`}
        className="block h-full overflow-hidden rounded-xl border-2 border-orange-500/20 bg-[#131418] shadow-md transition-all duration-300 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none [@media(hover:hover)]:hover:-translate-y-2 [@media(hover:hover)]:hover:scale-[1.02] [@media(hover:hover)]:hover:border-orange-500/50 [@media(hover:hover)]:hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]"
      >
        <span className="flex h-full flex-col">
          <span className="relative block aspect-[4/5] w-full overflow-hidden bg-neutral-800">
            <span className="block h-full w-full transition-transform duration-300 ease-out [@media(hover:hover)]:group-hover:scale-105">
              <img
                src={hero.image?.url || FALLBACK_IMAGE}
                alt={hero.name}
                className="h-full w-full object-cover"
                loading="lazy"
                onError={onImageError}
              />
            </span>

            <motion.button
              type="button"
              whileTap={{ scale: 1.3 }}
              className="absolute top-3 right-3 z-10 cursor-pointer rounded-full bg-black/40 p-2 backdrop-blur-sm transition-colors [@media(hover:hover)]:hover:bg-black/60"
              onClick={onToggleFavorite}
            >
              <Heart
                className={`h-5 w-5 transition-colors ${favorited
                  ? 'fill-red-500 text-red-500'
                  : 'text-white/60'
                  }`}
              />
            </motion.button>

            <span className="absolute inset-x-0 bottom-0 block h-24 bg-gradient-to-t from-[#131418] to-transparent" />
          </span>

          <span className="block h-1.5 w-full bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-500" />

          <span className="flex flex-1 items-center justify-between p-4">
            <span className="flex w-full flex-col">
              <span className="font-bangers text-2xl tracking-wider text-white transition-colors duration-200 [@media(hover:hover)]:group-hover:text-orange-400">
                {hero.name}
              </span>
              <span className="mt-1 block text-sm font-medium text-white/50">
                {displaySubtitle}
              </span>
            </span>
          </span>
        </span>
      </Link>
    </motion.li>
  );
})
