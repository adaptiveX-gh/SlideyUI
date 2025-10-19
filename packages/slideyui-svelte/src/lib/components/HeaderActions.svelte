<script lang="ts">
  /**
   * HeaderActions - Container for action buttons
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

<div class="card-header-actions {className}">
  <slot />
</div>
