<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  const themes = ['light', 'dark', 'cupcake', 'corporate', 'business'];
  let currentTheme = $state('light');

  onMount(() => {
    const saved = localStorage.getItem('theme') || 'light';
    currentTheme = saved;
    document.documentElement.setAttribute('data-theme', saved);
  });

  function setTheme(theme: string) {
    currentTheme = theme;
    if (browser) {
      localStorage.setItem('theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    }
  }
</script>

<div class="dropdown dropdown-end">
  <div tabindex="0" role="button" class="btn btn-ghost gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
    <span class="hidden sm:inline">Theme</span>
  </div>
  <ul class="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52 mt-3">
    {#each themes as theme}
      <li>
        <button
          onclick={() => setTheme(theme)}
          class={currentTheme === theme ? 'active' : ''}
        >
          <span class="capitalize">{theme}</span>
          {#if currentTheme === theme}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          {/if}
        </button>
      </li>
    {/each}
  </ul>
</div>
