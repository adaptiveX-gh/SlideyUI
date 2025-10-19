<script lang="ts">
  import {
    ContentCard,
    Hero,
    HeroContent,
    HeroTitle,
    HeroSubtitle,
    HeroActions,
    HeroButton,
    HeroSplit,
    HeroFigure
  } from '@slideyui/svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';

  const basicHeroCode = `<Hero>
  <HeroContent>
    <HeroTitle>Welcome to SlideyUI</HeroTitle>
    <HeroSubtitle>
      A presentation component library optimized for AI-first applications
    </HeroSubtitle>
    <HeroActions>
      <HeroButton href="#get-started">Get Started</HeroButton>
      <HeroButton variant="outline" href="#learn-more">Learn More</HeroButton>
    </HeroActions>
  </HeroContent>
</Hero>`;

  const backgroundImageHeroCode = `<Hero backgroundImage="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200">
  <HeroContent>
    <HeroTitle>Build Beautiful Presentations</HeroTitle>
    <HeroSubtitle>
      Presentation-optimized components with stunning visuals
    </HeroSubtitle>
    <HeroActions>
      <HeroButton>Start Building</HeroButton>
      <HeroButton variant="outline">View Examples</HeroButton>
    </HeroActions>
  </HeroContent>
</Hero>`;

  const overlayHeroCode = `<Hero
  backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200"
  overlay={true}
>
  <HeroContent>
    <HeroTitle>Innovation Starts Here</HeroTitle>
    <HeroSubtitle>
      Transform your ideas into stunning presentations
    </HeroSubtitle>
    <HeroActions>
      <HeroButton>Explore Features</HeroButton>
    </HeroActions>
  </HeroContent>
</Hero>`;

  const splitHeroCode = `<Hero>
  <HeroSplit>
    <HeroContent align="start">
      <HeroTitle>Modern Presentations Made Easy</HeroTitle>
      <HeroSubtitle>
        Create professional presentations with our AI-optimized component library.
        Perfect for cards, slides, and everything in between.
      </HeroSubtitle>
      <HeroActions>
        <HeroButton>Get Started</HeroButton>
        <HeroButton variant="outline">Documentation</HeroButton>
      </HeroActions>
    </HeroContent>
    <HeroFigure
      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
      alt="Dashboard visualization"
    />
  </HeroSplit>
</Hero>`;

  const splitReverseHeroCode = `<Hero>
  <HeroSplit reverse={true}>
    <HeroContent align="start">
      <HeroTitle>AI-First Design</HeroTitle>
      <HeroSubtitle>
        Built from the ground up for AI code generation and MCP servers.
      </HeroSubtitle>
      <HeroActions>
        <HeroButton>Learn More</HeroButton>
      </HeroActions>
    </HeroContent>
    <HeroFigure
      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"
      alt="Analytics charts"
    />
  </HeroSplit>
</Hero>`;

  const centeredHeroCode = `<Hero>
  <HeroContent align="center">
    <HeroTitle>Ship Faster, Present Better</HeroTitle>
    <HeroSubtitle>
      Everything you need to create stunning presentations at scale
    </HeroSubtitle>
    <HeroActions>
      <HeroButton>Start Free Trial</HeroButton>
      <HeroButton variant="outline">See Pricing</HeroButton>
    </HeroActions>
  </HeroContent>
</Hero>`;

  const fullWidthHeroCode = `<Hero
  backgroundImage="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600"
  overlay={true}
  class="min-h-[500px]"
>
  <HeroContent>
    <HeroTitle>The Future of Presentations</HeroTitle>
    <HeroSubtitle>
      Join thousands of developers building beautiful presentations with SlideyUI
    </HeroSubtitle>
    <HeroActions>
      <HeroButton>Join the Waitlist</HeroButton>
      <HeroButton variant="outline">Watch Demo</HeroButton>
    </HeroActions>
  </HeroContent>
</Hero>`;
</script>

<svelte:head>
  <title>Hero - SlideyUI Components</title>
</svelte:head>

<div class="container mx-auto px-6 py-12">
  <header class="mb-12">
    <h1 class="text-5xl font-bold mb-4">Hero</h1>
    <p class="text-xl text-base-content/70 max-w-3xl">
      Presentation-optimized hero sections for impactful openings. Includes centered content, background images, overlays, and split layouts perfect for cards and slides.
    </p>
  </header>

  <!-- Installation -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Installation</h2>
    <CodeBlock code={`import {
  Hero, HeroContent, HeroTitle, HeroSubtitle,
  HeroActions, HeroButton, HeroSplit, HeroFigure
} from '@slideyui/svelte';`} lang="typescript" />
  </section>

  <!-- Basic Hero -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Basic Hero</h2>

    <div class="mb-4">
      <ContentCard title="Simple Hero Example" aspectRatio="16/9">
        <Hero>
          <HeroContent>
            <HeroTitle>Welcome to SlideyUI</HeroTitle>
            <HeroSubtitle>
              A presentation component library optimized for AI-first applications
            </HeroSubtitle>
            <HeroActions>
              <HeroButton href="#get-started">Get Started</HeroButton>
              <HeroButton variant="outline" href="#learn-more">Learn More</HeroButton>
            </HeroActions>
          </HeroContent>
        </Hero>
      </ContentCard>
    </div>

    <CodeBlock code={basicHeroCode} lang="svelte" />
  </section>

  <!-- Hero with Background Image -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Hero with Background Image</h2>

    <div class="mb-4">
      <ContentCard title="Background Image Hero" aspectRatio="16/9">
        <Hero backgroundImage="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&auto=format&fit=crop">
          <HeroContent>
            <HeroTitle>Build Beautiful Presentations</HeroTitle>
            <HeroSubtitle>
              Presentation-optimized components with stunning visuals
            </HeroSubtitle>
            <HeroActions>
              <HeroButton>Start Building</HeroButton>
              <HeroButton variant="outline">View Examples</HeroButton>
            </HeroActions>
          </HeroContent>
        </Hero>
      </ContentCard>
    </div>

    <CodeBlock code={backgroundImageHeroCode} lang="svelte" />
  </section>

  <!-- Hero with Overlay Gradient -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Hero with Overlay Gradient</h2>

    <div class="mb-4">
      <ContentCard title="Overlay Hero" aspectRatio="16/9">
        <Hero
          backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop"
          overlay={true}
        >
          <HeroContent>
            <HeroTitle>Innovation Starts Here</HeroTitle>
            <HeroSubtitle>
              Transform your ideas into stunning presentations
            </HeroSubtitle>
            <HeroActions>
              <HeroButton>Explore Features</HeroButton>
            </HeroActions>
          </HeroContent>
        </Hero>
      </ContentCard>
    </div>

    <CodeBlock code={overlayHeroCode} lang="svelte" />
  </section>

  <!-- Split Layout Hero -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Split Layout Hero</h2>

    <div class="mb-4">
      <ContentCard title="Hero with Image" aspectRatio="16/9">
        <Hero>
          <HeroSplit>
            <HeroContent align="start">
              <HeroTitle>Modern Presentations Made Easy</HeroTitle>
              <HeroSubtitle>
                Create professional presentations with our AI-optimized component library.
                Perfect for cards, slides, and everything in between.
              </HeroSubtitle>
              <HeroActions>
                <HeroButton>Get Started</HeroButton>
                <HeroButton variant="outline">Documentation</HeroButton>
              </HeroActions>
            </HeroContent>
            <HeroFigure
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop"
              alt="Dashboard visualization"
            />
          </HeroSplit>
        </Hero>
      </ContentCard>
    </div>

    <CodeBlock code={splitHeroCode} lang="svelte" />
  </section>

  <!-- Split Layout Reverse -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Split Layout Reverse</h2>

    <div class="mb-4">
      <ContentCard title="Reversed Split Hero" aspectRatio="16/9">
        <Hero>
          <HeroSplit reverse={true}>
            <HeroContent align="start">
              <HeroTitle>AI-First Design</HeroTitle>
              <HeroSubtitle>
                Built from the ground up for AI code generation and MCP servers.
              </HeroSubtitle>
              <HeroActions>
                <HeroButton>Learn More</HeroButton>
              </HeroActions>
            </HeroContent>
            <HeroFigure
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop"
              alt="Analytics charts"
            />
          </HeroSplit>
        </Hero>
      </ContentCard>
    </div>

    <CodeBlock code={splitReverseHeroCode} lang="svelte" />
  </section>

  <!-- Centered Content -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Centered Content</h2>

    <div class="mb-4">
      <ContentCard title="Center Aligned" aspectRatio="16/9">
        <Hero>
          <HeroContent align="center">
            <HeroTitle>Ship Faster, Present Better</HeroTitle>
            <HeroSubtitle>
              Everything you need to create stunning presentations at scale
            </HeroSubtitle>
            <HeroActions>
              <HeroButton>Start Free Trial</HeroButton>
              <HeroButton variant="outline">See Pricing</HeroButton>
            </HeroActions>
          </HeroContent>
        </Hero>
      </ContentCard>
    </div>

    <CodeBlock code={centeredHeroCode} lang="svelte" />
  </section>

  <!-- Full-Width Hero -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Full-Width Hero</h2>

    <div class="mb-4">
      <ContentCard title="Full-Width Example" aspectRatio="16/9">
        <Hero
          backgroundImage="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&auto=format&fit=crop"
          overlay={true}
          class="min-h-[500px]"
        >
          <HeroContent>
            <HeroTitle>The Future of Presentations</HeroTitle>
            <HeroSubtitle>
              Join thousands of developers building beautiful presentations with SlideyUI
            </HeroSubtitle>
            <HeroActions>
              <HeroButton>Join the Waitlist</HeroButton>
              <HeroButton variant="outline">Watch Demo</HeroButton>
            </HeroActions>
          </HeroContent>
        </Hero>
      </ContentCard>
    </div>

    <CodeBlock code={fullWidthHeroCode} lang="svelte" />
  </section>

  <!-- API Reference -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">API Reference</h2>

    <div class="space-y-8">
      <div>
        <h3 class="text-2xl font-semibold mb-4">Hero Props</h3>
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
                <td><code>backgroundImage</code></td>
                <td><code>string</code></td>
                <td><code>undefined</code></td>
                <td>Background image URL</td>
              </tr>
              <tr>
                <td><code>overlay</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Apply gradient overlay</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 class="text-2xl font-semibold mb-4">HeroContent Props</h3>
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
                <td><code>align</code></td>
                <td><code>'center' | 'start' | 'end'</code></td>
                <td><code>'center'</code></td>
                <td>Content alignment</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 class="text-2xl font-semibold mb-4">HeroButton Props</h3>
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
                <td><code>variant</code></td>
                <td><code>'primary' | 'outline'</code></td>
                <td><code>'primary'</code></td>
                <td>Button style variant</td>
              </tr>
              <tr>
                <td><code>href</code></td>
                <td><code>string</code></td>
                <td><code>undefined</code></td>
                <td>Link URL (renders as anchor)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 class="text-2xl font-semibold mb-4">HeroSplit Props</h3>
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
                <td><code>reverse</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Reverse column order</td>
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
            <li>Use high-quality background images</li>
            <li>Keep hero titles concise and impactful</li>
            <li>Limit to 1-2 action buttons</li>
            <li>Ensure text contrast over images</li>
            <li>Test on different screen sizes</li>
          </ul>
        </div>
      </div>

      <div class="card bg-error/10 border border-error">
        <div class="card-body">
          <h3 class="card-title text-error">Don't</h3>
          <ul class="space-y-2">
            <li>Use low-quality or pixelated images</li>
            <li>Overcrowd with too much text</li>
            <li>Use more than 3 action buttons</li>
            <li>Forget mobile responsiveness</li>
            <li>Ignore accessibility contrast ratios</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Related -->
  <section>
    <h2 class="text-3xl font-bold mb-6">Related</h2>
    <div class="flex gap-4 flex-wrap">
      <a href="/docs/components/header" class="btn btn-outline">Header</a>
      <a href="/docs/components/footer" class="btn btn-outline">Footer</a>
      <a href="/docs/components/cards" class="btn btn-outline">Cards</a>
      <a href="/docs/components" class="btn btn-outline">All Components</a>
    </div>
  </section>
</div>
