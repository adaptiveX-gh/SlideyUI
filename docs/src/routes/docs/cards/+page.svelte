<script lang="ts">
  import {
    CardGrid,
    ContentCard,
    MediaCard,
    DataCard,
    SplitCard,
    QuoteCard,
    CardStack,
    CollapsibleSection,
    EmbedCard
  } from '@slideyui/svelte';
  import LiveCardDemo from '$lib/components/LiveCardDemo.svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';

  const cardExample = `import { CardGrid, ContentCard } from '@slideyui/svelte';

<CardGrid columns={{ sm: 1, md: 2, lg: 3 }} gap="lg">
  <ContentCard
    title="Welcome"
    aspectRatio="16/9"
    interactive={true}
  >
    <p>Card content...</p>
  </ContentCard>
</CardGrid>`;
</script>

<div class="container mx-auto px-6 py-12">
  <header class="mb-12">
    <h1 class="text-5xl font-bold mb-4">SlideyUI Cards</h1>
    <p class="text-xl text-base-content/70">
      Layer 0 primitives for building AI-first presentation apps like Gamma
    </p>
  </header>

  <!-- Introduction -->
  <section class="prose max-w-none mb-16">
    <h2>What are SlideyUI Cards?</h2>
    <p>
      SlideyUI Cards are presentation-optimized building blocks designed for AI-first applications.
      They provide flexible, composable components that can be used in card-based editing UIs and
      seamlessly transform into full-screen presentations.
    </p>

    <div class="alert alert-info my-6">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span><strong>Layer 0 Philosophy:</strong> Cards provide the foundational UI primitives. Your AI app adds editing logic, drag-and-drop, streaming, and collaboration.</span>
    </div>
  </section>

  <!-- Interactive Demo with Controls -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Interactive Demo</h2>
    <p class="text-lg mb-8">
      Try adjusting the settings below to see how cards respond. This is a fully functional demo built with @slideyui/svelte!
    </p>

    <LiveCardDemo />
  </section>

  <!-- Additional Card Examples -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Card Variants</h2>
    <p class="text-lg mb-8">
      Here are examples of different card types in action:
    </p>

    <CardGrid columns={{ sm: 1, md: 2 }} gap="lg">
      <ContentCard
        title="ContentCard"
        subtitle="Text-heavy presentations"
        aspectRatio="16/9"
        interactive={true}
        variant="featured"
      >
        <ul class="space-y-2 text-lg">
          <li class="flex items-start gap-2">
            <span class="text-primary mt-1">•</span>
            <span>Structured header/body/footer</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-primary mt-1">•</span>
            <span>Multiple variants (default, featured, minimal)</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-primary mt-1">•</span>
            <span>Icon and badge slots</span>
          </li>
        </ul>
      </ContentCard>

      <DataCard
        variant="metric"
        title="DataCard"
        value="$1.2M"
        label="Total Revenue"
        trend="up"
        trendValue="+24%"
        aspectRatio="16/9"
        interactive={true}
      />

      <ContentCard
        title="AI Generation States"
        subtitle="Visual feedback during AI generation"
        aspectRatio="16/9"
        cardState="generating"
      >
        <p class="text-lg">
          This card has <code class="bg-base-300 px-2 py-1 rounded">cardState="generating"</code> which applies a pulse animation automatically.
        </p>
      </ContentCard>

      <ContentCard
        title="Interactive Cards"
        subtitle="Hover to see effects"
        aspectRatio="16/9"
        interactive={true}
        cardState="complete"
      >
        <p class="text-lg">
          Set <code class="bg-base-300 px-2 py-1 rounded">interactive={true}</code> to enable hover effects and cursor changes.
        </p>
      </ContentCard>
    </CardGrid>
  </section>

  <!-- Code Examples -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Code Examples</h2>

    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h3 class="text-xl font-semibold mb-4">Basic Usage (Svelte)</h3>
        <CodeBlock code={cardExample} lang="svelte" filename="example.svelte" />
      </div>
    </div>

    <div class="alert alert-info mt-6">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <div>
        <strong>React Users:</strong> The API is nearly identical. Replace imports with <code>@slideyui/react</code> and use JSX syntax.
      </div>
    </div>
  </section>

  <!-- Component Gallery -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Card Components</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">CardContainer</h3>
          <p>Base container with aspect ratio control and presentation modes.</p>
          <div class="badge badge-outline">Layout Primitive</div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">CardGrid</h3>
          <p>Responsive grid layout for organizing multiple cards.</p>
          <div class="badge badge-outline">Layout Primitive</div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">ContentCard</h3>
          <p>Text-heavy cards with structured layouts.</p>
          <div class="badge badge-primary">Specialized</div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">MediaCard</h3>
          <p>Image and video-focused cards.</p>
          <div class="badge badge-primary">Specialized</div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">SplitCard</h3>
          <p>Two-column layouts for comparisons.</p>
          <div class="badge badge-primary">Specialized</div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">DataCard</h3>
          <p>Metrics, charts, and data visualizations.</p>
          <div class="badge badge-primary">Specialized</div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">QuoteCard</h3>
          <p>Testimonials and highlighted quotes.</p>
          <div class="badge badge-primary">Specialized</div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">CardStack</h3>
          <p>Stack multiple cards with visual depth.</p>
          <div class="badge badge-primary">Specialized</div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">CollapsibleSection</h3>
          <p>Expandable/collapsible content sections.</p>
          <div class="badge badge-secondary">Interactive</div>
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">EmbedCard</h3>
          <p>Embed YouTube, Vimeo, CodePen, and more.</p>
          <div class="badge badge-primary">Specialized</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Padding Variants -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Padding Variants</h2>
    <p class="text-lg mb-8">
      Every card component accepts a <code class="bg-base-200 px-2 py-1 rounded">padding</code> prop to control internal spacing. This gives you fine-grained control over card density and visual impact.
    </p>

    <div class="space-y-8">
      <!-- Comparison Grid -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">Side-by-Side Comparison</h3>
        <CardGrid columns={{ sm: 1, md: 2, lg: 4 }} gap="md">
          <ContentCard title="Compact" padding="compact" aspectRatio="4/3">
            <p class="text-base">Tight spacing (24px)</p>
          </ContentCard>
          <ContentCard title="Default" padding="default" aspectRatio="4/3">
            <p class="text-base">Balanced (32px)</p>
          </ContentCard>
          <ContentCard title="Spacious" padding="spacious" aspectRatio="4/3">
            <p class="text-base">Generous (48px)</p>
          </ContentCard>
          <MediaCard
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&auto=format&fit=crop"
            alt="Team"
            padding="none"
            aspectRatio="4/3"
          />
        </CardGrid>
      </div>

      <!-- Use Case Examples -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">Real-World Use Cases</h3>

        <!-- Compact for Dense Information -->
        <div class="mb-6">
          <h4 class="text-lg font-semibold mb-2">Compact: Information-Dense Dashboards</h4>
          <CardGrid columns={{ sm: 1, md: 3 }} gap="sm">
            <DataCard title="Users" value="2,847" label="Active" trend="up" trendValue="+12%" padding="compact" variant="metric" aspectRatio="4/3" />
            <DataCard title="Revenue" value="$48K" label="This Month" trend="up" trendValue="+8%" padding="compact" variant="metric" aspectRatio="4/3" />
            <DataCard title="Conversion" value="3.2%" label="Rate" trend="down" trendValue="-0.5%" padding="compact" variant="metric" aspectRatio="4/3" />
          </CardGrid>
        </div>

        <!-- Spacious for Impact -->
        <div class="mb-6">
          <h4 class="text-lg font-semibold mb-2">Spacious: Impactful Messaging</h4>
          <QuoteCard
            quote="SlideyUI transformed how we build presentations. The AI-first approach is revolutionary."
            author="Sarah Johnson"
            source="CEO, TechCorp"
            padding="spacious"
            aspectRatio="16/9"
          />
        </div>

        <!-- None for Media -->
        <div class="mb-6">
          <h4 class="text-lg font-semibold mb-2">None: Full-Bleed Media</h4>
          <CardGrid columns={{ sm: 1, md: 2 }} gap="md">
            <MediaCard
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop"
              alt="Team collaboration"
              padding="none"
              aspectRatio="16/9"
            />
            <SplitCard split={40} padding="none" aspectRatio="16/9">
              <div slot="left" class="bg-gradient-to-br from-blue-500 to-purple-600 h-full flex items-center justify-center">
                <span class="text-white text-4xl font-bold">40%</span>
              </div>
              <div slot="right" class="p-6 flex flex-col justify-center">
                <h3 class="text-2xl font-bold mb-2">Growth Rate</h3>
                <p>Custom layouts with manual padding control.</p>
              </div>
            </SplitCard>
          </CardGrid>
        </div>
      </div>

      <!-- Code Example -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">Code Example</h3>
        <CodeBlock code={`<!-- Compact padding for dense layouts -->
<DataCard
  title="Revenue"
  value="$1.2M"
  padding="compact"
  variant="metric"
/>

<!-- Default padding (balanced) -->
<ContentCard
  title="Overview"
  padding="default"
>
  <p>Most presentations use default padding.</p>
</ContentCard>

<!-- Spacious padding for impact -->
<QuoteCard
  quote="Amazing product!"
  author="Customer"
  padding="spacious"
/>

<!-- No padding for full-bleed -->
<MediaCard
  src="/image.jpg"
  padding="none"
/>`} lang="svelte" />
      </div>

      <!-- Best Practices Alert -->
      <div class="alert alert-info">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <h4 class="font-bold">Padding Best Practices</h4>
          <ul class="text-sm list-disc list-inside mt-2">
            <li><strong>Compact:</strong> Use for dashboards, metrics grids, or when showing many cards at once</li>
            <li><strong>Default:</strong> Safe choice for most content cards and mixed layouts</li>
            <li><strong>Spacious:</strong> Use for quotes, key messages, hero cards, or when you want visual impact</li>
            <li><strong>None:</strong> Use for full-bleed images, videos, or when you need complete layout control</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Documentation Link -->
  <section class="card bg-primary text-primary-content">
    <div class="card-body">
      <h2 class="card-title text-2xl">Complete Documentation</h2>
      <p>
        For full API reference, TypeScript types, and advanced examples,
        see the CARDS.md documentation in the @slideyui/react package.
      </p>
      <div class="card-actions">
        <a href="/docs/examples" class="btn btn-secondary">View Examples</a>
      </div>
    </div>
  </section>
</div>
