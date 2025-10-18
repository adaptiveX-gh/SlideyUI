/**
 * Analytics Actions - Svelte actions for tracking card analytics
 *
 * These actions make it easy to add analytics tracking to any element
 * using Svelte's use:action directive.
 *
 * @example
 * ```svelte
 * <script>
 *   import { setAnalyticsContext } from '@slideyui/svelte/stores';
 *   import { cardView, cardInteraction } from '@slideyui/svelte/actions';
 *
 *   setAnalyticsContext();
 * </script>
 *
 * <div use:cardView={{ cardId: 'card-1' }} use:cardInteraction={'card-1'}>
 *   Card content
 * </div>
 * ```
 */

import { getAnalyticsContext } from '../stores/analytics';

/**
 * Options for cardView action
 */
export interface CardViewOptions {
	/** Unique identifier for the card */
	cardId: string;
	/** Time in ms before tracking a view (default: 1500) */
	threshold?: number;
}

/**
 * Action to track when a card becomes visible
 *
 * Uses IntersectionObserver to detect when the element enters the viewport.
 * Tracks a view after the element has been visible for the threshold duration.
 *
 * @param node - The DOM element to observe
 * @param options - Configuration options
 *
 * @example
 * ```svelte
 * <div use:cardView={{ cardId: 'my-card', threshold: 2000 }}>
 *   Card content
 * </div>
 * ```
 */
export function cardView(node: HTMLElement, options: CardViewOptions) {
	const analytics = getAnalyticsContext();
	if (!analytics) return {};

	let hasTracked = false;
	let timer: ReturnType<typeof setTimeout> | null = null;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting && !hasTracked) {
					const threshold = options.threshold ?? 1500;
					timer = setTimeout(() => {
						analytics.trackView(options.cardId);
						hasTracked = true;
					}, threshold);
				} else if (!entry.isIntersecting && timer) {
					clearTimeout(timer);
					timer = null;
				}
			});
		},
		{ threshold: 0.5 }
	);

	observer.observe(node);

	return {
		update(newOptions: CardViewOptions) {
			// Update options if needed
			options = newOptions;
		},
		destroy() {
			observer.disconnect();
			if (timer) clearTimeout(timer);
		}
	};
}

/**
 * Action to track dwell time on a card
 *
 * Tracks the total time the element exists in the DOM. When the element
 * is destroyed, it reports the total dwell time.
 *
 * @param node - The DOM element to track
 * @param cardId - Unique identifier for the card
 *
 * @example
 * ```svelte
 * <div use:cardDwell={'my-card'}>
 *   Card content
 * </div>
 * ```
 */
export function cardDwell(node: HTMLElement, cardId: string) {
	const analytics = getAnalyticsContext();
	if (!analytics) return {};

	const startTime = Date.now();

	return {
		update(newCardId: string) {
			cardId = newCardId;
		},
		destroy() {
			const dwellTime = Date.now() - startTime;
			if (dwellTime > 0) {
				analytics.trackDwell(cardId, dwellTime);
			}
		}
	};
}

/**
 * Action to track interactions with a card
 *
 * Tracks click and hover events on the element.
 *
 * @param node - The DOM element to track
 * @param cardId - Unique identifier for the card
 *
 * @example
 * ```svelte
 * <div use:cardInteraction={'my-card'}>
 *   Card content
 * </div>
 * ```
 */
export function cardInteraction(node: HTMLElement, cardId: string) {
	const analytics = getAnalyticsContext();
	if (!analytics) return {};

	function handleClick() {
		analytics.trackInteraction(cardId, 'click');
	}

	function handleHover() {
		analytics.trackInteraction(cardId, 'hover');
	}

	node.addEventListener('click', handleClick);
	node.addEventListener('mouseenter', handleHover);

	return {
		update(newCardId: string) {
			cardId = newCardId;
		},
		destroy() {
			node.removeEventListener('click', handleClick);
			node.removeEventListener('mouseenter', handleHover);
		}
	};
}
