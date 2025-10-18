<script lang="ts">
	/**
	 * MediaCard Component
	 * Image and video-focused presentation card
	 */

	import CardContainer from './CardContainer.svelte';

	export let src: string | undefined = undefined;
	export let alt: string = '';
	export let title: string | undefined = undefined;
	export let caption: string | undefined = undefined;
	export let asBackground: boolean = false;
	export let aspectRatio: '16/9' | '4/3' | '1/1' | '3/2' | 'auto' = '16/9';
	export let mode: 'preview' | 'thumbnail' | 'full' = 'preview';
	export let bordered: boolean = true;
	export let shadow: boolean = true;
	export let interactive: boolean = false;
	export let cardId: string | undefined = undefined;
	export let cardState: 'generating' | 'selected' | 'error' | 'complete' | undefined = undefined;

	let className: string = '';
	export { className as class };
</script>

{#if asBackground}
	<CardContainer
		{aspectRatio}
		{mode}
		{bordered}
		{shadow}
		{interactive}
		{cardId}
		{cardState}
		backgroundImage={src}
		class="relative {className}"
	>
		<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
		<div class="relative z-10 p-8 flex flex-col justify-end h-full">
			{#if title}
				<h3 class="text-2xl font-bold mb-2 text-white">{title}</h3>
			{/if}
			<slot />
		</div>
	</CardContainer>
{:else}
	<CardContainer
		{aspectRatio}
		{mode}
		{bordered}
		{shadow}
		{interactive}
		{cardId}
		{cardState}
		class="flex flex-col {className}"
	>
		<div class="relative flex-1 overflow-hidden">
			{#if src}
				<img {src} {alt} class="w-full h-full object-cover" loading="lazy" />
			{:else}
				<slot />
			{/if}
		</div>
		{#if title || caption || $$slots.default}
			<div class="p-4 bg-slidey-muted/50">
				{#if title}
					<h3 class="text-xl font-semibold mb-1 text-slidey-foreground">{title}</h3>
				{/if}
				{#if caption}
					<p class="text-sm text-slidey-foreground">{caption}</p>
				{/if}
				{#if !src}
					<!-- If no src, slot content goes in the media area above -->
				{/if}
			</div>
		{/if}
	</CardContainer>
{/if}
