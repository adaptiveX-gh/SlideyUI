<script lang="ts">
  /**
   * FooterLegal - Legal/copyright text for footer
   *
   * @example
   * ```svelte
   * <FooterLegal>
   *   © 2024 Company Name. All rights reserved.
   * </FooterLegal>
   * ```
   */

  interface Props {
    /**
     * Additional CSS classes
     */
    class?: string;
  }

  let {
    class: className = ''
  }: Props = $props();
</script>

<div class="card-footer-legal {className}">
  <slot />
</div>
