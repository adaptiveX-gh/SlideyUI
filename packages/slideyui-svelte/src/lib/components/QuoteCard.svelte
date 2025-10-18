<script lang="ts">
	/**
	 * QuoteCard Component
	 * Pull quotes and testimonials card
	 * Presentation-optimized for impactful quotes
	 *
	 * @example
	 * ```svelte
	 * // Simple quote
	 * <QuoteCard
	 *   quote="This changed everything for our team."
	 *   author="Jane Doe"
	 *   source="CEO, Acme Corp"
	 * />
	 *
	 * // Testimonial with avatar
	 * <QuoteCard
	 *   variant="testimonial"
	 *   quote="The best presentation tool we've ever used."
	 *   author="John Smith"
	 *   source="Product Manager"
	 *   avatar="/avatars/john.jpg"
	 * />
	 * ```
	 */

	import CardContainer from './CardContainer.svelte';

	export let quote: string;
	export let author: string | undefined = undefined;
	export let source: string | undefined = undefined;
	export let avatar: string | undefined = undefined;
	export let variant: 'default' | 'large' | 'minimal' | 'testimonial' = 'default';
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
	class="flex flex-col justify-between p-8 {variant === 'large'
		? 'p-12'
		: ''} {variant === 'minimal' ? 'p-6 border-none shadow-none' : ''} {className}"
>
	<!-- Quote Mark (for non-minimal variants) -->
	{#if variant !== 'minimal'}
		<div class="text-6xl text-slidey-accent/20 leading-none mb-4">&ldquo;</div>
	{/if}

	<!-- Quote Text -->
	<div class="flex-1 mb-6">
		<blockquote
			class="text-slidey-foreground {variant === 'large'
				? 'text-3xl'
				: 'text-2xl'} {variant === 'minimal' ? 'italic border-l-4 border-slidey-accent pl-4' : ''}"
		>
			{quote}
		</blockquote>
	</div>

	<!-- Author Attribution -->
	{#if author || source || avatar}
		<div class="flex items-center gap-4 mt-auto">
			{#if avatar}
				<img src={avatar} alt={author || 'Author'} class="w-12 h-12 rounded-full object-cover" />
			{/if}
			<div>
				{#if author}
					<div
						class="font-semibold text-slidey-foreground {variant === 'large'
							? 'text-xl'
							: 'text-lg'}"
					>
						{author}
					</div>
				{/if}
				{#if source}
					<div class="text-sm text-slidey-muted-foreground">
						{source}
					</div>
				{/if}
			</div>
		</div>
	{/if}
</CardContainer>
