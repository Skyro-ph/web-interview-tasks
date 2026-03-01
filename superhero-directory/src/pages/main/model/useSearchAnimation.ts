import { AnimationScope, useAnimate } from 'motion/react';

import { useCallback, useEffect, useRef } from 'react';

const FAST_EASING_CURVE = [0.4, 0, 0.2, 1] as const;
const CENTER_VIEWPORT_POSITION = { top: '50%', y: '-50%' } as const;
const TOP_VIEWPORT_POSITION = { top: '32px', y: 0 } as const;

interface UseSearchAnimationOptions {
  isNavigatingFromSearchPage: boolean;
}

interface UseSearchAnimationReturn {
  searchContainerScope: AnimationScope<HTMLDivElement>;
  isAnimationInProgress: boolean;
  triggerSearchExitAnimation: () => Promise<void>;
}

export function useSearchAnimation({
  isNavigatingFromSearchPage,
}: UseSearchAnimationOptions): UseSearchAnimationReturn {
  const [searchContainerScope, animateSearchElement] =
    useAnimate<HTMLDivElement>();
  const isAnimationInProgressRef = useRef(false);

  useEffect(() => {
    if (!isNavigatingFromSearchPage) {
      return;
    }

    async function playSearchEntryAnimation() {
      isAnimationInProgressRef.current = true;

      try {
        await animateSearchElement(
          searchContainerScope.current,
          CENTER_VIEWPORT_POSITION,
          {
            duration: 0.35,
            ease: FAST_EASING_CURVE,
          }
        );
      } finally {
        isAnimationInProgressRef.current = false;
      }
    }

    playSearchEntryAnimation().catch((animationError) => {
      console.error('SEARCH ENTRY ANIMATION FAILED:', animationError);
    });

    window.history.replaceState({}, '');
  }, [animateSearchElement, isNavigatingFromSearchPage, searchContainerScope]);

  const triggerSearchExitAnimation = useCallback(async () => {
    if (isAnimationInProgressRef.current) {
      return;
    }

    isAnimationInProgressRef.current = true;

    try {
      await animateSearchElement(
        searchContainerScope.current,
        TOP_VIEWPORT_POSITION,
        {
          duration: 0.3,
          ease: FAST_EASING_CURVE,
        }
      );
    } catch (animationError: unknown) {
      console.error('SEARCH EXIT ANIMATION FAILED:', animationError);
    } finally {
      isAnimationInProgressRef.current = false;
    }
  }, [animateSearchElement, searchContainerScope]);

  return {
    searchContainerScope,
    isAnimationInProgress: isAnimationInProgressRef.current,
    triggerSearchExitAnimation,
  };
}
