<script lang="ts">
  let { code = '', lang = 'bash', filename = '' } = $props<{
    code: string;
    lang?: string;
    filename?: string;
  }>();

  let copied = $state(false);

  function copyToClipboard() {
    navigator.clipboard.writeText(code);
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 2000);
  }
</script>

<div class="mockup-code bg-neutral text-neutral-content relative my-4">
  {#if filename}
    <div class="px-6 py-2 bg-base-300 text-base-content font-mono text-sm border-b border-base-100">
      {filename}
    </div>
  {/if}

  <button
    onclick={copyToClipboard}
    class="btn btn-sm btn-ghost absolute top-2 right-2 z-10"
    aria-label="Copy code"
  >
    {#if copied}
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    {/if}
  </button>

  <pre data-prefix="$" class="text-sm"><code>{code}</code></pre>
</div>
