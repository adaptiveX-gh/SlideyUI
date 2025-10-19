<script lang="ts">
  /**
   * HeroButton - Styled hero button
   *
   * @component
   */

  interface Props {
    /**
     * Button variant
     * @default "primary"
     */
    variant?: 'primary' | 'outline';

    /**
     * Button href (renders as link if provided)
     */
    href?: string;

    /**
     * Click handler
     */
    onclick?: () => void;

    /**
     * Additional CSS classes
     */
    class?: string;
  }

  let {
    variant = 'primary',
    href = undefined,
    onclick = undefined,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  const baseClass = 'card-hero-button';
  const variantClass = $derived(variant === 'outline' ? 'card-hero-button-outline' : '');
  const classes = $derived([baseClass, variantClass, className].filter(Boolean).join(' '));
</script>

{#if href}
  <a {href} class={classes} {onclick} {...restProps}>
    {@render children?.()}
  </a>
{:else}
  <button class={classes} {onclick} {...restProps}>
    {@render children?.()}
  </button>
{/if}
