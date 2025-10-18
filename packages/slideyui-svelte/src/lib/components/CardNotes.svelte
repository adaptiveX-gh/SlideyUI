<script lang="ts">
	/**
	 * CardNotes Component
	 * Speaker notes for presentation cards
	 * Only visible in presenter mode
	 *
	 * @example
	 * ```svelte
	 * <ContentCard title="Welcome">
	 *   <p>Slide content here</p>
	 *   <CardNotes>
	 *     Remember to mention the new features!
	 *   </CardNotes>
	 * </ContentCard>
	 * ```
	 */

	let className: string = '';
	export { className as class };
</script>

<div class="card-notes hidden {className}" data-card-notes>
	<slot />
</div>

<style>
	/* Notes are hidden by default */
	.card-notes {
		display: none;
	}

	/* Show notes in presenter mode (controlled by parent presentation component) */
	:global(.presenter-mode) .card-notes {
		display: block;
		padding: 1rem;
		margin-top: 1rem;
		background-color: rgba(0, 0, 0, 0.05);
		border-left: 4px solid rgba(0, 0, 0, 0.2);
		font-size: 0.875rem;
		line-height: 1.5;
		color: rgba(0, 0, 0, 0.7);
	}

	:global(.presenter-mode.dark) .card-notes {
		background-color: rgba(255, 255, 255, 0.05);
		border-left-color: rgba(255, 255, 255, 0.2);
		color: rgba(255, 255, 255, 0.7);
	}
</style>
