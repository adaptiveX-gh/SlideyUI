<script lang="ts">
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import {
    CardGrid,
    ContentCard,
    DataCard,
    MediaCard,
    SplitCard,
    QuoteCard,
    EmbedCard
  } from '@slideyui/svelte';

  const examples = [
    {
      title: 'Corporate Presentation',
      description: 'Professional business presentation with Q4 results using cards',
      theme: 'corporate',
      cards: 12,
      code: `import { Presentation, ContentCard, DataCard } from 'slideyui-react';

// Presentation Mode
<Presentation theme="corporate" showProgress>
  <ContentCard
    title="Q4 2024 Results"
    subtitle="Financial Performance Review"
    variant="featured"
  />

  <DataCard title="Key Metrics">
    <div className="stats shadow">
      <div className="stat">
        <div className="stat-title">Revenue</div>
        <div className="stat-value">$2.4M</div>
        <div className="stat-desc">↗︎ 340% growth</div>
      </div>
    </div>
  </DataCard>
</Presentation>`,
    },
    {
      title: 'Startup Pitch Deck',
      description: 'Bold pitch deck for Series A fundraising with card components',
      theme: 'pitch',
      cards: 15,
      code: `import { Presentation, ContentCard } from 'slideyui-react';

<Presentation theme="pitch" showProgress>
  <ContentCard
    title="Revolutionizing Presentations"
    subtitle="Seed Round | $2M Ask"
    variant="featured"
  />

  <ContentCard title="The Problem">
    <ul className="slide-list">
      <li>Traditional presentation tools are outdated</li>
      <li>Developers want code-based workflows</li>
      <li>No modern, web-first solutions</li>
    </ul>
  </ContentCard>

  <ContentCard title="Our Solution">
    <p className="slide-body-lg">
      SlideyUI brings presentation design into the modern web era
    </p>
  </ContentCard>
</Presentation>`,
    },
    {
      title: 'Academic Conference Talk',
      description: 'Research presentation with citations and data using QuoteCard',
      theme: 'academic',
      cards: 20,
      code: `import { Presentation, ContentCard, QuoteCard } from 'slideyui-react';

<Presentation theme="academic" showProgress showCardNumbers>
  <ContentCard
    title="Machine Learning in Healthcare"
    subtitle="Dr. Jane Smith | University of Technology"
    variant="featured"
  />

  <QuoteCard
    quote="AI models show 95% accuracy in diagnosis"
    author="Smith et al., 2024"
    title="Literature Review"
  />
</Presentation>`,
    },
    {
      title: 'Technical Workshop',
      description: 'Interactive coding workshop with live demos using ContentCard',
      theme: 'workshop',
      cards: 25,
      code: `import { Presentation, ContentCard } from 'slideyui-react';

<Presentation theme="workshop" presenterMode>
  <ContentCard
    title="Intro to React Hooks"
    subtitle="Hands-on Workshop"
    variant="featured"
  />

  <ContentCard title="useState Hook">
    <pre className="mockup-code"><code>{\`function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}\`}</code></pre>
  </ContentCard>
</Presentation>`,
    },
  ];

  const twoModeExample = `import { useState } from 'react';
import {
  Presentation,
  CardGrid,
  ContentCard,
  SplitCard,
  DataCard
} from 'slideyui-react';

function App() {
  const [mode, setMode] = useState('edit'); // 'edit' or 'present'

  const cards = [
    <ContentCard
      key="1"
      title="Product Launch 2025"
      subtitle="Introducing Our Latest Innovation"
      variant="featured"
    />,
    <SplitCard
      key="2"
      title="Market Opportunity"
      leftContent={
        <>
          <h3>Current Market</h3>
          <ul>
            <li>Total market size</li>
            <li>Annual growth rate</li>
            <li>Current solutions</li>
          </ul>
        </>
      }
      rightContent={
        <>
          <h3>Our Position</h3>
          <ul>
            <li>Unique value proposition</li>
            <li>Competitive advantage</li>
            <li>Strategic partnerships</li>
          </ul>
        </>
      }
    />,
    <DataCard key="3" title="Traction">
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Users</div>
          <div className="stat-value">10K+</div>
          <div className="stat-desc">Monthly active</div>
        </div>
      </div>
    </DataCard>,
    <ContentCard
      key="4"
      title="Let's Build Together"
      subtitle="contact@company.com"
      variant="featured"
    />
  ];

  return (
    <div>
      {/* Mode Toggle */}
      <button onClick={() => setMode(mode === 'edit' ? 'present' : 'edit')}>
        {mode === 'edit' ? 'Present' : 'Edit'}
      </button>

      {/* Editing Mode: Grid Layout */}
      {mode === 'edit' && (
        <CardGrid columns={{ sm: 1, md: 2, lg: 3 }} gap="lg">
          {cards}
        </CardGrid>
      )}

      {/* Presentation Mode: Full-Screen */}
      {mode === 'present' && (
        <Presentation theme="corporate" showProgress>
          {cards}
        </Presentation>
      )}
    </div>
  );
}`;
</script>

<svelte:head>
  <title>Examples - SlideyUI Documentation</title>
</svelte:head>

<h1>Example Presentations</h1>

<p class="lead text-xl text-base-content/80 my-6">
  Complete examples showing how to build presentations with SlideyUI's new card-based architecture.
  Each example shows both editing mode (CardGrid) and presentation mode (Presentation wrapper).
</p>

<div class="alert alert-success my-6">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <div>
    <h4 class="font-bold">New Card-Based Architecture</h4>
    <p class="text-sm">SlideyUI now uses flexible cards that work in both editing and presentation modes. Legacy Deck/Slide components are deprecated.</p>
  </div>
</div>

<div class="alert alert-warning my-6">
  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
  <div>
    <h4 class="font-bold">Migration Notice</h4>
    <p class="text-sm"><strong>Deprecated:</strong> Deck, TitleSlide, ContentSlide, ComparisonSlide, DataSlide components. <strong>Use instead:</strong> Presentation wrapper with ContentCard, MediaCard, SplitCard, DataCard, QuoteCard.</p>
  </div>
</div>

<h2 class="text-3xl font-bold mt-12 mb-6">Live Demo: Product Launch Presentation</h2>

<p class="text-lg mb-8">
  This is a fully interactive demo showing real SlideyUI cards. In edit mode (shown below), these cards would appear in a CardGrid. In presentation mode, they'd display full-screen with keyboard navigation. Try hovering over the cards!
</p>

<div class="bg-gradient-to-br from-base-100 to-base-200 p-8 rounded-lg my-8">
  <CardGrid columns={{ sm: 1, md: 2, lg: 3 }} gap="lg">
    <ContentCard
      title="Product Launch 2025"
      subtitle="Introducing Our Latest Innovation"
      aspectRatio="16/9"
      interactive={true}
      bordered={true}
      shadow={true}
      variant="featured"
    >
      <div slot="icon">
        <div class="text-4xl">🚀</div>
      </div>
      <p class="text-xl">
        Revolutionizing the way teams create and deliver presentations.
      </p>
    </ContentCard>

    <ContentCard
      title="Market Opportunity"
      subtitle="$5B TAM"
      aspectRatio="16/9"
      interactive={true}
      bordered={true}
      shadow={true}
    >
      <ul class="slide-list text-lg">
        <li>Growing demand for developer tools</li>
        <li>Shift toward code-based workflows</li>
        <li>AI-first presentation generation</li>
      </ul>
    </ContentCard>

    <DataCard
      variant="metric"
      title="Traction"
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
      title="Product Demo"
      caption="See it in action"
      aspectRatio="16/9"
      interactive={true}
      bordered={true}
      shadow={true}
    >
      <div class="w-full h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-5xl">
        🎬
      </div>
    </MediaCard>

    <ContentCard
      title="Competitive Advantage"
      aspectRatio="16/9"
      interactive={true}
      bordered={true}
      shadow={true}
    >
      <ul class="slide-list text-lg">
        <li>AI-first design</li>
        <li>Developer-friendly API</li>
        <li>Modern web technologies</li>
      </ul>
    </ContentCard>

    <ContentCard
      title="Let's Build Together"
      subtitle="contact@company.com"
      aspectRatio="16/9"
      interactive={true}
      bordered={true}
      shadow={true}
      variant="featured"
    >
      <div slot="icon">
        <div class="text-4xl">💬</div>
      </div>
      <p class="text-xl">
        Ready to transform your presentations?
      </p>
    </ContentCard>
  </CardGrid>
</div>

<div class="alert alert-info my-8">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <div>
    <strong>Edit vs. Presentation Mode:</strong> The cards above show "edit mode" in a CardGrid. Wrap these same cards with <code class="bg-base-300 px-2 py-1 rounded">&lt;Presentation&gt;</code> to display them full-screen with keyboard navigation (←/→ arrows).
  </div>
</div>

<h2>Example Gallery</h2>

<div class="space-y-8 my-8">
  {#each examples as example}
    <div class="card bg-base-200 shadow-xl">
      <div class="card-body">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="card-title text-2xl">{example.title}</h3>
            <p class="text-base-content/70 mt-2">{example.description}</p>
          </div>
          <div class="badge badge-primary">{example.cards} cards</div>
        </div>

        <div class="divider">Code Excerpt</div>

        <CodeBlock code={example.code} lang="html" />

        <div class="card-actions justify-end mt-4">
          <a href="/demo" class="btn btn-primary btn-sm">
            View Live Demo
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  {/each}
</div>

<h2>Two-Mode Architecture Example</h2>

<p>
  The key feature of SlideyUI is the ability to use the same cards in both editing and presentation modes.
  Toggle between CardGrid (editing) and Presentation (full-screen) seamlessly:
</p>

<CodeBlock code={twoModeExample} lang="tsx" filename="App.tsx" />

<div class="alert my-6">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <div>
    <h4 class="font-bold">Why Two Modes?</h4>
    <p class="text-sm">Edit mode (CardGrid) gives you an overview and easy organization. Presentation mode (Presentation) provides the full-screen, keyboard-navigable experience your audience expects.</p>
  </div>
</div>

<h2>Example Use Cases</h2>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title">Product Launch</h3>
      <ul class="space-y-2 text-sm">
        <li>Market opportunity overview</li>
        <li>Product demo with screenshots</li>
        <li>Customer testimonials</li>
        <li>Pricing and availability</li>
        <li>Call to action</li>
      </ul>
      <div class="card-actions justify-end">
        <button class="btn btn-sm btn-outline">View Template</button>
      </div>
    </div>
  </div>

  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title">Sales Pitch</h3>
      <ul class="space-y-2 text-sm">
        <li>Problem identification</li>
        <li>Solution presentation</li>
        <li>ROI calculator</li>
        <li>Case studies</li>
        <li>Next steps</li>
      </ul>
      <div class="card-actions justify-end">
        <button class="btn btn-sm btn-outline">View Template</button>
      </div>
    </div>
  </div>

  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title">Technical Tutorial</h3>
      <ul class="space-y-2 text-sm">
        <li>Concept introduction</li>
        <li>Step-by-step instructions</li>
        <li>Code examples with syntax highlighting</li>
        <li>Common pitfalls</li>
        <li>Further resources</li>
      </ul>
      <div class="card-actions justify-end">
        <button class="btn btn-sm btn-outline">View Template</button>
      </div>
    </div>
  </div>

  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title">Data Analysis</h3>
      <ul class="space-y-2 text-sm">
        <li>Executive summary</li>
        <li>Key metrics dashboard</li>
        <li>Trend analysis charts</li>
        <li>Insights and recommendations</li>
        <li>Action items</li>
      </ul>
      <div class="card-actions justify-end">
        <button class="btn btn-sm btn-outline">View Template</button>
      </div>
    </div>
  </div>

  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title">Team Update</h3>
      <ul class="space-y-2 text-sm">
        <li>Previous period recap</li>
        <li>Current priorities</li>
        <li>Roadmap preview</li>
        <li>Team highlights</li>
        <li>Q&A preparation</li>
      </ul>
      <div class="card-actions justify-end">
        <button class="btn btn-sm btn-outline">View Template</button>
      </div>
    </div>
  </div>

  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title">Conference Talk</h3>
      <ul class="space-y-2 text-sm">
        <li>Speaker introduction</li>
        <li>Topic overview</li>
        <li>Deep dive sections</li>
        <li>Live demos</li>
        <li>Resources and contact info</li>
      </ul>
      <div class="card-actions justify-end">
        <button class="btn btn-sm btn-outline">View Template</button>
      </div>
    </div>
  </div>
</div>

<h2>Presentation Structure Guide</h2>

<div class="timeline my-8">
  <div class="timeline-item">
    <div class="timeline-start">Opening</div>
    <div class="timeline-middle">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-primary"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>
    </div>
    <div class="timeline-end timeline-box">
      <strong>Title Slide</strong> - Grab attention, set expectations
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-start">Context</div>
    <div class="timeline-middle">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-primary"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>
    </div>
    <div class="timeline-end timeline-box">
      <strong>Problem/Background</strong> - Why this matters
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-start">Content</div>
    <div class="timeline-middle">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-primary"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>
    </div>
    <div class="timeline-end timeline-box">
      <strong>Main Content</strong> - Your key points (3-5 sections)
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-start">Evidence</div>
    <div class="timeline-middle">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-primary"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>
    </div>
    <div class="timeline-end timeline-box">
      <strong>Data/Examples</strong> - Support your claims
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-start">Closing</div>
    <div class="timeline-middle">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-primary"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>
    </div>
    <div class="timeline-end timeline-box">
      <strong>Call to Action</strong> - What happens next?
    </div>
  </div>
</div>

<h2>Tips for Great Presentations</h2>

<div class="collapse collapse-arrow bg-base-200 mb-2">
  <input type="checkbox" />
  <div class="collapse-title text-lg font-medium">Keep it Simple</div>
  <div class="collapse-content">
    <p>One idea per slide. If a slide feels crowded, split it into two slides.</p>
  </div>
</div>

<div class="collapse collapse-arrow bg-base-200 mb-2">
  <input type="checkbox" />
  <div class="collapse-title text-lg font-medium">Use Visuals</div>
  <div class="collapse-content">
    <p>Images, charts, and diagrams communicate faster than text. Use them liberally.</p>
  </div>
</div>

<div class="collapse collapse-arrow bg-base-200 mb-2">
  <input type="checkbox" />
  <div class="collapse-title text-lg font-medium">Practice Timing</div>
  <div class="collapse-content">
    <p>Aim for 1-2 minutes per slide. A 20-minute presentation should have 10-20 slides.</p>
  </div>
</div>

<div class="collapse collapse-arrow bg-base-200 mb-2">
  <input type="checkbox" />
  <div class="collapse-title text-lg font-medium">Test Your Setup</div>
  <div class="collapse-content">
    <p>Always test on the actual equipment before presenting. Check resolution, colors, and animations.</p>
  </div>
</div>

<h2>Download Templates</h2>

<div class="flex flex-wrap gap-4 my-8">
  <button class="btn btn-primary">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
    All Templates (ZIP)
  </button>
  <button class="btn btn-outline">Starter Template</button>
  <button class="btn btn-outline">Pitch Deck Template</button>
  <button class="btn btn-outline">Workshop Template</button>
</div>

<div class="divider my-12"></div>

<div class="text-center">
  <h2 class="text-2xl font-bold mb-4">Ready to Create Your Presentation?</h2>
  <p class="mb-6">Start with a template or build from scratch</p>
  <div class="flex gap-4 justify-center">
    <a href="/docs/intro" class="btn btn-primary">Get Started</a>
    <a href="https://github.com/yourusername/slideyui/tree/main/examples" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
      Browse GitHub Examples
    </a>
  </div>
</div>
