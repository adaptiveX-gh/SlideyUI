<script lang="ts">
  import {
    ContentCard,
    MediaCard,
    DataCard,
    QuoteCard,
    SplitCard,
    EmbeddedCard,
    CardGrid,
    Divider
  } from '@slideyui/svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';

  const contentCardCode = `<ContentCard
  title="Card Title"
  description="Card subtitle"
  aspectRatio="16/9"
>
  <p>Card content goes here</p>
</ContentCard>`;

  const mediaCardCode = `<MediaCard
  src="https://images.unsplash.com/photo-1..."
  alt="Description"
  caption="Image caption"
  aspectRatio="16/9"
/>`;

  const dataCardCode = `<DataCard
  title="Metric"
  value="$1.2M"
  label="Revenue"
  trend="up"
  aspectRatio="4/3"
/>`;

  const quoteCardCode = `<QuoteCard
  quote="This is an amazing presentation library!"
  author="Jane Doe"
  role="CEO, Company"
  aspectRatio="16/9"
/>`;

  const splitCardCode = `<SplitCard
  aspectRatio="16/9"
  leftContent="60%"
>
  <div slot="left">
    <h3>Left Section</h3>
    <p>Content on the left side</p>
  </div>
  <div slot="right">
    <h3>Right Section</h3>
    <p>Content on the right side</p>
  </div>
</SplitCard>`;

  const embeddedCardCode = `<ContentCard title="Parent Card" aspectRatio="16/9">
  <p>This card contains embedded cards:</p>

  <EmbeddedCard title="Nested Card 1">
    <p>Content inside the embedded card</p>
  </EmbeddedCard>

  <EmbeddedCard title="Nested Card 2">
    <p>Another embedded card</p>

    <!-- Double nesting -->
    <EmbeddedCard title="Deeply Nested">
      <p>Cards can be nested multiple levels</p>
    </EmbeddedCard>
  </EmbeddedCard>
</ContentCard>`;

  const cardWithActionsCode = `<ContentCard
  title="Card with Actions"
  aspectRatio="16/9"
>
  <p>Card content with action buttons at the bottom</p>

  <div slot="footer" class="flex gap-2 mt-4">
    <button class="btn btn-primary">Accept</button>
    <button class="btn btn-outline">Decline</button>
  </div>
</ContentCard>`;

  const cardStylesCode = `<!-- Default card -->
<ContentCard title="Default" />

<!-- Bordered card -->
<ContentCard title="Bordered" bordered={true} />

<!-- Card with shadow -->
<ContentCard title="With Shadow" shadow="md" />

<!-- Featured variant -->
<ContentCard title="Featured" variant="featured" />

<!-- Minimal variant -->
<ContentCard title="Minimal" variant="minimal" />`;

  const imageOverlayCode = `<MediaCard
  src="https://images.unsplash.com/photo-1..."
  alt="Background"
  aspectRatio="16/9"
>
  <div class="absolute inset-0 bg-black/50 flex items-center justify-center p-8">
    <div class="text-white text-center">
      <h2 class="text-4xl font-bold mb-4">Overlay Content</h2>
      <p class="text-xl">Text and content over the image</p>
    </div>
  </div>
</MediaCard>`;

  const cardGridCode = `<CardGrid columns={{ sm: 1, md: 2, lg: 3 }} gap="lg">
  <ContentCard title="Card 1" aspectRatio="4/3">
    <p>First card in the grid</p>
  </ContentCard>

  <ContentCard title="Card 2" aspectRatio="4/3">
    <p>Second card</p>
  </ContentCard>

  <ContentCard title="Card 3" aspectRatio="4/3">
    <p>Third card</p>
  </ContentCard>
</CardGrid>`;

  const compactCardCode = `<ContentCard
  title="Compact Card"
  padding="compact"
  aspectRatio="4/3"
>
  <p>Uses less padding for dense layouts</p>
</ContentCard>`;

  const spaciousCardCode = `<ContentCard
  title="Spacious Card"
  padding="spacious"
  aspectRatio="16/9"
>
  <p>Extra padding for impactful presentations</p>
</ContentCard>`;
</script>

<svelte:head>
  <title>Cards - SlideyUI Components</title>
</svelte:head>

<div class="container mx-auto px-6 py-12">
  <header class="mb-12">
    <h1 class="text-5xl font-bold mb-4">Cards</h1>
    <p class="text-xl text-base-content/70 max-w-3xl">
      SlideyUI provides a comprehensive set of card components optimized for presentations. From simple content cards to complex nested layouts, cards are the building blocks of your slides.
    </p>
  </header>

  <!-- Card Types Overview -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Card Types</h2>
    <p class="text-lg text-base-content/70 mb-8">
      SlideyUI offers multiple specialized card components, each designed for specific content types.
    </p>

    <div class="space-y-12">
      <!-- ContentCard -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">ContentCard</h3>
        <p class="text-base-content/70 mb-4">
          The most versatile card type for general content. Perfect for text, lists, and mixed content.
        </p>

        <div class="mb-4">
          <ContentCard
            title="Welcome to SlideyUI"
            description="Build beautiful presentations with ease"
            aspectRatio="16/9"
            variant="featured"
          >
            <p class="mb-4">ContentCard is your go-to component for most presentation needs.</p>
            <ul class="space-y-2">
              <li>✓ Flexible content areas</li>
              <li>✓ Optional title and description</li>
              <li>✓ Multiple variants</li>
              <li>✓ Responsive sizing</li>
            </ul>
          </ContentCard>
        </div>

        <CodeBlock code={contentCardCode} lang="svelte" />
      </div>

      <!-- MediaCard -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">MediaCard</h3>
        <p class="text-base-content/70 mb-4">
          Optimized for images, videos, and visual content with optional captions.
        </p>

        <div class="mb-4 max-w-2xl">
          <MediaCard
            src="https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&auto=format&fit=crop"
            alt="Office space"
            caption="Modern workspace design"
            aspectRatio="16/9"
          />
        </div>

        <CodeBlock code={mediaCardCode} lang="svelte" />
      </div>

      <!-- DataCard -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">DataCard</h3>
        <p class="text-base-content/70 mb-4">
          Display metrics, statistics, and key data points with visual emphasis.
        </p>

        <div class="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <DataCard
            title="Revenue"
            value="$1.2M"
            label="Q4 2024"
            trend="up"
            aspectRatio="4/3"
          />
          <DataCard
            title="Users"
            value="25K"
            label="Active Monthly"
            trend="up"
            aspectRatio="4/3"
          />
          <DataCard
            title="Growth"
            value="42%"
            label="Year over Year"
            trend="up"
            aspectRatio="4/3"
          />
        </div>

        <CodeBlock code={dataCardCode} lang="svelte" />
      </div>

      <!-- QuoteCard -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">QuoteCard</h3>
        <p class="text-base-content/70 mb-4">
          Showcase testimonials, quotes, and customer feedback with elegant styling.
        </p>

        <div class="mb-4 max-w-3xl mx-auto">
          <QuoteCard
            quote="SlideyUI has completely transformed how we create presentations. The AI-first approach makes it incredibly easy to generate professional slides."
            author="Sarah Johnson"
            role="VP of Marketing, TechCorp"
            aspectRatio="16/9"
          />
        </div>

        <CodeBlock code={quoteCardCode} lang="svelte" />
      </div>

      <!-- SplitCard -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">SplitCard</h3>
        <p class="text-base-content/70 mb-4">
          Create side-by-side layouts for comparisons, before/after, or complementary content.
        </p>

        <div class="mb-4">
          <SplitCard aspectRatio="16/9" leftContent="60%">
            <div slot="left" class="space-y-4">
              <h3 class="text-2xl font-bold">Features</h3>
              <ul class="space-y-2">
                <li>✓ Customizable split ratio</li>
                <li>✓ Flexible content areas</li>
                <li>✓ Responsive layout</li>
                <li>✓ Perfect for comparisons</li>
              </ul>
            </div>
            <div slot="right" class="flex items-center justify-center bg-base-200 h-full rounded">
              <div class="text-center">
                <div class="text-4xl font-bold text-primary mb-2">60/40</div>
                <p class="text-base-content/70">Split Ratio</p>
              </div>
            </div>
          </SplitCard>
        </div>

        <CodeBlock code={splitCardCode} lang="svelte" />
      </div>
    </div>
  </section>

  <!-- Cards Within Cards -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Cards Within Cards (Nested)</h2>
    <p class="text-lg text-base-content/70 mb-8">
      Use EmbeddedCard to create hierarchical content structures. Nested cards automatically adjust their styling based on depth.
    </p>

    <div class="space-y-8">
      <!-- Basic Nesting -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">Basic Nesting</h3>
        <p class="text-base-content/70 mb-4">
          Embedded cards have reduced padding and lighter styling to maintain visual hierarchy.
        </p>

        <div class="mb-4 max-w-3xl">
          <ContentCard title="Project Overview" aspectRatio="16/9" variant="featured">
            <p class="mb-4">This project consists of multiple phases:</p>

            <EmbeddedCard title="Phase 1: Research">
              <p>Market analysis and user research</p>
              <ul class="mt-2 space-y-1 text-sm">
                <li>• User interviews</li>
                <li>• Competitive analysis</li>
                <li>• Requirements gathering</li>
              </ul>
            </EmbeddedCard>

            <EmbeddedCard title="Phase 2: Design">
              <p>UI/UX design and prototyping</p>
              <ul class="mt-2 space-y-1 text-sm">
                <li>• Wireframes</li>
                <li>• High-fidelity mockups</li>
                <li>• User testing</li>
              </ul>
            </EmbeddedCard>

            <EmbeddedCard title="Phase 3: Development">
              <p>Implementation and testing</p>
              <ul class="mt-2 space-y-1 text-sm">
                <li>• Frontend development</li>
                <li>• Backend integration</li>
                <li>• QA testing</li>
              </ul>
            </EmbeddedCard>
          </ContentCard>
        </div>

        <CodeBlock code={embeddedCardCode} lang="svelte" />
      </div>

      <!-- Deep Nesting -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">Deep Nesting</h3>
        <p class="text-base-content/70 mb-4">
          Cards can be nested multiple levels deep. Each level gets progressively lighter styling.
        </p>

        <div class="mb-4 max-w-3xl">
          <ContentCard title="Company Structure" aspectRatio="16/9">
            <p class="mb-4">Our organizational hierarchy:</p>

            <EmbeddedCard title="Executive Team">
              <p class="mb-3">C-level leadership</p>

              <EmbeddedCard title="Engineering">
                <p class="mb-2">Product development teams</p>

                <EmbeddedCard title="Frontend Team">
                  <p class="text-sm">React, Svelte, TypeScript</p>
                </EmbeddedCard>

                <EmbeddedCard title="Backend Team">
                  <p class="text-sm">Node.js, PostgreSQL, Redis</p>
                </EmbeddedCard>
              </EmbeddedCard>

              <EmbeddedCard title="Product & Design">
                <p class="text-sm">User experience and product strategy</p>
              </EmbeddedCard>
            </EmbeddedCard>
          </ContentCard>
        </div>

        <CodeBlock code={`<ContentCard title="Company Structure">
  <EmbeddedCard title="Executive Team">
    <EmbeddedCard title="Engineering">
      <EmbeddedCard title="Frontend Team">
        <p>React, Svelte, TypeScript</p>
      </EmbeddedCard>
    </EmbeddedCard>
  </EmbeddedCard>
</ContentCard>`} lang="svelte" />
      </div>

      <!-- Mixed Content Nesting -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">Mixed Content Nesting</h3>
        <p class="text-base-content/70 mb-4">
          Combine embedded cards with other content like dividers, lists, and media.
        </p>

        <div class="mb-4 max-w-3xl">
          <ContentCard title="Product Launch Plan" aspectRatio="16/9" variant="featured">
            <p class="mb-4">Timeline and deliverables:</p>

            <EmbeddedCard title="Pre-Launch (Weeks 1-4)">
              <ul class="space-y-2 mb-3">
                <li>✓ Beta testing</li>
                <li>✓ Marketing materials</li>
                <li>✓ Press outreach</li>
              </ul>

              <Divider variant="accent">Key Milestone</Divider>

              <DataCard
                title="Beta Users"
                value="500+"
                label="Target Signups"
                trend="up"
                aspectRatio="auto"
              />
            </EmbeddedCard>

            <Divider />

            <EmbeddedCard title="Launch Week">
              <p class="font-semibold text-primary mb-2">Go-live scheduled for Monday, 9 AM PST</p>
              <ul class="space-y-1 text-sm">
                <li>• Product Hunt launch</li>
                <li>• Social media campaign</li>
                <li>• Email announcement</li>
              </ul>
            </EmbeddedCard>
          </ContentCard>
        </div>

        <CodeBlock code={`<ContentCard title="Product Launch Plan">
  <EmbeddedCard title="Pre-Launch">
    <ul>...</ul>
    <Divider variant="accent">Key Milestone</Divider>
    <DataCard ... />
  </EmbeddedCard>

  <Divider />

  <EmbeddedCard title="Launch Week">
    <p>Go-live details...</p>
  </EmbeddedCard>
</ContentCard>`} lang="svelte" />
      </div>
    </div>
  </section>

  <!-- Card Variations -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Card Variations</h2>

    <div class="space-y-12">
      <!-- Card with Actions -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">Card with Actions</h3>
        <p class="text-base-content/70 mb-4">
          Add interactive elements and action buttons using the footer slot.
        </p>

        <div class="mb-4 max-w-2xl">
          <ContentCard title="Cookie Policy" aspectRatio="16/9">
            <p class="mb-4">We use cookies to enhance your browsing experience and analyze site traffic. By clicking "Accept All", you consent to our use of cookies.</p>

            <div slot="footer" class="flex gap-3">
              <button class="btn btn-primary flex-1">Accept All</button>
              <button class="btn btn-outline flex-1">Customize</button>
              <button class="btn btn-ghost">Decline</button>
            </div>
          </ContentCard>
        </div>

        <CodeBlock code={cardWithActionsCode} lang="svelte" />
      </div>

      <!-- Card Styles -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">Card Styles</h3>
        <p class="text-base-content/70 mb-4">
          Customize card appearance with borders, shadows, and variants.
        </p>

        <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <ContentCard title="Default Card" aspectRatio="4/3">
            <p>Basic card with default styling</p>
          </ContentCard>

          <ContentCard title="Bordered Card" bordered={true} aspectRatio="4/3">
            <p>Card with visible border</p>
          </ContentCard>

          <ContentCard title="Featured Variant" variant="featured" aspectRatio="4/3">
            <p>Emphasized styling for important content</p>
          </ContentCard>

          <ContentCard title="Minimal Variant" variant="minimal" aspectRatio="4/3">
            <p>Clean, understated appearance</p>
          </ContentCard>
        </div>

        <CodeBlock code={cardStylesCode} lang="svelte" />
      </div>

      <!-- Padding Options -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">Padding Options</h3>
        <p class="text-base-content/70 mb-4">
          Control internal spacing with padding variants.
        </p>

        <div class="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <ContentCard title="Compact" padding="compact" aspectRatio="4/3">
            <p>Less padding for dense layouts</p>
          </ContentCard>

          <ContentCard title="Default" padding="default" aspectRatio="4/3">
            <p>Balanced padding for most cases</p>
          </ContentCard>

          <ContentCard title="Spacious" padding="spacious" aspectRatio="4/3">
            <p>Extra padding for impact</p>
          </ContentCard>
        </div>

        <CodeBlock code={`<ContentCard padding="compact">...</ContentCard>
<ContentCard padding="default">...</ContentCard>
<ContentCard padding="spacious">...</ContentCard>`} lang="svelte" />
      </div>

      <!-- Image Overlay -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">Image with Overlay Content</h3>
        <p class="text-base-content/70 mb-4">
          Layer content over images for dramatic presentations.
        </p>

        <div class="mb-4 max-w-3xl">
          <MediaCard
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&auto=format&fit=crop"
            alt="Team collaboration"
            aspectRatio="16/9"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center justify-center p-12">
              <div class="text-white max-w-2xl">
                <h2 class="text-5xl font-bold mb-6">Transform Your Team</h2>
                <p class="text-2xl mb-8">Empower collaboration with AI-powered presentations</p>
                <button class="btn btn-primary btn-lg">Get Started</button>
              </div>
            </div>
          </MediaCard>
        </div>

        <CodeBlock code={imageOverlayCode} lang="svelte" />
      </div>

      <!-- Card Grid -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">Card Grid Layout</h3>
        <p class="text-base-content/70 mb-4">
          Use CardGrid for responsive, multi-column layouts.
        </p>

        <div class="mb-4">
          <CardGrid columns={{ sm: 1, md: 2, lg: 3 }} gap="lg">
            <ContentCard title="Feature 1" aspectRatio="4/3">
              <p>Fast performance</p>
            </ContentCard>

            <ContentCard title="Feature 2" aspectRatio="4/3">
              <p>Easy to use</p>
            </ContentCard>

            <ContentCard title="Feature 3" aspectRatio="4/3">
              <p>Fully customizable</p>
            </ContentCard>

            <ContentCard title="Feature 4" aspectRatio="4/3">
              <p>AI-powered</p>
            </ContentCard>

            <ContentCard title="Feature 5" aspectRatio="4/3">
              <p>Open source</p>
            </ContentCard>

            <ContentCard title="Feature 6" aspectRatio="4/3">
              <p>Great support</p>
            </ContentCard>
          </CardGrid>
        </div>

        <CodeBlock code={cardGridCode} lang="svelte" />
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
            <li>Use appropriate card types for content (MediaCard for images, DataCard for metrics)</li>
            <li>Maintain consistent aspect ratios across a presentation</li>
            <li>Use EmbeddedCard for hierarchical content</li>
            <li>Limit nesting to 2-3 levels for readability</li>
            <li>Use padding variants intentionally (compact for dense info, spacious for key messages)</li>
            <li>Add actions in the footer slot when needed</li>
            <li>Use CardGrid for consistent multi-column layouts</li>
          </ul>
        </div>
      </div>

      <div class="card bg-error/10 border border-error">
        <div class="card-body">
          <h3 class="card-title text-error">Don't</h3>
          <ul class="space-y-2">
            <li>Mix too many card variants on one slide</li>
            <li>Nest cards more than 3 levels deep</li>
            <li>Use ContentCard when a specialized card would be better</li>
            <li>Forget to set aspectRatio for consistent layouts</li>
            <li>Overcrowd cards with too much content</li>
            <li>Use different padding on cards meant to be visually similar</li>
            <li>Ignore the visual hierarchy when nesting</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- API Quick Reference -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Common Props</h2>
    <p class="text-lg text-base-content/70 mb-6">
      Most card components share these common properties:
    </p>

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
            <td><code class="text-sm">aspectRatio</code></td>
            <td><code class="text-sm">'16/9' | '4/3' | '1/1' | 'auto'</code></td>
            <td><code class="text-sm">'auto'</code></td>
            <td>Controls card dimensions</td>
          </tr>
          <tr>
            <td><code class="text-sm">padding</code></td>
            <td><code class="text-sm">'compact' | 'default' | 'spacious' | 'none'</code></td>
            <td><code class="text-sm">'default'</code></td>
            <td>Internal spacing</td>
          </tr>
          <tr>
            <td><code class="text-sm">bordered</code></td>
            <td><code class="text-sm">boolean</code></td>
            <td><code class="text-sm">false</code></td>
            <td>Show border</td>
          </tr>
          <tr>
            <td><code class="text-sm">variant</code></td>
            <td><code class="text-sm">'default' | 'featured' | 'minimal'</code></td>
            <td><code class="text-sm">'default'</code></td>
            <td>Visual style variant</td>
          </tr>
          <tr>
            <td><code class="text-sm">class</code></td>
            <td><code class="text-sm">string</code></td>
            <td><code class="text-sm">undefined</code></td>
            <td>Additional CSS classes</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- Next Steps -->
  <section>
    <h2 class="text-3xl font-bold mb-6">Related</h2>
    <div class="flex gap-4 flex-wrap">
      <a href="/docs/components" class="btn btn-outline">
        All Components
      </a>
      <a href="/docs/layouts" class="btn btn-outline">
        Layout Utilities
      </a>
      <a href="/docs/themes" class="btn btn-outline">
        Themes
      </a>
      <a href="/docs/examples" class="btn btn-primary">
        View Examples
      </a>
    </div>
  </section>
</div>
