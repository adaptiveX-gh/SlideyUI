/**
 * Presentation Component
 * Wrapper for full-screen card presentations
 * Replaces Deck with modern card-centric approach
 */

import { Children, ReactElement, cloneElement, isValidElement } from 'react';
import { PresentationProps } from '../types';
import { PresentationProvider, usePresentationKeyboard } from '../context/PresentationContext';
import clsx from 'clsx';

/**
 * Progress indicator component
 */
function PresentationProgress({ position = 'bottom' }: { position?: 'top' | 'bottom' }) {
  const { currentCard, totalCards } = usePresentationContext();
  const progress = totalCards > 0 ? ((currentCard + 1) / totalCards) * 100 : 0;

  return (
    <div
      className={clsx(
        'slide-progress fixed left-0 right-0 z-50',
        position === 'top' ? 'top-0' : 'bottom-0'
      )}
    >
      <div className="slide-progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
}

/**
 * Card number indicator
 */
function PresentationNumber({ position = 'bottom-right' }: { position?: string }) {
  const { currentCard, totalCards } = usePresentationContext();

  const positionClasses: Record<string, string> = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
  };

  return (
    <div className={clsx('slide-number fixed z-50', positionClasses[position])}>
      {currentCard + 1} / {totalCards}
    </div>
  );
}

/**
 * Presentation controls overlay
 */
function PresentationControls() {
  const { currentCard, totalCards, nextCard, previousCard, presenterMode } =
    usePresentationContext();

  if (!presenterMode) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-4 bg-base-100/95 backdrop-blur rounded-full px-6 py-3 shadow-xl border border-base-300">
        <button
          onClick={previousCard}
          disabled={currentCard === 0}
          className="btn btn-circle btn-sm btn-ghost"
          aria-label="Previous card"
        >
          ←
        </button>

        <div className="text-sm font-medium">
          {currentCard + 1} / {totalCards}
        </div>

        <button
          onClick={nextCard}
          disabled={currentCard >= totalCards - 1}
          className="btn btn-circle btn-sm btn-ghost"
          aria-label="Next card"
        >
          →
        </button>
      </div>
    </div>
  );
}

/**
 * Internal presentation view component
 */
function PresentationView({
  children,
  theme = 'minimal',
  className = '',
  showProgress = false,
  progressPosition = 'bottom',
  showCardNumbers = false,
  cardNumberPosition = 'bottom-right',
}: Omit<PresentationProps, 'initialCard' | 'onCardChange' | 'enableKeyboard' | 'presenterMode'>) {
  const { currentCard } = usePresentationContext();

  // Enable keyboard navigation
  usePresentationKeyboard();

  // Convert children to array
  const cards = Children.toArray(children).filter(isValidElement);

  // Get current card
  const currentCardElement = cards[currentCard];

  return (
    <div
      className={clsx(
        'presentation-container',
        'fixed inset-0 w-screen h-screen overflow-hidden',
        `theme-${theme}`,
        className
      )}
      data-theme={theme}
    >
      {/* Full-screen card */}
      <div className="w-full h-full flex items-center justify-center p-8">
        {currentCardElement &&
          cloneElement(currentCardElement as ReactElement, {
            // Force full mode for presentation
            mode: 'full',
            aspectRatio: '16/9',
            className: clsx(
              (currentCardElement as ReactElement).props.className,
              'w-full max-w-[90vw] max-h-[90vh]'
            ),
          })}
      </div>

      {/* Progress indicator */}
      {showProgress && <PresentationProgress position={progressPosition} />}

      {/* Card numbers */}
      {showCardNumbers && <PresentationNumber position={cardNumberPosition} />}

      {/* Presenter controls */}
      <PresentationControls />
    </div>
  );
}

/**
 * Full-screen card presentation wrapper
 *
 * @example
 * ```tsx
 * <Presentation theme="corporate" showProgress>
 *   <ContentCard title="Welcome">
 *     <p>First card</p>
 *   </ContentCard>
 *   <DataCard title="Metrics">
 *     <Chart />
 *   </DataCard>
 * </Presentation>
 * ```
 */
export function Presentation({
  children,
  theme = 'minimal',
  initialCard = 0,
  enableKeyboard = true,
  onCardChange,
  presenterMode = false,
  ...viewProps
}: PresentationProps) {
  const cards = Children.toArray(children);
  const totalCards = cards.length;

  return (
    <PresentationProvider
      theme={theme}
      initialCard={initialCard}
      totalCards={totalCards}
      onCardChange={onCardChange}
      enablePresenterMode={presenterMode}
    >
      <PresentationView theme={theme} {...viewProps}>
        {children}
      </PresentationView>
    </PresentationProvider>
  );
}

// Re-export context hook
import { usePresentationContext } from '../context/PresentationContext';
export { usePresentationContext };
