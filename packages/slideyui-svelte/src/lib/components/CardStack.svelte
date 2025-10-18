<script lang="ts">
	/**
	 * CardStack Component
	 * Layered/stacked card layout for presentation effects
	 * Useful for progressive disclosure in AI-generated content
	 *
	 * @example
	 * ```svelte
	 * <CardStack offset="md" expandOnHover>
	 *   <CardContainer>Card 1</CardContainer>
	 *   <CardContainer>Card 2</CardContainer>
	 *   <CardContainer>Card 3</CardContainer>
	 * </CardStack>
	 * ```
	 */

	import { onMount } from 'svelte';

	export let direction: 'horizontal' | 'vertical' = 'vertical';
	export let offset: 'sm' | 'md' | 'lg' = 'md';
	export let expandOnHover: boolean = false;

	let className: string = '';
	export { className as class };

	const offsetClasses: Record<string, { translate: string; zIndex: number }> = {
		sm: { translate: '4', zIndex: 10 },
		md: { translate: '8', zIndex: 10 },
		lg: { translate: '12', zIndex: 10 }
	};

	const offsetConfig = offsetClasses[offset];

	let containerEl: HTMLDivElement;
	let childCount = 0;

	onMount(() => {
		// Count direct children for z-index calculation
		if (containerEl) {
			childCount = containerEl.children.length;
		}
	});
</script>

<div
	bind:this={containerEl}
	class="relative {direction === 'horizontal' ? 'flex flex-row' : 'flex flex-col'} {expandOnHover
		? 'group'
		: ''} {className}"
	data-stack-direction={direction}
	data-stack-offset={offset}
>
	<slot />
</div>

<style>
	:global([data-stack-direction] > *) {
		transition: transform 300ms ease-in-out;
	}

	:global([data-stack-direction='vertical'] > *:not(:first-child)) {
		position: absolute;
	}

	:global([data-stack-direction='horizontal'] > *:not(:first-child)) {
		position: absolute;
	}

	/* Offset for vertical stacks */
	:global([data-stack-offset='sm'][data-stack-direction='vertical'] > *:not(:first-child)) {
		transform: translateY(1rem);
	}

	:global([data-stack-offset='md'][data-stack-direction='vertical'] > *:not(:first-child)) {
		transform: translateY(2rem);
	}

	:global([data-stack-offset='lg'][data-stack-direction='vertical'] > *:not(:first-child)) {
		transform: translateY(3rem);
	}

	/* Offset for horizontal stacks */
	:global([data-stack-offset='sm'][data-stack-direction='horizontal'] > *:not(:first-child)) {
		transform: translateX(1rem);
	}

	:global([data-stack-offset='md'][data-stack-direction='horizontal'] > *:not(:first-child)) {
		transform: translateX(2rem);
	}

	:global([data-stack-offset='lg'][data-stack-direction='horizontal'] > *:not(:first-child)) {
		transform: translateX(3rem);
	}

	/* Expand on hover - vertical */
	:global(.group[data-stack-direction='vertical']:hover > *:nth-child(2)) {
		transform: translateY(2rem);
	}

	:global(.group[data-stack-direction='vertical']:hover > *:nth-child(3)) {
		transform: translateY(4rem);
	}

	:global(.group[data-stack-direction='vertical']:hover > *:nth-child(4)) {
		transform: translateY(6rem);
	}

	/* Expand on hover - horizontal */
	:global(.group[data-stack-direction='horizontal']:hover > *:nth-child(2)) {
		transform: translateX(2rem);
	}

	:global(.group[data-stack-direction='horizontal']:hover > *:nth-child(3)) {
		transform: translateX(4rem);
	}

	:global(.group[data-stack-direction='horizontal']:hover > *:nth-child(4)) {
		transform: translateX(6rem);
	}
</style>
