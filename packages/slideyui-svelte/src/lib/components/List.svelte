<script lang="ts">
  /**
   * List - Presentation-optimized vertical list layout
   * Based on DaisyUI List component, adapted for slide presentations
   *
   * @example
   * ```svelte
   * <List>
   *   <ListItem icon="📊" title="Data Analytics" description="Real-time insights" />
   *   <ListItem icon="🔒" title="Security" description="Enterprise-grade protection" />
   * </List>
   * ```
   */

  interface Props {
    /**
     * List variant style
     * @default "default"
     */
    variant?: 'default' | 'bordered' | 'compact' | 'numbered' | 'hoverable';

    /**
     * Optional header text
     */
    header?: string;

    /**
     * Add shadow to the list
     */
    shadow?: boolean;

    /**
     * Additional CSS classes
     */
    class?: string;

    /**
     * List items
     */
    children?: import('svelte').Snippet;
  }

  let {
    variant = 'default',
    header = undefined,
    shadow = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  const variantClass = $derived(variant !== 'default' ? `card-list-${variant}` : '');
  const shadowClass = $derived(shadow ? 'card-list-shadow' : '');
  const classes = $derived(
    ['card-list', variantClass, shadowClass, className].filter(Boolean).join(' ')
  );
</script>

<div class={classes} {...restProps}>
  {#if header}
    <div class="card-list-header">{header}</div>
  {/if}
  {@render children?.()}
</div>
