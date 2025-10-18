/**
 * Slide Context Provider
 * Manages slide state and navigation for the entire deck
 */

import { createContext, ReactNode, useCallback, useRef, useState } from 'react';
import { SlideContextValue, SlideTheme } from '../types';

export const SlideContext = createContext<SlideContextValue | null>(null);

interface SlideProviderProps {
  children: ReactNode;
  theme: SlideTheme;
  initialSlide?: number;
  onSlideChange?: (slideIndex: number) => void;
}

export function SlideProvider({
  children,
  theme,
  initialSlide = 0,
  onSlideChange,
}: SlideProviderProps) {
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const [presenterMode, setPresenterMode] = useState(false);
  const slideCountRef = useRef(0);

  const goToSlide = useCallback(
    (index: number) => {
      const newIndex = Math.max(0, Math.min(index, slideCountRef.current - 1));
      setCurrentSlide(newIndex);
      onSlideChange?.(newIndex);
    },
    [onSlideChange]
  );

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  const previousSlide = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  const togglePresenterMode = useCallback(() => {
    setPresenterMode((prev) => !prev);
  }, []);

  const registerSlide = useCallback(() => {
    const slideIndex = slideCountRef.current;
    slideCountRef.current += 1;
    return slideIndex;
  }, []);

  const unregisterSlide = useCallback(() => {
    slideCountRef.current = Math.max(0, slideCountRef.current - 1);
  }, []);

  const value: SlideContextValue = {
    currentSlide,
    totalSlides: slideCountRef.current,
    theme,
    goToSlide,
    nextSlide,
    previousSlide,
    presenterMode,
    togglePresenterMode,
    registerSlide,
    unregisterSlide,
  };

  return <SlideContext.Provider value={value}>{children}</SlideContext.Provider>;
}
