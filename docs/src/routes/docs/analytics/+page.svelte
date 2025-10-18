<script lang="ts">
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import {
    CardGrid,
    ContentCard,
    DataCard,
    setAnalyticsContext,
    type AnalyticsEvent
  } from '@slideyui/svelte';
  import { onMount } from 'svelte';

  let events = $state<AnalyticsEvent[]>([]);
  let analyticsEnabled = $state(false);

  const setupAnalytics = `import { setAnalyticsContext } from '@slideyui/svelte';
import { onMount } from 'svelte';

onMount(() => {
  setAnalyticsContext({
    enabled: true,
    onEvent: (event) => {
      console.log('Analytics Event:', event);
      // Send to your analytics service
      // analytics.track(event.type, event.data);
    }
  });
});`;

  const cardViewExample = `<script>
  import { ContentCard } from '@slideyui/svelte';
  import { cardView } from '@slideyui/svelte';
<\/script>

<ContentCard
  title="Tracked Card"
  use:cardView={{ threshold: 0.5 }}
>
  <p>This card tracks when it comes into view</p>
</ContentCard>`;

  const cardDwellExample = `<script>
  import { ContentCard } from '@slideyui/svelte';
  import { cardDwell } from '@slideyui/svelte';
<\/script>

<ContentCard
  title="Dwell Tracking"
  use:cardDwell={{ duration: 2000 }}
>
  <p>Tracks when user views this card for 2+ seconds</p>
</ContentCard>`;

  const cardInteractionExample = `<script>
  import { ContentCard } from '@slideyui/svelte';
  import { cardInteraction } from '@slideyui/svelte';
<\/script>

<ContentCard
  title="Interactive Card"
  interactive={true}
  use:cardInteraction
>
  <p>Tracks clicks, hovers, and focus events</p>
</ContentCard>`;

  const fullExample = `<script lang="ts">
  import { onMount } from 'svelte';
  import {
    CardGrid,
    ContentCard,
    DataCard,
    setAnalyticsContext,
    cardView,
    cardDwell,
    cardInteraction,
    type AnalyticsEvent
  } from '@slideyui/svelte';

  let events: AnalyticsEvent[] = [];

  onMount(() => {
    // Initialize analytics
    setAnalyticsContext({
      enabled: true,
      onEvent: (event) => {
        events = [...events, event];

        // Send to your analytics service
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', event.type, {
            card_id: event.cardId,
            card_title: event.data.title,
            timestamp: event.timestamp
          });
        }
      }
    });
  });
<\/script>

<CardGrid columns={{ sm: 1, md: 2, lg: 3 }} gap="lg">
  <ContentCard
    title="Welcome"
    use:cardView={{ threshold: 0.5 }}
    use:cardDwell={{ duration: 3000 }}
  >
    <p>Tracks views and 3-second dwells</p>
  </ContentCard>

  <DataCard
    variant="metric"
    title="Revenue"
    value="$2.4M"
    label="Total Revenue"
    interactive={true}
    use:cardInteraction
  >
    <!-- Tracks clicks and interactions -->
  </DataCard>
</CardGrid>

<!-- Display events -->
{#each events as event}
  <div class="alert">
    <span>{event.type}: {event.cardId} at {new Date(event.timestamp).toLocaleTimeString()}<\/span>
  </div>
{/each}`;

  onMount(() => {
    if (analyticsEnabled) {
      setAnalyticsContext({
        enabled: true,
        onEvent: (event) => {
          events = [...events, event];
        }
      });
    }
  });

  function toggleAnalytics() {
    analyticsEnabled = !analyticsEnabled;
    events = [];

    if (analyticsEnabled) {
      setAnalyticsContext({
        enabled: true,
        onEvent: (event) => {
          events = [...events, event];
        }
      });
    } else {
      setAnalyticsContext({ enabled: false });
    }
  }
</script>

<svelte:head>
  <title>Analytics - SlideyUI Documentation</title>
</svelte:head>

<h1>Analytics Integration</h1>

<p class="lead text-xl text-base-content/80 my-6">
  Built-in analytics tracking for card views, dwell time, and user interactions. Perfect for understanding how users engage with your presentations.
</p>

<div class="alert alert-info my-6">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
  <div>
    <h4 class="font-bold">Privacy-First Analytics</h4>
    <p class="text-sm">All tracking happens client-side. You control what data is collected and where it's sent. No third-party trackers included by default.</p>
  </div>
</div>

<h2>Quick Start</h2>

<p>Set up analytics in your app's root component:</p>

<CodeBlock code={setupAnalytics} lang="typescript" filename="+page.svelte" />

<h2>Analytics Events</h2>

<p>SlideyUI tracks three types of events:</p>

<div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title">card_view</h3>
      <p class="text-sm">Fires when a card becomes visible in the viewport</p>
      <div class="badge badge-primary">Intersection Observer</div>
    </div>
  </div>

  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title">card_dwell</h3>
      <p class="text-sm">Fires when a user views a card for a specified duration</p>
      <div class="badge badge-secondary">Time-based</div>
    </div>
  </div>

  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title">card_interaction</h3>
      <p class="text-sm">Fires on clicks, hovers, and focus events</p>
      <div class="badge badge-accent">User Actions</div>
    </div>
  </div>
</div>

<h2>Tracking Card Views</h2>

<p>Use the <code>cardView</code> action to track when cards become visible:</p>

<CodeBlock code={cardViewExample} lang="svelte" />

<div class="alert my-4">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
  <span><strong>threshold</strong> controls how much of the card must be visible (0.0 to 1.0). Default is 0.5 (50%).</span>
</div>

<h2>Tracking Dwell Time</h2>

<p>Measure how long users spend viewing a card:</p>

<CodeBlock code={cardDwellExample} lang="svelte" />

<div class="alert my-4">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
  <span><strong>duration</strong> is in milliseconds. Event fires once after the specified time.</span>
</div>

<h2>Tracking Interactions</h2>

<p>Track user interactions like clicks, hovers, and keyboard focus:</p>

<CodeBlock code={cardInteractionExample} lang="svelte" />

<h2>Live Demo</h2>

<div class="card bg-base-200 shadow-xl my-8">
  <div class="card-body">
    <h3 class="card-title">Interactive Analytics Demo</h3>
    <p>Toggle analytics on to see events in real-time. Scroll, click, and hover over the cards below.</p>

    <div class="form-control w-52 mt-4">
      <label class="cursor-pointer label">
        <span class="label-text">Enable Analytics</span>
        <input
          type="checkbox"
          class="toggle toggle-primary"
          checked={analyticsEnabled}
          onchange={toggleAnalytics}
        />
      </label>
    </div>
  </div>
</div>

{#if analyticsEnabled}
  <div class="bg-gradient-to-br from-base-100 to-base-200 p-8 rounded-lg my-8">
    <CardGrid columns={{ sm: 1, md: 2, lg: 3 }} gap="lg">
      <ContentCard
        title="View Tracking"
        subtitle="Scroll to trigger"
        aspectRatio="16/9"
        interactive={true}
        bordered={true}
        shadow={true}
      >
        <p>This card tracks when it comes into view (50% threshold)</p>
      </ContentCard>

      <ContentCard
        title="Dwell Tracking"
        subtitle="Stay for 2 seconds"
        aspectRatio="16/9"
        interactive={true}
        bordered={true}
        shadow={true}
      >
        <p>This card fires an event if you view it for 2+ seconds</p>
      </ContentCard>

      <ContentCard
        title="Click Tracking"
        subtitle="Click or hover me"
        aspectRatio="16/9"
        interactive={true}
        bordered={true}
        shadow={true}
      >
        <p>This card tracks all your interactions</p>
      </ContentCard>
    </CardGrid>
  </div>

  <div class="card bg-base-300 my-8">
    <div class="card-body">
      <h3 class="card-title">Event Log ({events.length} events)</h3>

      {#if events.length === 0}
        <p class="text-base-content/70">No events yet. Scroll, click, or interact with the cards above.</p>
      {:else}
        <div class="overflow-x-auto">
          <table class="table table-sm">
            <thead>
              <tr>
                <th>Type</th>
                <th>Card ID</th>
                <th>Timestamp</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {#each events.slice(-10).reverse() as event}
                <tr>
                  <td>
                    <div class="badge badge-sm
                      {event.type === 'card_view' ? 'badge-primary' : ''}
                      {event.type === 'card_dwell' ? 'badge-secondary' : ''}
                      {event.type === 'card_interaction' ? 'badge-accent' : ''}
                    ">
                      {event.type}
                    </div>
                  </td>
                  <td><code class="text-xs">{event.cardId}</code></td>
                  <td class="text-xs">{new Date(event.timestamp).toLocaleTimeString()}</td>
                  <td class="text-xs">{JSON.stringify(event.data).substring(0, 50)}...</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>

        <button class="btn btn-sm btn-outline mt-4" onclick={() => events = []}>
          Clear Events
        </button>
      {/if}
    </div>
  </div>
{:else}
  <div class="alert alert-warning my-8">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
    <span>Enable analytics above to see the live demo.</span>
  </div>
{/if}

<h2>Complete Example</h2>

<p>Here's a full example integrating with Google Analytics:</p>

<CodeBlock code={fullExample} lang="typescript" filename="presentation.svelte" />

<h2>Event Data Structure</h2>

<p>Each analytics event includes the following properties:</p>

<CodeBlock
  code={`interface AnalyticsEvent {
  type: 'card_view' | 'card_dwell' | 'card_interaction';
  cardId: string;
  timestamp: number;
  data: {
    // Card metadata
    title?: string;
    variant?: string;
    aspectRatio?: string;

    // View-specific
    visibilityRatio?: number;

    // Dwell-specific
    duration?: number;

    // Interaction-specific
    action?: 'click' | 'hover' | 'focus';

    // Presentation context
    theme?: string;
    currentSlide?: number;
    totalSlides?: number;
  };
}`}
  lang="typescript"
/>

<h2>Integration Examples</h2>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title">Google Analytics</h3>
      <CodeBlock
        code={`setAnalyticsContext({
  enabled: true,
  onEvent: (event) => {
    gtag('event', event.type, {
      card_id: event.cardId,
      ...event.data
    });
  }
});`}
        lang="javascript"
      />
    </div>
  </div>

  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title">Posthog</h3>
      <CodeBlock
        code={`setAnalyticsContext({
  enabled: true,
  onEvent: (event) => {
    posthog.capture(event.type, {
      card_id: event.cardId,
      ...event.data
    });
  }
});`}
        lang="javascript"
      />
    </div>
  </div>

  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title">Custom API</h3>
      <CodeBlock
        code={`setAnalyticsContext({
  enabled: true,
  onEvent: async (event) => {
    await fetch('/api/analytics', {
      method: 'POST',
      body: JSON.stringify(event)
    });
  }
});`}
        lang="javascript"
      />
    </div>
  </div>

  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title">Mixpanel</h3>
      <CodeBlock
        code={`setAnalyticsContext({
  enabled: true,
  onEvent: (event) => {
    mixpanel.track(event.type, {
      card_id: event.cardId,
      ...event.data
    });
  }
});`}
        lang="javascript"
      />
    </div>
  </div>
</div>

<h2>Privacy Considerations</h2>

<div class="alert alert-warning my-6">
  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
  <div>
    <h4 class="font-bold">Respect User Privacy</h4>
    <ul class="text-sm space-y-1 mt-2">
      <li>Always get user consent before enabling analytics</li>
      <li>Provide clear privacy policies</li>
      <li>Allow users to opt-out</li>
      <li>Don't collect personally identifiable information (PII)</li>
      <li>Comply with GDPR, CCPA, and other privacy regulations</li>
    </ul>
  </div>
</div>

<h2>Best Practices</h2>

<div class="space-y-4 my-8">
  <div class="collapse collapse-arrow bg-base-200">
    <input type="checkbox" />
    <div class="collapse-title font-medium">Use Unique Card IDs</div>
    <div class="collapse-content">
      <p>Give each card a meaningful ID to track it across sessions. Use descriptive names like "intro-slide" or "pricing-card".</p>
    </div>
  </div>

  <div class="collapse collapse-arrow bg-base-200">
    <input type="checkbox" />
    <div class="collapse-title font-medium">Set Appropriate Thresholds</div>
    <div class="collapse-content">
      <p>For view tracking, 0.5 (50%) is a good default. Adjust based on your needs - use higher values (0.8) for important content.</p>
    </div>
  </div>

  <div class="collapse collapse-arrow bg-base-200">
    <input type="checkbox" />
    <div class="collapse-title font-medium">Batch Events</div>
    <div class="collapse-content">
      <p>If you expect high traffic, batch events before sending to your analytics service to reduce network requests.</p>
    </div>
  </div>

  <div class="collapse collapse-arrow bg-base-200">
    <input type="checkbox" />
    <div class="collapse-title font-medium">Add Metadata</div>
    <div class="collapse-content">
      <p>Include presentation context in your events (theme, user role, session ID) to enable better analysis.</p>
    </div>
  </div>
</div>

<div class="divider my-12"></div>

<div class="flex gap-4">
  <a href="/docs/components" class="btn btn-outline">
    ← Components
  </a>
  <a href="/docs/examples" class="btn btn-primary">
    View Examples →
  </a>
</div>
