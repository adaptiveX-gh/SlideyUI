<script lang="ts">
  /**
   * ListItem - Individual item within a List component
   *
   * @example
   * ```svelte
   * <ListItem icon="📊" title="Data Analytics" description="Real-time insights" />
   * ```
   */

  interface Props {
    /**
     * Icon or emoji to display (optional)
     */
    icon?: string;

    /**
     * Icon background color (uses theme color by default)
     */
    iconColor?: string;

    /**
     * Image URL to display (alternative to icon)
     */
    image?: string;

    /**
     * Main title/heading for the list item
     */
    title?: string;

    /**
     * Optional description text
     */
    description?: string;

    /**
     * Additional CSS classes
     */
    class?: string;

    /**
     * Custom content (overrides title/description if provided)
     */
    children?: import('svelte').Snippet;

    /**
     * Action buttons/elements
     */
    actions?: import('svelte').Snippet;

    /**
     * Click handler for interactive lists
     */
    onclick?: (e: MouseEvent) => void;
  }

  let {
    icon = undefined,
    iconColor = undefined,
    image = undefined,
    title = undefined,
    description = undefined,
    class: className = '',
    children,
    actions,
    onclick,
    ...restProps
  }: Props = $props();

  const classes = $derived(['card-list-row', className].filter(Boolean).join(' '));
</script>

<div class={classes} {onclick} {...restProps}>
  {#if image}
    <div class="card-list-row-image">
      <img src={image} alt={title || ''} />
    </div>
  {:else if icon}
    <div
      class="card-list-row-icon"
      style={iconColor ? `background-color: ${iconColor}` : ''}
    >
      {icon}
    </div>
  {/if}
  {#if children}
    {@render children()}
  {:else}
    <div class="card-list-row-content">
      {#if title}
        <div class="card-list-row-title">{title}</div>
      {/if}
      {#if description}
        <div class="card-list-row-description">{description}</div>
      {/if}
    </div>
  {/if}
  {#if actions}
    <div class="card-list-row-actions">
      {@render actions()}
    </div>
  {/if}
</div>
