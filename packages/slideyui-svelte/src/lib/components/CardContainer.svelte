<script lang="ts">
	/**
	 * CardContainer Component
	 * Base container for presentation cards with aspect ratio control
	 * Designed as Layer 0 primitive for AI apps to build upon
	 */

	export let aspectRatio: '16/9' | '4/3' | '1/1' | '3/2' | 'auto' = '16/9';
	export let mode: 'preview' | 'thumbnail' | 'full' = 'preview';
	export let bordered: boolean = true;
	export let shadow: boolean = true;
	export let interactive: boolean = false;
	export let backgroundColor: string | undefined = undefined;
	export let backgroundImage: string | undefined = undefined;

	// For AI app integration
	export let cardId: string | undefined = undefined;
	export let cardState: 'generating' | 'selected' | 'error' | 'complete' | undefined = undefined;

	// Responsive scaling - Gamma.ai-style behavior
	export let autoScale: boolean = false;
	export let fluidScale: boolean = false;

	// Allow additional classes
	let className: string = '';
	export { className as class };

	const aspectRatioClasses: Record<string, string> = {
		'16/9': 'aspect-[16/9]',
		'4/3': 'aspect-[4/3]',
		'1/1': 'aspect-square',
		'3/2': 'aspect-[3/2]',
		auto: ''
	};

	const modeClasses: Record<string, string> = {
		preview: 'slide-card-preview',
		thumbnail: 'slide-card-thumbnail',
		full: 'slide-card-full'
	};

	// Force reactivity by listing dependencies
	$: computedClasses = [
		'slide-card',
		aspectRatioClasses[aspectRatio],
		modeClasses[mode],
		interactive && 'cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]',
		className
	]
		.filter(Boolean)
		.join(' ');

	// Force reactivity by explicitly depending on bordered and shadow
	$: borderStyle = bordered ? 'border: 1px solid var(--slidey-border)' : '';
	$: shadowStyle = shadow ? 'box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1)' : '';

	// Debug logging
	$: if (typeof window !== 'undefined') {
		console.log('[CardContainer] bordered:', bordered, 'shadow:', shadow, 'borderStyle:', borderStyle);
	}

	$: styles = [
		backgroundColor && `background-color: ${backgroundColor}`,
		backgroundImage && `background-image: url(${backgroundImage})`,
		backgroundImage && 'background-size: cover',
		backgroundImage && 'background-position: center',
		borderStyle,
		shadowStyle
	]
		.filter(Boolean)
		.join('; ');

</script>

<div
	class={computedClasses}
	style={styles}
	data-card-id={cardId}
	data-card-state={cardState}
	data-auto-scale={autoScale ? 'true' : undefined}
	data-fluid-scale={fluidScale ? 'true' : undefined}
>
	<slot />
</div>
