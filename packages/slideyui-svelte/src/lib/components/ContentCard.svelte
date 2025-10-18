<script lang="ts">
	/**
	 * ContentCard Component
	 * Text-heavy presentation card with header, body, and footer sections
	 * Optimized for readability at presentation scale
	 */

	import CardContainer from './CardContainer.svelte';

	export let title: string | undefined = undefined;
	export let subtitle: string | undefined = undefined;
	export let variant: 'default' | 'featured' | 'minimal' = 'default';
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
	class="flex flex-col {className}"
>
	{#if title || subtitle}
		<div class="slide-card-header {variant === 'featured' ? 'bg-slidey-accent/10' : ''}">
			<div class="flex items-start justify-between gap-4">
				<div class="flex items-start gap-3 flex-1">
					<slot name="icon" />
					<div class="flex-1">
						{#if title}
							<h3
								class="slide-card-title {variant === 'minimal' ? 'text-2xl font-normal' : ''}"
							>
								{title}
							</h3>
						{/if}
						{#if subtitle}
							<p class="slide-card-description mt-1">{subtitle}</p>
						{/if}
					</div>
				</div>
				<slot name="badge" />
			</div>
		</div>
	{/if}

	<div class="slide-card-body flex-1 overflow-auto">
		<slot />
	</div>

	<slot name="footer">
		<!-- Default footer slot -->
	</slot>
</CardContainer>
