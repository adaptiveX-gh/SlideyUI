<script lang="ts">
  import { page } from '$app/stores';

  type NavItem = {
    title: string;
    href: string;
    children?: NavItem[];
  };

  type NavSection = {
    title: string;
    items: NavItem[];
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
        {
          title: 'Layouts',
          href: '/docs/layouts',
          children: [
            { title: 'Basic Layouts', href: '/docs/layouts/basic' },
          ],
        },
        { title: 'Typography', href: '/docs/typography' },
      ],
    },
    {
      title: 'Reference',
      items: [
        {
          title: 'Components',
          href: '/docs/components',
          children: [
            { title: 'Cards', href: '/docs/components/cards' },
            { title: 'Divider', href: '/docs/components/divider' },
            { title: 'Footer', href: '/docs/components/footer' },
            { title: 'Header', href: '/docs/components/header' },
            { title: 'Hero', href: '/docs/components/hero' },
            { title: 'List', href: '/docs/components/list' },
            { title: 'Charts', href: '/docs/components/charts', children: [
              { title: 'Area', href: '/docs/components/charts/area' },
              { title: 'Bar', href: '/docs/components/charts/bar' },
              { title: 'Column', href: '/docs/components/charts/column' },
              { title: 'Line', href: '/docs/components/charts/line' },
              { title: 'Pie', href: '/docs/components/charts/pie' },
            ]},
          ],
        },
        { title: 'Analytics', href: '/docs/analytics' },
        { title: 'Utilities', href: '/docs/utilities' },
        {
          title: 'Examples',
          href: '/docs/examples',
          children: [
            { title: 'Bullet-With-Icons', href: '/docs/examples/bullet-with-icons' },
            { title: 'Bullet With Icons Description Grid', href: '/docs/examples/bullet-with-icons-description-grid' },
            { title: 'Chart With Description', href: '/docs/examples/chart-with-description' },
            { title: 'Chart With Metrics', href: '/docs/examples/chart-with-metrics' },
          ],
        },
      ],
    },
    {
      title: 'Demos',
      items: [
        { title: 'Presentation Mode', href: '/demo/presentation' },
      ],
    },
  ];

  let openSections = $state<Record<string, boolean>>(
    sections.reduce((acc, section) => ({ ...acc, [section.title]: true }), {})
  );

  // Auto-expand sub-items if current page is a child
  let openSubItems = $state<Record<string, boolean>>(
    sections.reduce((acc, section) => {
      section.items.forEach((item) => {
        if (item.children && item.children.length > 0) {
          const isChildActive = item.children.some(
            (child) => $page.url.pathname === child.href
          );
          acc[item.href] = isChildActive;
        }
      });
      return acc;
    }, {} as Record<string, boolean>)
  );

  function toggleSection(title: string) {
    openSections[title] = !openSections[title];
  }

  function toggleSubItem(href: string) {
    openSubItems[href] = !openSubItems[href];
  }

  function isActive(href: string): boolean {
    return $page.url.pathname === href || $page.url.pathname.startsWith(href + '/');
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
                {#if item.children && item.children.length > 0}
                  <!-- Item with children (expandable) -->
                  <button
                    onclick={() => toggleSubItem(item.href)}
                    class="flex items-center justify-between w-full py-2 px-3 text-sm rounded-lg transition-colors {isActive(item.href)
                      ? 'bg-primary text-primary-content font-medium'
                      : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'}"
                  >
                    <a href={item.href} class="flex-1 text-left" onclick={(e) => e.stopPropagation()}>
                      {item.title}
                    </a>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3 transition-transform {openSubItems[item.href] ? 'rotate-180' : ''}"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {#if openSubItems[item.href]}
                    <ul class="ml-4 mt-1 space-y-1 border-l-2 border-base-300 pl-2">
                      {#each item.children as child}
                        <li>
                          <a
                            href={child.href}
                            class="block py-2 px-3 text-sm rounded-lg transition-colors {$page.url.pathname === child.href
                              ? 'bg-primary text-primary-content font-medium'
                              : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'}"
                          >
                            {child.title}
                          </a>
                        </li>
                      {/each}
                    </ul>
                  {/if}
                {:else}
                  <!-- Regular item without children -->
                  <a
                    href={item.href}
                    class="block py-2 px-3 text-sm rounded-lg transition-colors {$page.url.pathname === item.href
                      ? 'bg-primary text-primary-content font-medium'
                      : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'}"
                  >
                    {item.title}
                  </a>
                {/if}
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    {/each}
  </div>
</aside>
