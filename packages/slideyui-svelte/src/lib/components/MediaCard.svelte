<script lang="ts">
	/**
	 * MediaCard Component
	 * Image, video, and SVG-focused presentation card
	 * Optimized for visual content with optional overlays and captions
	 */

	import CardContainer from './CardContainer.svelte';
	import type { CardPadding } from '../types';

	export let src: string | undefined = undefined;
	export let svgContent: string | undefined = undefined;
	export let svgType: 'image' | 'interactive' = 'image';
	export let alt: string = '';
	export let mediaType: 'image' | 'video' | 'svg' = 'image';
	export let title: string | undefined = undefined;
	export let caption: string | undefined = undefined;
	export let asBackground: boolean = false;
	export let fallbackImage: string | undefined = undefined;
	export let onError: ((error: Error) => void) | undefined = undefined;
	export let padding: CardPadding = 'none';
	export let aspectRatio: '16/9' | '4/3' | '1/1' | '3/2' | 'auto' = '16/9';
	export let mode: 'preview' | 'thumbnail' | 'full' = 'preview';
	export let bordered: boolean = true;
	export let shadow: boolean = true;
	export let interactive: boolean = false;
	export let cardId: string | undefined = undefined;
	export let cardState: 'generating' | 'selected' | 'error' | 'complete' | undefined = undefined;

	let className: string = '';
	export { className as class };

	const paddingClass = {
		compact: 'slide-card-compact',
		default: '',
		spacious: 'slide-card-spacious',
		none: 'slide-card-flush',
	}[padding];

	let imageError = false;

	// Handle image load error
	function handleImageError(e: Event) {
		if (fallbackImage && !imageError && e.target instanceof HTMLImageElement) {
			imageError = true;
			e.target.src = fallbackImage;
		}
		if (onError) {
			onError(new Error(`Failed to load image: ${src}`));
		}
	}

	// Create SVG data URI for image mode
	let svgDataUri = '';
	$: if (mediaType === 'svg' && svgContent && svgType === 'image') {
		svgDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;
	}
</script>

<!-- SVG Rendering (Interactive Mode) -->
{#if mediaType === 'svg' && svgContent && svgType === 'interactive'}
	<CardContainer
		{aspectRatio}
		{mode}
		{bordered}
		{shadow}
		{interactive}
		{cardId}
		{cardState}
		class="relative overflow-hidden {paddingClass} {className}"
	>
		<div class="w-full h-full" role="img" aria-label={alt}>
			{@html svgContent}
		</div>

		{#if title}
			<div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
				<h3 class="text-white text-2xl font-semibold">{title}</h3>
			</div>
		{/if}

		{#if $$slots.overlay}
			<div class="absolute inset-0 flex items-center justify-center">
				<slot name="overlay" />
			</div>
		{/if}

		{#if caption}
			<div class="absolute bottom-0 left-0 right-0 bg-slidey-background/95 p-4 border-t border-slidey-border">
				<div class="text-sm text-slidey-muted-foreground">{caption}</div>
			</div>
		{/if}
	</CardContainer>

<!-- SVG Rendering (Image Mode) -->
{:else if mediaType === 'svg' && svgContent && svgType === 'image'}
	<CardContainer
		{aspectRatio}
		{mode}
		{bordered}
		{shadow}
		{interactive}
		{cardId}
		{cardState}
		class="relative overflow-hidden {paddingClass} {className}"
	>
		<img src={svgDataUri} {alt} class="w-full h-full object-contain" loading="lazy" />

		{#if title}
			<div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
				<h3 class="text-white text-2xl font-semibold">{title}</h3>
			</div>
		{/if}

		{#if $$slots.overlay}
			<div class="absolute inset-0 flex items-center justify-center">
				<slot name="overlay" />
			</div>
		{/if}

		{#if caption}
			<div class="absolute bottom-0 left-0 right-0 bg-slidey-background/95 p-4 border-t border-slidey-border">
				<div class="text-sm text-slidey-muted-foreground">{caption}</div>
			</div>
		{/if}
	</CardContainer>

<!-- Background Mode -->
{:else if asBackground}
	<CardContainer
		{aspectRatio}
		{mode}
		{bordered}
		{shadow}
		{interactive}
		{cardId}
		{cardState}
		backgroundImage={src}
		class="relative {paddingClass} {className}"
	>
		<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
		<div class="relative z-10 p-8 flex flex-col justify-end h-full">
			{#if title}
				<h3 class="text-2xl font-bold mb-2 text-white">{title}</h3>
			{/if}
			<slot />
		</div>

		{#if $$slots.overlay}
			<div class="absolute inset-0 flex items-center justify-center p-8">
				<slot name="overlay" />
			</div>
		{/if}
	</CardContainer>

<!-- Standard Image/Video Mode -->
{:else}
	<CardContainer
		{aspectRatio}
		{mode}
		{bordered}
		{shadow}
		{interactive}
		{cardId}
		{cardState}
		class="relative overflow-hidden {paddingClass} {className}"
	>
		<div class="relative w-full h-full">
			{#if mediaType === 'video'}
				<video {src} class="w-full h-full object-cover" controls playsinline>
					<track kind="captions" />
				</video>
			{:else}
				<img {src} {alt} class="w-full h-full object-cover" loading="lazy" on:error={handleImageError} />
			{/if}

			{#if title}
				<div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
					<h3 class="text-white text-2xl font-semibold">{title}</h3>
				</div>
			{/if}

			{#if $$slots.overlay}
				<div class="absolute inset-0 flex items-center justify-center">
					<slot name="overlay" />
				</div>
			{/if}
		</div>

		{#if caption}
			<div class="absolute bottom-0 left-0 right-0 bg-slidey-background/95 p-4 border-t border-slidey-border">
				<div class="text-sm text-slidey-muted-foreground">{caption}</div>
			</div>
		{/if}
	</CardContainer>
{/if}
