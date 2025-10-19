<script lang="ts">
  /**
   * HeroSubtitle - Hero subtitle/description
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

  const classes = $derived(['card-hero-subtitle', className].filter(Boolean).join(' '));
</script>

<p class={classes} {...restProps}>
  {@render children?.()}
</p>
