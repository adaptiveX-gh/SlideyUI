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
  }

  let {
    href,
    active = false,
    class: className = '',
    ...restProps
  }: Props = $props();

  const activeClass = $derived(active ? 'card-header-link-active' : '');
</script>

<a {href} class="card-header-link {activeClass} {className}" {...restProps}>
  <slot />
</a>
