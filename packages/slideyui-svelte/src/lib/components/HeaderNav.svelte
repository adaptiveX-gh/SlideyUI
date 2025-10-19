<script lang="ts">
  /**
   * HeaderNav - Navigation container for header links
   */

  interface Props {
    /**
     * Navigation alignment
     */
    align?: 'left' | 'center' | 'right';

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
    align = 'left',
    class: className = '',
    children
  }: Props = $props();

  const alignClass = $derived(`card-header-nav-${align}`);
</script>

<nav class="card-header-nav {alignClass} {className}">
  {@render children?.()}
</nav>
