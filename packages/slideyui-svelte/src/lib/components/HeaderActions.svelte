<script lang="ts">
  /**
   * HeaderActions - Container for action buttons
   */

  interface Props {
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
    class: className = '',
    children
  }: Props = $props();
</script>

<div class="card-header-actions {className}">
  {@render children?.()}
</div>
