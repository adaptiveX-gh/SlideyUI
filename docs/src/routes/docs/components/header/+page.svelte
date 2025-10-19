<script lang="ts">
  import {
    ContentCard,
    Header,
    HeaderBrand,
    HeaderNav,
    HeaderLink,
    HeaderActions,
    HeaderButton,
    HeaderSearch,
    HeaderDropdown,
    HeaderDropdownItem,
    HeaderDropdownDivider
  } from '@slideyui/svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';

  let searchValue = $state('');
  let currentPage = $state('home');

  const basicHeaderCode = `<Header>
  <HeaderBrand href="/">Company Name</HeaderBrand>
</Header>`;

  const navHeaderCode = `<Header>
  <HeaderBrand href="/">SlideyUI</HeaderBrand>

  <HeaderNav>
    <HeaderLink href="#features">Features</HeaderLink>
    <HeaderLink href="#pricing">Pricing</HeaderLink>
    <HeaderLink href="#about">About</HeaderLink>
  </HeaderNav>
</Header>`;

  const fullHeaderCode = `<Header>
  <HeaderBrand href="/">SlideyUI</HeaderBrand>

  <HeaderNav align="center">
    <HeaderLink href="#" active={true}>Home</HeaderLink>
    <HeaderLink href="#">Products</HeaderLink>
    <HeaderLink href="#">Docs</HeaderLink>
  </HeaderNav>

  <HeaderActions>
    <HeaderButton variant="outline">Sign In</HeaderButton>
    <HeaderButton>Get Started</HeaderButton>
  </HeaderActions>
</Header>`;

  const searchHeaderCode = `<Header>
  <HeaderBrand href="/">SlideyUI</HeaderBrand>
  <HeaderSearch bind:value={searchValue} />
  <HeaderActions>
    <HeaderButton>Sign Up</HeaderButton>
  </HeaderActions>
</Header>`;

  const dropdownHeaderCode = `<Header>
  <HeaderBrand href="/">Company</HeaderBrand>
  <HeaderNav>
    <HeaderLink href="#">Home</HeaderLink>
    <HeaderDropdown>
      <div slot="trigger">Products ▼</div>
      <HeaderDropdownItem href="#1">Product 1</HeaderDropdownItem>
      <HeaderDropdownItem href="#2">Product 2</HeaderDropdownItem>
    </HeaderDropdown>
  </HeaderNav>
</Header>`;

  const backgroundHeaderCode = `<Header
  backgroundImage="https://images.unsplash.com/photo-..."
  sticky={true}
>
  <HeaderBrand href="/">Brand</HeaderBrand>
  <HeaderNav>
    <HeaderLink href="#">Features</HeaderLink>
  </HeaderNav>
</Header>`;

  const centeredHeaderCode = `<Header layout="center">
  <HeaderBrand subtitle="Building the future">
    Company Name
  </HeaderBrand>
  <HeaderNav>
    <HeaderLink href="#">Products</HeaderLink>
  </HeaderNav>
</Header>`;
</script>

<svelte:head>
  <title>Header - SlideyUI Components</title>
</svelte:head>

<div class="container mx-auto px-6 py-12">
  <header class="mb-12">
    <h1 class="text-5xl font-bold mb-4">Header</h1>
    <p class="text-xl text-base-content/70 max-w-3xl">
      Presentation-optimized header components for cards and slides. Includes navigation, search, actions, dropdowns, and background image support.
    </p>
  </header>

  <!-- Installation -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Installation</h2>
    <CodeBlock code={`import {
  Header, HeaderBrand, HeaderNav, HeaderLink,
  HeaderActions, HeaderButton, HeaderSearch,
  HeaderDropdown, HeaderDropdownItem
} from '@slideyui/svelte';`} lang="typescript" />
  </section>

  <!-- Basic Header -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Basic Header</h2>

    <div class="mb-4">
      <ContentCard title="Simple Example" aspectRatio="16/9">
        <Header slot="header">
          <HeaderBrand href="/">Company Name</HeaderBrand>
        </Header>
        <p class="text-lg">Card content goes here</p>
      </ContentCard>
    </div>

    <CodeBlock code={basicHeaderCode} lang="svelte" />
  </section>

  <!-- Header with Navigation -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Header with Navigation</h2>

    <div class="mb-4">
      <ContentCard title="Navigation Example" aspectRatio="16/9">
        <Header slot="header">
          <HeaderBrand href="/">SlideyUI</HeaderBrand>
          <HeaderNav>
            <HeaderLink href="#features">Features</HeaderLink>
            <HeaderLink href="#pricing">Pricing</HeaderLink>
            <HeaderLink href="#about">About</HeaderLink>
          </HeaderNav>
        </Header>
        <div class="text-lg">
          <p>Navigate through different sections</p>
        </div>
      </ContentCard>
    </div>

    <CodeBlock code={navHeaderCode} lang="svelte" />
  </section>

  <!-- Full Header with Actions -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Full Header with Actions</h2>

    <div class="mb-4">
      <ContentCard title="Product Dashboard" aspectRatio="16/9" variant="featured">
        <Header slot="header">
          <HeaderBrand href="#">SlideyUI</HeaderBrand>

          <HeaderNav align="center">
            <HeaderLink href="#" active={currentPage === 'home'}
              onclick={() => currentPage = 'home'}>
              Home
            </HeaderLink>
            <HeaderLink href="#" active={currentPage === 'products'}
              onclick={() => currentPage = 'products'}>
              Products
            </HeaderLink>
            <HeaderLink href="#" active={currentPage === 'docs'}
              onclick={() => currentPage = 'docs'}>
              Docs
            </HeaderLink>
          </HeaderNav>

          <HeaderActions>
            <HeaderButton variant="outline">Sign In</HeaderButton>
            <HeaderButton>Get Started</HeaderButton>
          </HeaderActions>
        </Header>

        <div class="text-lg">
          <p>Current page: <strong>{currentPage}</strong></p>
        </div>
      </ContentCard>
    </div>

    <CodeBlock code={fullHeaderCode} lang="svelte" />
  </section>

  <!-- Header with Search -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Header with Search</h2>

    <div class="mb-4">
      <ContentCard title="Search Interface" aspectRatio="16/9">
        <Header slot="header">
          <HeaderBrand href="/">SlideyUI</HeaderBrand>
          <HeaderSearch bind:value={searchValue} placeholder="Search..." />
          <HeaderActions>
            <HeaderButton>New</HeaderButton>
          </HeaderActions>
        </Header>

        <div class="text-lg">
          {#if searchValue}
            <p>Searching: <strong>{searchValue}</strong></p>
          {:else}
            <p>Try searching!</p>
          {/if}
        </div>
      </ContentCard>
    </div>

    <CodeBlock code={searchHeaderCode} lang="svelte" />
  </section>

  <!-- Header with Dropdown -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Header with Dropdown</h2>

    <div class="mb-4">
      <ContentCard title="Dropdown Navigation" aspectRatio="16/9">
        <Header slot="header">
          <HeaderBrand href="/">Company</HeaderBrand>

          <HeaderNav>
            <HeaderLink href="#">Home</HeaderLink>

            <HeaderDropdown>
              <div slot="trigger">Products ▼</div>
              <HeaderDropdownItem href="#product1">Product 1</HeaderDropdownItem>
              <HeaderDropdownItem href="#product2">Product 2</HeaderDropdownItem>
              <HeaderDropdownDivider />
              <HeaderDropdownItem href="#all">View All</HeaderDropdownItem>
            </HeaderDropdown>

            <HeaderLink href="#">About</HeaderLink>
          </HeaderNav>
        </Header>

        <p class="text-lg">Click Products to see dropdown</p>
      </ContentCard>
    </div>

    <CodeBlock code={dropdownHeaderCode} lang="svelte" />
  </section>

  <!-- Header with Background Image -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Header with Background Image</h2>

    <div class="mb-4">
      <ContentCard title="Hero Section" aspectRatio="16/9" variant="featured">
        <Header
          slot="header"
          backgroundImage="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&auto=format&fit=crop"
        >
          <HeaderBrand href="#">Brand</HeaderBrand>
          <HeaderNav>
            <HeaderLink href="#">Features</HeaderLink>
            <HeaderLink href="#">Contact</HeaderLink>
          </HeaderNav>
          <HeaderActions>
            <HeaderButton variant="outline">Learn More</HeaderButton>
          </HeaderActions>
        </Header>

        <p class="text-lg">Background images create impact</p>
      </ContentCard>
    </div>

    <CodeBlock code={backgroundHeaderCode} lang="svelte" />
  </section>

  <!-- Centered Header -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Centered Header</h2>

    <div class="mb-4">
      <ContentCard title="Welcome" aspectRatio="16/9">
        <Header layout="center" slot="header">
          <HeaderBrand subtitle="Building the future">Company</HeaderBrand>
          <HeaderNav>
            <HeaderLink href="#">Products</HeaderLink>
            <HeaderLink href="#">Services</HeaderLink>
          </HeaderNav>
        </Header>

        <p class="text-center text-lg">Centered layout for balanced design</p>
      </ContentCard>
    </div>

    <CodeBlock code={centeredHeaderCode} lang="svelte" />
  </section>

  <!-- API Reference -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">API Reference</h2>

    <div class="space-y-8">
      <div>
        <h3 class="text-2xl font-semibold mb-4">Header Props</h3>
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>layout</code></td>
                <td><code>'default' | 'center'</code></td>
                <td><code>'default'</code></td>
                <td>Header layout style</td>
              </tr>
              <tr>
                <td><code>sticky</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Make header sticky</td>
              </tr>
              <tr>
                <td><code>backgroundImage</code></td>
                <td><code>string</code></td>
                <td><code>undefined</code></td>
                <td>Background image URL</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>

  <!-- Best Practices -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Best Practices</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="card bg-success/10 border border-success">
        <div class="card-body">
          <h3 class="card-title text-success">Do</h3>
          <ul class="space-y-2">
            <li>Keep navigation items concise</li>
            <li>Use sticky headers for long content</li>
            <li>Indicate active page state</li>
            <li>Group related items in dropdowns</li>
            <li>Test on mobile devices</li>
          </ul>
        </div>
      </div>

      <div class="card bg-error/10 border border-error">
        <div class="card-body">
          <h3 class="card-title text-error">Don't</h3>
          <ul class="space-y-2">
            <li>Overcrowd with too many items</li>
            <li>Use low-contrast backgrounds</li>
            <li>Forget mobile responsiveness</li>
            <li>Hide critical navigation</li>
            <li>Make headers too tall</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Next Steps -->
  <section>
    <h2 class="text-3xl font-bold mb-6">Related</h2>
    <div class="flex gap-4 flex-wrap">
      <a href="/docs/components/footer" class="btn btn-outline">Footer</a>
      <a href="/docs/components/cards" class="btn btn-outline">Cards</a>
      <a href="/docs/components" class="btn btn-outline">All Components</a>
    </div>
  </section>
</div>
