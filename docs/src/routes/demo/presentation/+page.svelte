<script lang="ts">
  import {
    Presentation,
    ContentCard,
    DataCard,
    MediaCard,
    QuoteCard,
    SplitCard,
    EmbedCard,
    CardStack,
    CollapsibleSection,
    CardNotes,
    PresentationProgress,
    PresentationNumber
  } from '@slideyui/svelte';
  import { onMount } from 'svelte';

  let presentationMode = $state(false);
  let currentTheme = $state<'corporate' | 'pitch' | 'academic' | 'workshop' | 'startup'>('corporate');

  const themes = ['corporate', 'pitch', 'academic', 'workshop', 'startup'] as const;
</script>

<svelte:head>
  <title>Presentation Demo - SlideyUI</title>
</svelte:head>

<div class="container mx-auto px-6 py-12">
  <!-- Controls -->
  <div class="card bg-base-200 shadow-xl mb-8">
    <div class="card-body">
      <h2 class="card-title">Presentation Mode Demo</h2>
      <p>Switch between editing (CardGrid) and presentation (Presentation) modes to see the difference.</p>

      <div class="flex flex-wrap gap-4 items-center mt-4">
        <button
          class="btn btn-primary"
          onclick={() => presentationMode = !presentationMode}
        >
          {presentationMode ? 'Exit Presentation' : 'Enter Presentation Mode'}
        </button>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Theme:</span>
          </label>
          <select
            class="select select-bordered"
            bind:value={currentTheme}
          >
            {#each themes as theme}
              <option value={theme}>{theme.charAt(0).toUpperCase() + theme.slice(1)}</option>
            {/each}
          </select>
        </div>
      </div>

      <div class="alert alert-info mt-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>
          {#if presentationMode}
            Use arrow keys (← →) to navigate. Press ESC to exit presentation mode.
          {:else}
            Click "Enter Presentation Mode" to view cards full-screen with keyboard navigation.
          {/if}
        </span>
      </div>
    </div>
  </div>

  <!-- Presentation Content -->
  {#if presentationMode}
    <Presentation
      theme={currentTheme}
      showProgress={true}
      showCardNumbers={true}
    >
      <!-- Title Slide -->
      <ContentCard
        title="SlideyUI Presentation Demo"
        subtitle="AI-First Component Library"
        aspectRatio="16/9"
        variant="featured"
      >
        <div slot="icon">
          <div class="text-6xl">🎯</div>
        </div>
        <p class="text-2xl">
          Building modern presentations with Svelte components
        </p>
        <CardNotes>
          <p>Welcome the audience. Introduce yourself and the topic. This demo showcases all the features of SlideyUI's Presentation mode.</p>
        </CardNotes>
      </ContentCard>

      <!-- Content with Collapsible Sections -->
      <ContentCard
        title="Key Features"
        subtitle="What makes SlideyUI different"
        aspectRatio="16/9"
      >
        <CollapsibleSection title="AI-First Design" open={true}>
          <p class="text-xl">Components optimized for AI code generation and streaming content.</p>
        </CollapsibleSection>
        <CollapsibleSection title="Presentation Ready">
          <p class="text-xl">Every component works in both editing and full-screen presentation modes.</p>
        </CollapsibleSection>
        <CollapsibleSection title="Framework Support">
          <p class="text-xl">Available for React, Svelte, and more coming soon.</p>
        </CollapsibleSection>
        <CardNotes>
          <p>Emphasize the dual-mode architecture. Mention how the same components work in both contexts.</p>
        </CardNotes>
      </ContentCard>

      <!-- Data Metrics -->
      <DataCard
        variant="metric"
        title="Adoption"
        value="10K+"
        label="Monthly Active Users"
        trend="up"
        trendValue="+340%"
        aspectRatio="16/9"
      >
        <CardNotes>
          <p>Highlight the rapid growth. Mention community engagement and feedback.</p>
        </CardNotes>
      </DataCard>

      <!-- Split Comparison -->
      <SplitCard
        title="Edit vs. Presentation Mode"
        aspectRatio="16/9"
        split={50}
      >
        <div slot="left">
          <h3 class="text-2xl font-bold mb-4">Edit Mode</h3>
          <ul class="space-y-3 text-lg">
            <li class="flex items-start gap-2">
              <span class="text-primary">✓</span>
              <span>Grid layout for organization</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary">✓</span>
              <span>Drag and drop support</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary">✓</span>
              <span>See all cards at once</span>
            </li>
          </ul>
        </div>
        <div slot="right">
          <h3 class="text-2xl font-bold mb-4">Presentation Mode</h3>
          <ul class="space-y-3 text-lg">
            <li class="flex items-start gap-2">
              <span class="text-secondary">✓</span>
              <span>Full-screen display</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-secondary">✓</span>
              <span>Keyboard navigation</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-secondary">✓</span>
              <span>Progress indicators</span>
            </li>
          </ul>
        </div>
        <CardNotes>
          <p>Explain how you can toggle between modes seamlessly. The same components work in both contexts.</p>
        </CardNotes>
      </SplitCard>

      <!-- Quote -->
      <QuoteCard
        quote="SlideyUI transformed how we build presentations. The AI-first approach saves us hours of work."
        author="Jane Developer"
        source="Senior Engineer, TechCorp"
        aspectRatio="16/9"
      >
        <CardNotes>
          <p>Share this testimonial about developer experience and productivity gains.</p>
        </CardNotes>
      </QuoteCard>

      <!-- Media/Visual -->
      <MediaCard
        title="Beautiful Design"
        caption="Projection-optimized components"
        aspectRatio="16/9"
      >
        <div class="w-full h-96 bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 flex items-center justify-center text-8xl">
          🎨
        </div>
        <CardNotes>
          <p>Talk about the design philosophy: 24px minimum fonts, 5% safe zones, WCAG AAA compliance.</p>
        </CardNotes>
      </MediaCard>

      <!-- Stacked Cards -->
      <CardStack maxVisible={3} offsetX={20} offsetY={20}>
        <ContentCard
          title="Layer 1: Core Components"
          aspectRatio="16/9"
        >
          <p class="text-xl">CardContainer, CardGrid - the foundation</p>
        </ContentCard>
        <ContentCard
          title="Layer 2: Specialized Cards"
          aspectRatio="16/9"
        >
          <p class="text-xl">ContentCard, DataCard, MediaCard, QuoteCard</p>
        </ContentCard>
        <ContentCard
          title="Layer 3: Advanced Features"
          aspectRatio="16/9"
        >
          <p class="text-xl">Analytics, theming, presentation mode</p>
        </ContentCard>
      </CardStack>

      <!-- Embedded Content -->
      <EmbedCard
        provider="youtube"
        embedUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Product Demo"
        caption="Watch our 2-minute overview"
        aspectRatio="16/9"
      >
        <CardNotes>
          <p>Play the demo video if time permits. Otherwise, direct audience to watch it later.</p>
        </CardNotes>
      </EmbedCard>

      <!-- Call to Action -->
      <ContentCard
        title="Get Started Today"
        subtitle="npm install @slideyui/svelte"
        aspectRatio="16/9"
        variant="featured"
      >
        <div slot="icon">
          <div class="text-6xl">🚀</div>
        </div>
        <div class="text-xl space-y-4">
          <p>Visit docs.slideyui.com for full documentation</p>
          <p>GitHub: github.com/yourusername/slideyui</p>
        </div>
        <CardNotes>
          <p>Thank the audience. Open the floor for questions. Share contact information.</p>
        </CardNotes>
      </ContentCard>
    </Presentation>
  {:else}
    <!-- Edit Mode Preview -->
    <div class="space-y-6">
      <h2 class="text-3xl font-bold">Edit Mode (Card Grid)</h2>
      <p class="text-lg text-base-content/70">
        Below is what the cards look like in editing mode. Click "Enter Presentation Mode" above to see them full-screen.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ContentCard
          title="SlideyUI Presentation Demo"
          subtitle="AI-First Component Library"
          aspectRatio="16/9"
          variant="featured"
          interactive={true}
          bordered={true}
          shadow={true}
        >
          <div slot="icon">
            <div class="text-4xl">🎯</div>
          </div>
          <p class="text-lg">
            Building modern presentations with Svelte components
          </p>
        </ContentCard>

        <ContentCard
          title="Key Features"
          subtitle="What makes SlideyUI different"
          aspectRatio="16/9"
          interactive={true}
          bordered={true}
          shadow={true}
        >
          <ul class="space-y-2">
            <li>AI-First Design</li>
            <li>Presentation Ready</li>
            <li>Framework Support</li>
          </ul>
        </ContentCard>

        <DataCard
          variant="metric"
          title="Adoption"
          value="10K+"
          label="Monthly Active Users"
          trend="up"
          trendValue="+340%"
          aspectRatio="16/9"
          interactive={true}
          bordered={true}
          shadow={true}
        />

        <MediaCard
          title="Beautiful Design"
          caption="Projection-optimized"
          aspectRatio="16/9"
          interactive={true}
          bordered={true}
          shadow={true}
        >
          <div class="w-full h-48 bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 flex items-center justify-center text-6xl">
            🎨
          </div>
        </MediaCard>

        <QuoteCard
          quote="SlideyUI transformed how we build presentations."
          author="Jane Developer"
          source="TechCorp"
          aspectRatio="16/9"
          interactive={true}
          bordered={true}
          shadow={true}
        />

        <ContentCard
          title="Get Started Today"
          subtitle="npm install @slideyui/svelte"
          aspectRatio="16/9"
          variant="featured"
          interactive={true}
          bordered={true}
          shadow={true}
        >
          <div slot="icon">
            <div class="text-4xl">🚀</div>
          </div>
        </ContentCard>
      </div>
    </div>
  {/if}
</div>
