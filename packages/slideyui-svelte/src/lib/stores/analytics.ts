/**
 * Analytics Store - Svelte store-based analytics tracking for card interactions
 *
 * AI-First Design Philosophy:
 * - Simple, obvious API for AI agents to integrate analytics
 * - Local by default - no external dependencies required
 * - Extensible via onEvent callback for custom analytics services
 *
 * @example
 * ```svelte
 * <script>
 *   import { setAnalyticsContext } from '@slideyui/svelte';
 *
 *   // Basic usage - tracks locally
 *   setAnalyticsContext();
 * </script>
 *
 * <Presentation>
 *   <ContentCard>Content</ContentCard>
 * </Presentation>
 * ```
 *
 * @example
 * ```svelte
 * <script>
 *   import { setAnalyticsContext } from '@slideyui/svelte';
 *
 *   // With custom analytics service
 *   setAnalyticsContext({
 *     enabled: true,
 *     dwellThreshold: 2000,
 *     onEvent: (event) => {
 *       // Send to your analytics service
 *       analytics.track(event.type, {
 *         cardId: event.cardId,
 *         ...event.metadata
 *       });
 *     }
 *   });
 * </script>
 * ```
 */

import { writable, get } from 'svelte/store';
import { getContext, setContext } from 'svelte';

const ANALYTICS_KEY = Symbol('analytics');

/**
 * Analytics event types for tracking card interactions
 */
export interface AnalyticsEvent {
	/** Type of analytics event */
	type: 'view' | 'interaction' | 'dwell';
	/** Unique identifier for the card */
	cardId: string;
	/** Timestamp when event occurred */
	timestamp: number;
	/** Optional metadata about the event */
	metadata?: Record<string, any>;
}

/**
 * Configuration for analytics tracking
 */
export interface AnalyticsConfig {
	/** Whether analytics tracking is enabled (default: true) */
	enabled?: boolean;
	/** Minimum time in ms before a view is counted (default: 1000) */
	dwellThreshold?: number;
	/** Callback function to handle analytics events */
	onEvent?: (event: AnalyticsEvent) => void;
}

/**
 * Card metrics tracked by analytics
 */
export interface CardMetrics {
	/** Number of times the card has been viewed */
	views: number;
	/** Number of interactions (clicks, hovers, etc.) */
	interactions: number;
	/** Total time spent viewing the card in milliseconds */
	totalDwellTime: number;
}

/**
 * Default analytics configuration
 */
const DEFAULT_CONFIG: AnalyticsConfig = {
	enabled: true,
	dwellThreshold: 1000
};

/**
 * Create an analytics store for tracking card interactions
 *
 * Tracks three types of events:
 * - `view`: When a card becomes visible to the user
 * - `interaction`: User interactions (clicks, hovers, focus)
 * - `dwell`: Time spent viewing a card
 *
 * All tracking is local by default. Use the `onEvent` callback to integrate with
 * external analytics services (Google Analytics, Mixpanel, etc.)
 *
 * @param userConfig - Analytics configuration options
 * @returns Analytics store with tracking methods
 */
export function createAnalyticsStore(userConfig: AnalyticsConfig = {}) {
	const config = { ...DEFAULT_CONFIG, ...userConfig };
	const metrics = writable<Map<string, CardMetrics>>(new Map());

	/**
	 * Track when a card is viewed
	 */
	function trackView(cardId: string, metadata?: Record<string, any>) {
		if (!config.enabled) return;

		metrics.update((m) => {
			const current = m.get(cardId) || { views: 0, interactions: 0, totalDwellTime: 0 };
			m.set(cardId, { ...current, views: current.views + 1 });
			return m;
		});

		config.onEvent?.({
			type: 'view',
			cardId,
			timestamp: Date.now(),
			metadata
		});
	}

	/**
	 * Track user interaction with a card
	 */
	function trackInteraction(
		cardId: string,
		interactionType: string,
		metadata?: Record<string, any>
	) {
		if (!config.enabled) return;

		metrics.update((m) => {
			const current = m.get(cardId) || { views: 0, interactions: 0, totalDwellTime: 0 };
			m.set(cardId, { ...current, interactions: current.interactions + 1 });
			return m;
		});

		config.onEvent?.({
			type: 'interaction',
			cardId,
			timestamp: Date.now(),
			metadata: { interactionType, ...metadata }
		});
	}

	/**
	 * Track time spent viewing a card
	 */
	function trackDwell(cardId: string, duration: number, metadata?: Record<string, any>) {
		if (!config.enabled) return;

		metrics.update((m) => {
			const current = m.get(cardId) || { views: 0, interactions: 0, totalDwellTime: 0 };
			m.set(cardId, { ...current, totalDwellTime: current.totalDwellTime + duration });
			return m;
		});

		config.onEvent?.({
			type: 'dwell',
			cardId,
			timestamp: Date.now(),
			metadata: { duration, ...metadata }
		});
	}

	/**
	 * Get analytics metrics for a specific card
	 */
	function getCardMetrics(cardId: string): CardMetrics {
		const m = get(metrics);
		return m.get(cardId) || { views: 0, interactions: 0, totalDwellTime: 0 };
	}

	return {
		subscribe: metrics.subscribe,
		trackView,
		trackInteraction,
		trackDwell,
		getCardMetrics,
		config
	};
}

/**
 * Set analytics context for child components to access
 *
 * Call this in a parent component's <script> section to enable analytics
 * tracking for all descendant components.
 *
 * @param config - Analytics configuration options
 * @returns Analytics store instance
 *
 * @example
 * ```svelte
 * <script>
 *   import { setAnalyticsContext } from '@slideyui/svelte';
 *
 *   setAnalyticsContext({
 *     enabled: true,
 *     dwellThreshold: 1500,
 *     onEvent: (event) => {
 *       console.log('Analytics event:', event);
 *     }
 *   });
 * </script>
 * ```
 */
export function setAnalyticsContext(config: AnalyticsConfig = {}) {
	const analytics = createAnalyticsStore(config);
	setContext(ANALYTICS_KEY, analytics);
	return analytics;
}

/**
 * Get analytics context from parent component
 *
 * Use this hook to access analytics tracking methods in child components.
 * Returns undefined if no analytics context has been set.
 *
 * @returns Analytics store instance or undefined
 *
 * @example
 * ```svelte
 * <script>
 *   import { getAnalyticsContext } from '@slideyui/svelte';
 *
 *   const analytics = getAnalyticsContext();
 *
 *   function handleClick() {
 *     analytics?.trackInteraction('my-card', 'click');
 *   }
 * </script>
 * ```
 */
export function getAnalyticsContext() {
	const context = getContext<ReturnType<typeof createAnalyticsStore>>(ANALYTICS_KEY);
	if (!context) {
		console.warn(
			'[SlideyUI] Analytics not available. Wrap app in component with setAnalyticsContext.'
		);
	}
	return context;
}
