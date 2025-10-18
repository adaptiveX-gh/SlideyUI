<script lang="ts">
  import { page } from '$app/stores';

  type NavSection = {
    title: string;
    items: { title: string; href: string }[];
  };

  const sections: NavSection[] = [
    {
      title: 'Getting Started',
      items: [
        { title: 'Introduction', href: '/docs/intro' },
        { title: 'Installation', href: '/docs/install' },
      ],
    },
    {
      title: 'Customization',
      items: [
        { title: 'Themes', href: '/docs/themes' },
        { title: 'Layouts', href: '/docs/layouts' },
        { title: 'Typography', href: '/docs/typography' },
      ],
    },
    {
      title: 'Reference',
      items: [
        { title: 'Components', href: '/docs/components' },
        { title: 'Utilities', href: '/docs/utilities' },
        { title: 'Examples', href: '/docs/examples' },
      ],
    },
  ];

  let openSections = $state<Record<string, boolean>>(
    sections.reduce((acc, section) => ({ ...acc, [section.title]: true }), {})
  );

  function toggleSection(title: string) {
    openSections[title] = !openSections[title];
  }
</script>

<aside class="w-64 h-full bg-base-100 border-r border-base-300 overflow-y-auto sticky top-0">
  <div class="p-4">
    <h2 class="text-xs font-semibold text-base-content/60 uppercase tracking-wider mb-4">
      Documentation
    </h2>

    {#each sections as section}
      <div class="mb-4">
        <button
          onclick={() => toggleSection(section.title)}
          class="flex items-center justify-between w-full text-left text-sm font-semibold text-base-content mb-2 hover:text-primary transition-colors"
        >
          {section.title}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 transition-transform {openSections[section.title] ? 'rotate-180' : ''}"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {#if openSections[section.title]}
          <ul class="space-y-1">
            {#each section.items as item}
              <li>
                <a
                  href={item.href}
                  class="block py-2 px-3 text-sm rounded-lg transition-colors {$page.url.pathname === item.href
                    ? 'bg-primary text-primary-content font-medium'
                    : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'}"
                >
                  {item.title}
                </a>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    {/each}
  </div>
</aside>
