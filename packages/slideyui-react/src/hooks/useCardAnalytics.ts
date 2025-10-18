/**
 * Card Analytics Hooks
 *
 * AI-First hooks for tracking card visibility, dwell time, and user interactions.
 * These hooks work seamlessly with the AnalyticsProvider to automatically track
 * card metrics without requiring manual instrumentation.
 *
 * @example
 * ```tsx
 * function MyCard({ id }: { id: string }) {
 *   // Track when card is visible
 *   const { isVisible, viewCount } = useCardView(id, { threshold: 1500 });
 *
 *   // Track time spent on card
 *   const { dwellTime } = useCardDwell(id);
 *
 *   // Track user interactions
 *   const { trackClick, trackHover, trackFocus, interactionCount } = useCardInteraction(id);
 *
 *   return (
 *     <ContentCard
 *       onClick={trackClick}
 *       onMouseEnter={trackHover}
 *       onFocus={trackFocus}
 *     >
 *       <p>Visible: {isVisible ? 'Yes' : 'No'}</p>
 *       <p>Views: {viewCount}</p>
 *       <p>Dwell time: {dwellTime}ms</p>
 *       <p>Interactions: {interactionCount}</p>
 *     </ContentCard>
 *   );
 * }
 * ```
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { useAnalytics } from '../context/AnalyticsContext';

/**
 * Options for useCardView hook
 */
export interface UseCardViewOptions {
  /** Time in ms card must be visible before counting as a view (default: from AnalyticsConfig) */
  threshold?: number;
}

/**
 * Hook to track when a card is visible to the user
 *
 * Uses IntersectionObserver to detect when a card enters the viewport.
 * Only counts as a "view" after the card has been visible for the threshold duration.
 *
 * @param cardId - Unique identifier for the card
 * @param options - Configuration options
 * @returns Object with isVisible state and viewCount
 *
 * @example
 * ```tsx
 * function MyCard({ id }: { id: string }) {
 *   const cardRef = useRef<HTMLDivElement>(null);
 *   const { isVisible, viewCount } = useCardView(id, { threshold: 2000 });
 *
 *   return (
 *     <div ref={cardRef}>
 *       Card is {isVisible ? 'visible' : 'hidden'}
 *       Views: {viewCount}
 *     </div>
 *   );
 * }
 * ```
 */
export function useCardView(cardId: string, options: UseCardViewOptions = {}) {
  const { trackView, getCardMetrics, config } = useAnalytics();
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<Element | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasTrackedRef = useRef(false);

  const threshold = options.threshold ?? config.dwellThreshold ?? 1000;

  useEffect(() => {
    // Find element with data-card-id attribute
    const element = document.querySelector(`[data-card-id="${cardId}"]`);
    if (!element) return;

    elementRef.current = element;
    hasTrackedRef.current = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);

        if (entry.isIntersecting && !hasTrackedRef.current) {
          // Card became visible - start threshold timer
          timeoutRef.current = setTimeout(() => {
            trackView(cardId, {
              viewportRatio: entry.intersectionRatio,
            });
            hasTrackedRef.current = true;
          }, threshold);
        } else if (!entry.isIntersecting && timeoutRef.current) {
          // Card became hidden - clear threshold timer if not yet tracked
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      },
      {
        threshold: 0.5, // Card must be at least 50% visible
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [cardId, trackView, threshold]);

  const metrics = getCardMetrics(cardId);

  return {
    /** Whether the card is currently visible */
    isVisible,
    /** Total number of times the card has been viewed */
    viewCount: metrics.views,
  };
}

/**
 * Return type for useCardDwell hook
 */
export interface CardDwellResult {
  /** Current dwell time in milliseconds */
  dwellTime: number;
  /** Total dwell time across all sessions in milliseconds */
  totalDwellTime: number;
}

/**
 * Hook to track time spent viewing a card
 *
 * Automatically tracks the duration a card is in focus or visible.
 * Reports dwell time when the component unmounts or loses focus.
 *
 * @param cardId - Unique identifier for the card
 * @param updateInterval - How often to update dwell time in ms (default: 1000ms)
 * @returns Object with current dwellTime
 *
 * @example
 * ```tsx
 * function MyCard({ id }: { id: string }) {
 *   // Default: updates every 1 second
 *   const { dwellTime } = useCardDwell(id);
 *
 *   // Custom: updates every 500ms for more precision
 *   const { dwellTime } = useCardDwell(id, 500);
 *
 *   return (
 *     <div>
 *       Time spent: {Math.round(dwellTime / 1000)}s
 *     </div>
 *   );
 * }
 * ```
 */
export function useCardDwell(
  cardId: string,
  updateInterval: number = 1000
): CardDwellResult {
  const { trackDwell, getCardMetrics } = useAnalytics();
  const [dwellTime, setDwellTime] = useState(0);
  const startTimeRef = useRef<number>(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startTimeRef.current = Date.now();

    // Update dwell time at configurable interval
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      setDwellTime(elapsed);
    }, updateInterval);

    return () => {
      // Track final dwell time on unmount
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      const finalDwellTime = Date.now() - startTimeRef.current;
      if (finalDwellTime > 0) {
        trackDwell(cardId, finalDwellTime);
      }
    };
  }, [cardId, trackDwell, updateInterval]);

  const metrics = getCardMetrics(cardId);

  return {
    dwellTime,
    totalDwellTime: metrics.totalDwellTime,
  };
}

/**
 * Hook to track user interactions with a card
 *
 * Provides helper functions to track different interaction types (click, hover, focus).
 * Each interaction is counted and can be retrieved via getCardMetrics.
 *
 * @param cardId - Unique identifier for the card
 * @returns Object with track functions and interaction count
 *
 * @example
 * ```tsx
 * function MyCard({ id }: { id: string }) {
 *   const { trackClick, trackHover, trackFocus, interactionCount } = useCardInteraction(id);
 *
 *   return (
 *     <button
 *       onClick={trackClick}
 *       onMouseEnter={trackHover}
 *       onFocus={trackFocus}
 *     >
 *       Interactions: {interactionCount}
 *     </button>
 *   );
 * }
 * ```
 */
export function useCardInteraction(cardId: string) {
  const { trackInteraction, getCardMetrics } = useAnalytics();

  /**
   * Track click interaction
   */
  const trackClick = useCallback(
    (metadata?: Record<string, any>) => {
      trackInteraction(cardId, 'click', metadata);
    },
    [cardId, trackInteraction]
  );

  /**
   * Track hover interaction
   */
  const trackHover = useCallback(
    (metadata?: Record<string, any>) => {
      trackInteraction(cardId, 'hover', metadata);
    },
    [cardId, trackInteraction]
  );

  /**
   * Track focus interaction
   */
  const trackFocus = useCallback(
    (metadata?: Record<string, any>) => {
      trackInteraction(cardId, 'focus', metadata);
    },
    [cardId, trackInteraction]
  );

  /**
   * Track custom interaction
   */
  const trackCustom = useCallback(
    (interactionType: string, metadata?: Record<string, any>) => {
      trackInteraction(cardId, interactionType, metadata);
    },
    [cardId, trackInteraction]
  );

  const metrics = getCardMetrics(cardId);

  return {
    /** Track click interaction */
    trackClick,
    /** Track hover interaction */
    trackHover,
    /** Track focus interaction */
    trackFocus,
    /** Track custom interaction type */
    trackCustom,
    /** Total number of interactions */
    interactionCount: metrics.interactions,
  };
}
