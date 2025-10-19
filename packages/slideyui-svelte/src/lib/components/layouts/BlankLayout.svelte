<script lang="ts">
  /**
   * BlankLayout - Empty card template for custom content
   *
   * @component
   */

  interface Props {
    /**
     * Additional CSS classes
     */
    class?: string;
  }

  let { class: className = '', children, ...restProps }: Props = $props();
</script>

<div class="w-full h-full {className}" {...restProps}>
  {@render children?.()}
</div>
