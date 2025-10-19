<script lang="ts">
  /**
   * HeroContent - Content wrapper for hero sections
   *
   * @component
   */

  interface Props {
    /**
     * Content alignment
     * @default "center"
     */
    align?: 'center' | 'start' | 'end';

    /**
     * Additional CSS classes
     */
    class?: string;
  }

  let {
    align = 'center',
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  const baseClass = 'card-hero-content';
  const alignClass = $derived(
    align === 'start' ? 'card-hero-content-start' :
    align === 'end' ? 'card-hero-content-end' : ''
  );
  const classes = $derived([baseClass, alignClass, className].filter(Boolean).join(' '));
</script>

<div class={classes} {...restProps}>
  {@render children?.()}
</div>
