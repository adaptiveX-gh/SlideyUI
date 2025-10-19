<script lang="ts">
  /**
   * HeroSplit - Split layout container (content + image)
   *
   * @component
   */

  interface Props {
    /**
     * Reverse layout order
     */
    reverse?: boolean;

    /**
     * Additional CSS classes
     */
    class?: string;
  }

  let {
    reverse = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  const baseClass = 'card-hero-split';
  const reverseClass = $derived(reverse ? 'card-hero-split-reverse' : '');
  const classes = $derived([baseClass, reverseClass, className].filter(Boolean).join(' '));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
