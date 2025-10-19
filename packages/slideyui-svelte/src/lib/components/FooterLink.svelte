<script lang="ts">
  /**
   * FooterLink - A styled link for footer navigation
   */

  interface Props {
    /**
     * Link href
     */
    href: string;

    /**
     * Additional CSS classes
     */
    class?: string;
  }

  let {
    href,
    class: className = '',
    ...restProps
  }: Props = $props();
</script>

<a {href} class="card-footer-link {className}" {...restProps}>
  <slot />
</a>
