<script lang="ts">
  import SideNav from '$lib/components/SideNav.svelte';
  import { page } from '$app/stores';

  let { children } = $props();

  // Breadcrumbs logic
  const getBreadcrumbs = () => {
    const path = $page.url.pathname;
    const parts = path.split('/').filter(Boolean);
    return parts.map((part, index) => ({
      name: part.charAt(0).toUpperCase() + part.slice(1),
      href: '/' + parts.slice(0, index + 1).join('/'),
    }));
  };

  let breadcrumbs = $derived(getBreadcrumbs());
</script>

<div class="flex min-h-screen">
  <!-- Sidebar -->
  <div class="hidden lg:block">
    <SideNav />
  </div>

  <!-- Main Content -->
  <div class="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Breadcrumbs -->
    <div class="breadcrumbs text-sm mb-6">
      <ul>
        <li><a href="/">Home</a></li>
        {#each breadcrumbs as crumb}
          <li><a href={crumb.href}>{crumb.name}</a></li>
        {/each}
      </ul>
    </div>

    <!-- Content -->
    <article class="prose prose-slate max-w-none">
      {@render children?.()}
    </article>

    <!-- Navigation Footer -->
    <div class="divider my-12"></div>
    <div class="flex justify-between items-center">
      <a href="https://github.com/yourusername/slideyui/issues" target="_blank" rel="noopener noreferrer" class="link link-primary">
        Report an issue
      </a>
      <a href="https://github.com/yourusername/slideyui/edit/main/docs/src/routes{$page.url.pathname}/+page.svelte" target="_blank" rel="noopener noreferrer" class="link link-primary">
        Edit this page
      </a>
    </div>
  </div>
</div>
