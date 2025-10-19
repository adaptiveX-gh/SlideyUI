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
  }

  let {
    align = 'left',
    class: className = ''
  }: Props = $props();

  const alignClass = $derived(`card-header-nav-${align}`);
</script>

<nav class="card-header-nav {alignClass} {className}">
  <slot />
</nav>
