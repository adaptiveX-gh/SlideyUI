/**
 * AnalyticsContext - Context provider for tracking card analytics
 *
 * AI-First Design Philosophy:
 * - Simple, obvious API for AI agents to integrate analytics
 * - Local by default - no external dependencies required
 * - Extensible via onEvent callback for custom analytics services
 *
 * @example
 * ```tsx
 * // Basic usage - tracks locally
 * <AnalyticsProvider>
 *   <Presentation>
 *     <ContentCard>Content</ContentCard>
 *   </Presentation>
 * </AnalyticsProvider>
 *
 * // With custom analytics service
 * <AnalyticsProvider config={{
 *   enabled: true,
 *   dwellThreshold: 2000,
 *   onEvent: (event) => {
 *     // Send to your analytics service
 *     analytics.track(event.type, {
 *       cardId: event.cardId,
 *       ...event.metadata
 *     });
 *   }
 * }}>
 *   <Presentation>
 *     <ContentCard>Content</ContentCard>
 *   </Presentation>
 * </AnalyticsProvider>
 * ```
 */

import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import type {
  AnalyticsConfig,
  AnalyticsContextValue,
  AnalyticsEvent,
  CardMetrics,
} from '../types';

/**
 * Default analytics configuration
 */
const DEFAULT_CONFIG: AnalyticsConfig = {
  enabled: true,
  dwellThreshold: 1000,
};

/**
 * Default context value for when provider is not used
 */
const DEFAULT_CONTEXT_VALUE: AnalyticsContextValue = {
  config: DEFAULT_CONFIG,
  trackView: () => {},
  trackInteraction: () => {},
  trackDwell: () => {},
  getCardMetrics: () => ({ views: 0, interactions: 0, totalDwellTime: 0 }),
};

/**
 * Analytics context
 */
const AnalyticsContext = createContext<AnalyticsContextValue | undefined>(undefined);

/**
 * AnalyticsProvider props
 */
export interface AnalyticsProviderProps {
  /** Child components */
  children: ReactNode;
  /** Analytics configuration */
  config?: AnalyticsConfig;
}

/**
 * AnalyticsProvider - Provides analytics tracking functionality to child components
 *
 * Tracks three types of events:
 * - `view`: When a card becomes visible to the user
 * - `interaction`: User interactions (clicks, hovers, focus)
 * - `dwell`: Time spent viewing a card
 *
 * All tracking is local by default. Use the `onEvent` callback to integrate with
 * external analytics services (Google Analytics, Mixpanel, etc.)
 *
 * @example
 * ```tsx
 * // Local tracking only
 * <AnalyticsProvider>
 *   <App />
 * </AnalyticsProvider>
 *
 * // With external analytics
 * <AnalyticsProvider config={{
 *   enabled: true,
 *   dwellThreshold: 2000, // 2 seconds before counting as view
 *   onEvent: (event) => {
 *     gtag('event', event.type, {
 *       card_id: event.cardId,
 *       timestamp: event.timestamp,
 *     });
 *   }
 * }}>
 *   <App />
 * </AnalyticsProvider>
 * ```
 */
export function AnalyticsProvider({ children, config: userConfig }: AnalyticsProviderProps) {
  // Use useMemo to stabilize config reference
  const config: AnalyticsConfig = useMemo(
    () => ({ ...DEFAULT_CONFIG, ...userConfig }),
    [userConfig]
  );

  // Store metrics for each card: cardId -> CardMetrics
  const [metrics, setMetrics] = useState<Record<string, CardMetrics>>({});

  /**
   * Track when a card is viewed
   */
  const trackView = useCallback(
    (cardId: string, metadata?: Record<string, any>) => {
      if (!config.enabled) return;

      const event: AnalyticsEvent = {
        type: 'view',
        cardId,
        timestamp: Date.now(),
        metadata,
      };

      // Update internal metrics
      setMetrics((prev) => ({
        ...prev,
        [cardId]: {
          views: (prev[cardId]?.views ?? 0) + 1,
          interactions: prev[cardId]?.interactions ?? 0,
          totalDwellTime: prev[cardId]?.totalDwellTime ?? 0,
        },
      }));

      // Call external callback if provided
      config.onEvent?.(event);
    },
    [config]
  );

  /**
   * Track user interaction with a card
   */
  const trackInteraction = useCallback(
    (cardId: string, interactionType: string, metadata?: Record<string, any>) => {
      if (!config.enabled) return;

      const event: AnalyticsEvent = {
        type: 'interaction',
        cardId,
        timestamp: Date.now(),
        metadata: {
          ...metadata,
          interactionType,
        },
      };

      // Update internal metrics
      setMetrics((prev) => ({
        ...prev,
        [cardId]: {
          views: prev[cardId]?.views ?? 0,
          interactions: (prev[cardId]?.interactions ?? 0) + 1,
          totalDwellTime: prev[cardId]?.totalDwellTime ?? 0,
        },
      }));

      // Call external callback if provided
      config.onEvent?.(event);
    },
    [config]
  );

  /**
   * Track time spent viewing a card
   */
  const trackDwell = useCallback(
    (cardId: string, duration: number, metadata?: Record<string, any>) => {
      if (!config.enabled) return;

      const event: AnalyticsEvent = {
        type: 'dwell',
        cardId,
        timestamp: Date.now(),
        metadata: {
          ...metadata,
          duration,
        },
      };

      // Update internal metrics
      setMetrics((prev) => ({
        ...prev,
        [cardId]: {
          views: prev[cardId]?.views ?? 0,
          interactions: prev[cardId]?.interactions ?? 0,
          totalDwellTime: (prev[cardId]?.totalDwellTime ?? 0) + duration,
        },
      }));

      // Call external callback if provided
      config.onEvent?.(event);
    },
    [config]
  );

  /**
   * Get analytics metrics for a specific card
   */
  const getCardMetrics = useCallback(
    (cardId: string): CardMetrics => {
      return (
        metrics[cardId] ?? {
          views: 0,
          interactions: 0,
          totalDwellTime: 0,
        }
      );
    },
    [metrics]
  );

  const value: AnalyticsContextValue = {
    config,
    trackView,
    trackInteraction,
    trackDwell,
    getCardMetrics,
  };

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>;
}

/**
 * Hook to access analytics context
 *
 * Can be used with or without an AnalyticsProvider. When used without a provider,
 * analytics tracking will be disabled and the hook will return no-op functions.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { trackView, trackInteraction, getCardMetrics } = useAnalytics();
 *
 *   useEffect(() => {
 *     trackView('card-1');
 *   }, []);
 *
 *   return (
 *     <button onClick={() => trackInteraction('card-1', 'click')}>
 *       Click me
 *     </button>
 *   );
 * }
 * ```
 */
export function useAnalytics(): AnalyticsContextValue {
  const context = useContext(AnalyticsContext);

  if (!context) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        '[SlideyUI] useAnalytics called outside AnalyticsProvider. ' +
        'Analytics tracking is disabled. Wrap your app in <AnalyticsProvider> to enable tracking.'
      );
    }
    return DEFAULT_CONTEXT_VALUE;
  }

  return context;
}
