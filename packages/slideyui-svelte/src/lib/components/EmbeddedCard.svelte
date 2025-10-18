<script lang="ts">
	/**
	 * EmbeddedCard Component
	 * Wrapper for nested cards to apply hierarchical inset styling
	 * Part of Gamma-parity feature set (GAMMA_PARITY_PLAN.md Phase 1)
	 */

	let className: string = '';
	export { className as class };

	/**
	 * EmbeddedCard wrapper for hierarchical card nesting
	 *
	 * Applies inset styling to nested CardContainer components for visual hierarchy.
	 * Use when nesting cards inside other cards to create structure and reduce visual
	 * weight of nested content.
	 *
	 * @example
	 * ```svelte
	 * <ContentCard title="Overview">
	 *   <p>Main content here...</p>
	 *   <EmbeddedCard>
	 *     <ContentCard title="Details" variant="minimal">
	 *       <p>Nested details...</p>
	 *     </ContentCard>
	 *   </EmbeddedCard>
	 * </ContentCard>
	 * ```
	 *
	 * @example
	 * Multiple nested levels
	 * ```svelte
	 * <ContentCard title="Parent">
	 *   <EmbeddedCard>
	 *     <ContentCard title="Child">
	 *       <EmbeddedCard>
	 *         <ContentCard title="Grandchild" variant="minimal">
	 *           <p>Deep nesting example</p>
	 *         </ContentCard>
	 *       </EmbeddedCard>
	 *     </ContentCard>
	 *   </EmbeddedCard>
	 * </ContentCard>
	 * ```
	 */
</script>

<div class="slide-card-embedded {className}">
	<slot />
</div>
