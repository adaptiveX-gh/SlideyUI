<script lang="ts">
	/**
	 * CollapsibleSection Component
	 * Expandable content area with keyboard accessibility
	 * Perfect for FAQs, progressive disclosure, and nested content hierarchies
	 */

	import { slide } from 'svelte/transition';

	export let title: string;
	export let defaultOpen: boolean = false;
	export let id: string | undefined = undefined;
	export let onToggle: ((open: boolean) => void) | undefined = undefined;

	let className: string = '';
	export { className as class };

	let isOpen = defaultOpen;

	/**
	 * Collapsible section for expandable content areas
	 *
	 * Features:
	 * - Keyboard accessible (Enter/Space to toggle)
	 * - Deep linking support via id prop
	 * - Smooth expand/collapse animations
	 * - ARIA attributes for screen readers
	 * - onToggle callback for state tracking
	 *
	 * @example
	 * ```svelte
	 * // Simple FAQ
	 * <ContentCard title="Frequently Asked Questions">
	 *   <CollapsibleSection title="What is SlideyUI?" defaultOpen>
	 *     <p>SlideyUI is a card-first UI system for AI-generated presentations...</p>
	 *   </CollapsibleSection>
	 *   <CollapsibleSection title="How do I embed media?">
	 *     <p>Use the MediaCard or EmbedCard components with provider...</p>
	 *   </CollapsibleSection>
	 * </ContentCard>
	 * ```
	 *
	 * @example
	 * ```svelte
	 * // With deep linking and state tracking
	 * <CollapsibleSection
	 *   title="Advanced Configuration"
	 *   id="advanced-config"
	 *   defaultOpen={false}
	 *   onToggle={(isOpen) => console.log('Section toggled:', isOpen)}
	 * >
	 *   <p>Advanced settings and options...</p>
	 * </CollapsibleSection>
	 * ```
	 *
	 * @example
	 * ```svelte
	 * // Nested collapsible sections
	 * <CollapsibleSection title="API Reference">
	 *   <p>Our API has three main categories:</p>
	 *   <CollapsibleSection title="Authentication">
	 *     <p>Auth endpoints...</p>
	 *   </CollapsibleSection>
	 *   <CollapsibleSection title="Data">
	 *     <p>Data endpoints...</p>
	 *   </CollapsibleSection>
	 * </CollapsibleSection>
	 * ```
	 */

	function handleToggle() {
		isOpen = !isOpen;
		onToggle?.(isOpen);
	}

	function handleKeyDown(event: KeyboardEvent) {
		// Toggle on Enter or Space
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleToggle();
		}
	}

	$: contentId = id ? `${id}-content` : undefined;
</script>

<div class="slide-collapsible {className}">
	<!-- Trigger Button -->
	<button
		type="button"
		class="slide-collapsible-trigger"
		on:click={handleToggle}
		on:keydown={handleKeyDown}
		aria-expanded={isOpen}
		aria-controls={contentId}
	>
		{title}
	</button>

	<!-- Content Area -->
	{#if isOpen}
		<div
			{...contentId ? { id: contentId } : {}}
			class="slide-collapsible-content"
			data-state="open"
			transition:slide
		>
			<div class="slide-collapsible-body">
				<slot />
			</div>
		</div>
	{/if}
</div>
