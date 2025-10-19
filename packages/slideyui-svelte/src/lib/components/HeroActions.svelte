<script lang="ts">
  /**
   * HeroActions - Action buttons container
   *
   * @component
   */

  interface Props {
    /**
     * Additional CSS classes
     */
    class?: string;
  }

  let {
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  const classes = $derived(['card-hero-actions', className].filter(Boolean).join(' '));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
