<script lang="ts">
	/**
	 * EmbedCard Component
	 * Embeds rich media from various providers (YouTube, Vimeo, TikTok, custom)
	 * Optimized for presentation scale with responsive aspect ratios
	 */

	import CardContainer from './CardContainer.svelte';
	import type { CardPadding } from '../types';

	export let provider: 'youtube' | 'vimeo' | 'tiktok' | 'custom';
	export let embedUrl: string;
	export let title: string | undefined = undefined;
	export let caption: string | undefined = undefined;
	export let padding: CardPadding = 'none';
	export let aspectRatio: '16/9' | '4/3' | '1/1' | '3/2' | 'auto' = '16/9';
	export let allowFullscreen: boolean = true;
	export let autoplay: boolean = false;

	let className: string = '';
	export { className as class };

	const paddingClass = {
		compact: 'slide-card-compact',
		default: '',
		spacious: 'slide-card-spacious',
		none: 'slide-card-flush',
	}[padding];

	let loadError = false;

	/**
	 * Rich media embed card for presentations
	 *
	 * @example
	 * ```svelte
	 * // YouTube embed
	 * <EmbedCard
	 *   provider="youtube"
	 *   embedUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
	 *   title="Demo Video"
	 *   caption="Watch our product demo"
	 *   aspectRatio="16/9"
	 * />
	 *
	 * // Vimeo embed with autoplay
	 * <EmbedCard
	 *   provider="vimeo"
	 *   embedUrl="https://player.vimeo.com/video/123456789"
	 *   title="Vimeo Demo"
	 *   autoplay
	 * />
	 *
	 * // TikTok embed
	 * <EmbedCard
	 *   provider="tiktok"
	 *   embedUrl="https://www.tiktok.com/embed/v2/7123456789"
	 *   title="TikTok Demo"
	 *   aspectRatio="9/16"
	 * />
	 *
	 * // Custom iframe embed
	 * <EmbedCard
	 *   provider="custom"
	 *   embedUrl="https://example.com/interactive-demo"
	 *   title="Interactive Demo"
	 *   allowFullscreen
	 * />
	 * ```
	 */

	/**
	 * Generates provider-specific iframe URL with optimal parameters
	 */
	function getEmbedUrl(
		provider: string,
		embedUrl: string,
		autoplay: boolean
	): string {
		try {
			const url = new URL(embedUrl);

			// Security: Only allow http/https protocols
			if (url.protocol !== 'http:' && url.protocol !== 'https:') {
				console.warn(
					`[EmbedCard] Invalid protocol: ${url.protocol}. Only http/https allowed.`
				);
				return '';
			}

			switch (provider) {
				case 'youtube':
					url.searchParams.set('autoplay', autoplay ? '1' : '0');
					url.searchParams.set('rel', '0');
					url.searchParams.set('modestbranding', '1');
					break;
				case 'vimeo':
					url.searchParams.set('autoplay', autoplay ? '1' : '0');
					url.searchParams.set('title', '0');
					url.searchParams.set('byline', '0');
					url.searchParams.set('portrait', '0');
					break;
				case 'tiktok':
				case 'custom':
				default:
					// Use URL as-is for TikTok and custom embeds
					break;
			}

			return url.toString();
		} catch (error) {
			console.error('[EmbedCard] Invalid embedUrl:', embedUrl, error);
			return '';
		}
	}

	$: finalEmbedUrl = getEmbedUrl(provider, embedUrl, autoplay);

	// Build iframe allow attribute based on props
	$: allowAttributes = [
		'accelerometer',
		'encrypted-media',
		'gyroscope',
		'picture-in-picture',
		allowFullscreen && 'fullscreen',
		autoplay && 'autoplay'
	]
		.filter(Boolean)
		.join('; ');
</script>

{#if !finalEmbedUrl || loadError}
	<CardContainer {aspectRatio} class="slide-embed-card {paddingClass} {className}">
		<div class="flex flex-col items-center justify-center p-8 text-slidey-muted-foreground">
			<slot>
				<p class="text-lg mb-2">Failed to load embed</p>
				<p class="text-sm">Please check the URL and try again</p>
			</slot>
		</div>
	</CardContainer>
{:else}
	<CardContainer {aspectRatio} class="slide-embed-card {paddingClass} {className}">
		<div class="relative w-full h-full">
			<iframe
				src={finalEmbedUrl}
				title={title || `${provider} embed`}
				class="slide-embed-iframe"
				allow={allowAttributes}
				allowfullscreen={allowFullscreen}
				loading="lazy"
				sandbox="allow-scripts allow-same-origin allow-presentation"
				on:error={() => (loadError = true)}
			></iframe>

			<!-- Fallback content if embed fails -->
			<noscript>
				<div
					class="absolute inset-0 flex items-center justify-center p-6 bg-slidey-muted"
				>
					<slot />
				</div>
			</noscript>
		</div>

		{#if caption}
			<div class="slide-embed-caption">
				{caption}
			</div>
		{/if}
	</CardContainer>
{/if}
