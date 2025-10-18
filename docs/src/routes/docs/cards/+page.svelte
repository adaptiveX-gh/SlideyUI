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
