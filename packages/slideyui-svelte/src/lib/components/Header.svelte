<script lang="ts">
  /**
   * Header - Presentation-optimized header component for cards and slides
   *
   * @component
   */

  interface Props {
    /**
     * Header layout style
     * @default "default"
     */
    layout?: 'default' | 'center';

    /**
     * Make header sticky
     */
    sticky?: boolean;

    /**
     * Background image URL for the header
     */
    backgroundImage?: string;

    /**
     * Additional CSS classes
     */
    class?: string;
  }

  let {
    layout = 'default',
    sticky = false,
    backgroundImage = undefined,
    class: className = '',
    ...restProps
  }: Props = $props();

  const baseClass = 'card-header';
  const layoutClass = $derived(layout === 'center' ? 'card-header-center' : '');
  const stickyClass = $derived(sticky ? 'card-header-sticky' : '');
  const imageClass = $derived(backgroundImage ? 'card-header-image' : '');
  const classes = $derived([baseClass, layoutClass, stickyClass, imageClass, className].filter(Boolean).join(' '));
  const styleAttr = $derived(backgroundImage ? `background-image: url(${backgroundImage})` : '');
</script>

<header class={classes} style={styleAttr} {...restProps}>
  <slot />
</header>
