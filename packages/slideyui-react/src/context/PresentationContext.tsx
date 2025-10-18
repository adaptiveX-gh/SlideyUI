/**
 * PresentationContext
 * Manages presentation state for cards in full-screen mode
 * Replaces SlideContext with card-centric approach
 */

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { PresentationContextValue, SlideTheme } from '../types';

const PresentationContext = createContext<PresentationContextValue | undefined>(undefined);

export interface PresentationProviderProps {
  children: ReactNode;
  theme?: SlideTheme;
  initialCard?: number;
  totalCards: number;
  onCardChange?: (index: number) => void;
  enablePresenterMode?: boolean;
}

export function PresentationProvider({
  children,
  theme = 'minimal',
  initialCard = 0,
  totalCards,
  onCardChange,
  enablePresenterMode = false,
}: PresentationProviderProps) {
  const [currentCard, setCurrentCard] = useState(initialCard);
  const [presenterMode, setPresenterMode] = useState(enablePresenterMode);

  const goToCard = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalCards) {
        setCurrentCard(index);
        onCardChange?.(index);
      }
    },
    [totalCards, onCardChange]
  );

  const nextCard = useCallback(() => {
    goToCard(currentCard + 1);
  }, [currentCard, goToCard]);

  const previousCard = useCallback(() => {
    goToCard(currentCard - 1);
  }, [currentCard, goToCard]);

  const togglePresenterMode = useCallback(() => {
    setPresenterMode((prev) => !prev);
  }, []);

  const value: PresentationContextValue = {
    currentCard,
    totalCards,
    theme,
    goToCard,
    nextCard,
    previousCard,
    presenterMode,
    togglePresenterMode,
    isPresentationMode: true,
  };

  return (
    <PresentationContext.Provider value={value}>
      {children}
    </PresentationContext.Provider>
  );
}

/**
 * Hook to access presentation context
 */
export function usePresentationContext() {
  const context = useContext(PresentationContext);
  if (!context) {
    throw new Error('usePresentationContext must be used within PresentationProvider');
  }
  return context;
}

/**
 * Hook for keyboard navigation
 */
export function usePresentationKeyboard() {
  const { nextCard, previousCard, togglePresenterMode } = usePresentationContext();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ': // Space
        case 'PageDown':
          event.preventDefault();
          nextCard();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          event.preventDefault();
          previousCard();
          break;
        case 'p':
        case 'P':
          event.preventDefault();
          togglePresenterMode();
          break;
        case 'Home':
          event.preventDefault();
          // Go to first card - need to expose this
          break;
        case 'End':
          event.preventDefault();
          // Go to last card - need to expose this
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextCard, previousCard, togglePresenterMode]);
}
