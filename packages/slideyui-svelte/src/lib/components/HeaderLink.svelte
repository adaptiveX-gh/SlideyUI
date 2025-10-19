<script lang="ts">
  /**
   * HeaderLink - Styled link for header navigation
   */

  interface Props {
    /**
     * Link href
     */
    href: string;

    /**
     * Whether the link is active
     */
    active?: boolean;

    /**
     * Additional CSS classes
     */
    class?: string;

    /**
     * Children content
     */
    children?: import('svelte').Snippet;
  }

  let {
    href,
    active = false,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  const activeClass = $derived(active ? 'card-header-link-active' : '');
</script>

<a {href} class="card-header-link {activeClass} {className}" {...restProps}>
  {@render children?.()}
</a>
