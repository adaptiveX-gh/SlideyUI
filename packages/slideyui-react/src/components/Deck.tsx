/**
 * Deck Component
 * Main presentation wrapper that manages slide state and navigation
 */

import { Children, ReactElement, cloneElement } from 'react';
import clsx from 'clsx';
import { SlideProvider } from '../context/SlideContext';
import { useSlideNavigation } from '../hooks/useSlideNavigation';
import { DeckProps } from '../types';
import { SlideProgress } from './SlideProgress';
import { SlideNumber } from './SlideNumber';

/**
 * Main presentation deck wrapper component
 *
 * @example
 * ```tsx
 * <Deck theme="ocean" showProgress showSlideNumbers>
 *   <TitleSlide title="My Presentation" />
 *   <ContentSlide title="Slide 1">Content here</ContentSlide>
 *   <ContentSlide title="Slide 2">More content</ContentSlide>
 * </Deck>
 * ```
 */
export function Deck({
  theme = 'ocean',
  children,
  className,
  initialSlide = 0,
  enableKeyboard = true,
  showProgress = false,
  progressPosition = 'top',
  showSlideNumbers = false,
  slideNumberPosition = 'bottom-right',
  onSlideChange,
}: DeckProps) {
  return (
    <SlideProvider theme={theme} initialSlide={initialSlide} onSlideChange={onSlideChange}>
      <DeckContent
        theme={theme}
        className={className}
        enableKeyboard={enableKeyboard}
        showProgress={showProgress}
        progressPosition={progressPosition}
        showSlideNumbers={showSlideNumbers}
        slideNumberPosition={slideNumberPosition}
      >
        {children}
      </DeckContent>
    </SlideProvider>
  );
}

interface DeckContentProps {
  theme: string;
  children: React.ReactNode;
  className?: string;
  enableKeyboard: boolean;
  showProgress: boolean;
  progressPosition: 'top' | 'bottom';
  showSlideNumbers: boolean;
  slideNumberPosition: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

function DeckContent({
  theme,
  children,
  className,
  enableKeyboard,
  showProgress,
  progressPosition,
  showSlideNumbers,
  slideNumberPosition,
}: DeckContentProps) {
  useSlideNavigation({ enabled: enableKeyboard });

  return (
    <div
      className={clsx(
        'slide-deck',
        `slide-theme-${theme}`,
        'relative w-full h-screen overflow-hidden',
        className
      )}
      data-theme={theme}
    >
      {showProgress && <SlideProgress position={progressPosition} />}

      <div className="slide-container w-full h-full">
        <SlideRenderer>{children}</SlideRenderer>
      </div>

      {showSlideNumbers && <SlideNumber position={slideNumberPosition} />}
    </div>
  );
}

interface SlideRendererProps {
  children: React.ReactNode;
}

function SlideRenderer({ children }: SlideRendererProps) {
  // Import hook inside component that has context
  const { useSlideContext: useContext } = require('../hooks/useSlideContext');
  const { currentSlide, registerSlide } = useContext();

  const slides = Children.toArray(children);

  return (
    <>
      {slides.map((slide, index) => {
        // Register each slide
        if (index === 0) {
          // Use effect equivalent for registration
          const slideIndex = registerSlide();
          return cloneElement(slide as ReactElement, {
            key: index,
            'data-slide-index': slideIndex,
            style: {
              display: index === currentSlide ? 'block' : 'none',
            },
          });
        }

        return cloneElement(slide as ReactElement, {
          key: index,
          'data-slide-index': index,
          style: {
            display: index === currentSlide ? 'block' : 'none',
          },
        });
      })}
    </>
  );
}
