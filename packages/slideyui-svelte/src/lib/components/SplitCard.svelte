<script lang="ts">
	/**
	 * SplitCard Component
	 * Two-column presentation card with flexible split ratios
	 * Perfect for before/after, comparison, or image+text layouts
	 *
	 * @example
	 * ```svelte
	 * // Image + Text layout
	 * <SplitCard split={40}>
	 *   <img slot="left" src="/image.jpg" alt="Product" class="w-full h-full object-cover" />
	 *   <div slot="right" class="p-6">
	 *     <h3 class="text-2xl">Product Name</h3>
	 *     <p>Description...</p>
	 *   </div>
	 * </SplitCard>
	 *
	 * // Comparison with divider
	 * <SplitCard divider>
	 *   <div slot="left" class="p-6">Before</div>
	 *   <div slot="right" class="p-6">After</div>
	 * </SplitCard>
	 * ```
	 */

	import CardContainer from './CardContainer.svelte';

	export let split: 30 | 40 | 50 | 60 | 70 = 50;
	export let direction: 'horizontal' | 'vertical' = 'horizontal';
	export let divider: boolean = false;
	export let reverse: boolean = false;
	export let aspectRatio: '16/9' | '4/3' | '1/1' | '3/2' | 'auto' = '16/9';
	export let mode: 'preview' | 'thumbnail' | 'full' = 'preview';
	export let bordered: boolean = true;
	export let shadow: boolean = true;
	export let interactive: boolean = false;
	export let backgroundColor: string | undefined = undefined;
	export let backgroundImage: string | undefined = undefined;
	export let cardId: string | undefined = undefined;
	export let cardState: 'generating' | 'selected' | 'error' | 'complete' | undefined = undefined;

	let className: string = '';
	export { className as class };

	const splitRatioStyles: Record<number, string> = {
		30: 'grid-cols-[30%_70%]',
		40: 'grid-cols-[40%_60%]',
		50: 'grid-cols-2',
		60: 'grid-cols-[60%_40%]',
		70: 'grid-cols-[70%_30%]'
	};

	$$restProps; // Allow passing through other props
</script>

<CardContainer
	{aspectRatio}
	{mode}
	{bordered}
	{shadow}
	{interactive}
	{backgroundColor}
	{backgroundImage}
	{cardId}
	{cardState}
	class="overflow-hidden {className}"
>
	<div
		class="grid h-full {direction === 'horizontal'
			? splitRatioStyles[split]
			: direction === 'vertical' && split === 50
				? 'grid-rows-2'
				: 'grid-rows-1'}"
	>
		{#if !reverse}
			<!-- Left/Top Section -->
			<div
				class="relative {divider && direction === 'horizontal'
					? 'border-r border-slidey-border'
					: ''} {divider && direction === 'vertical' ? 'border-b border-slidey-border' : ''}"
			>
				<slot name="left" />
			</div>

			<!-- Right/Bottom Section -->
			<div class="relative">
				<slot name="right" />
			</div>
		{:else}
			<!-- Right/Bottom Section (reversed) -->
			<div
				class="relative {divider && direction === 'horizontal'
					? 'border-r border-slidey-border'
					: ''} {divider && direction === 'vertical' ? 'border-b border-slidey-border' : ''}"
			>
				<slot name="right" />
			</div>

			<!-- Left/Top Section (reversed) -->
			<div class="relative">
				<slot name="left" />
			</div>
		{/if}
	</div>
</CardContainer>
