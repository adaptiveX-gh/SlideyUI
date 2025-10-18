<script lang="ts">
  import CodeBlock from './CodeBlock.svelte';

  let { title = '', code = '', children } = $props<{
    title?: string;
    code?: string;
    children?: any;
  }>();

  let showCode = $state(false);
</script>

<div class="card bg-base-100 shadow-xl my-6">
  <div class="card-body">
    {#if title}
      <h3 class="card-title text-xl mb-4">{title}</h3>
    {/if}

    <div class="p-6 bg-base-200 rounded-lg">
      {@render children?.()}
    </div>

    {#if code}
      <div class="card-actions justify-end mt-4">
        <button
          onclick={() => (showCode = !showCode)}
          class="btn btn-sm btn-outline"
        >
          {showCode ? 'Hide' : 'Show'} Code
        </button>
      </div>

      {#if showCode}
        <div class="mt-4">
          <CodeBlock {code} lang="html" />
        </div>
      {/if}
    {/if}
  </div>
</div>
