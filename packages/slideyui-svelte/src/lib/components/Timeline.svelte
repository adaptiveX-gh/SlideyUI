<!--
  Timeline Component
  Timeline visualization for chronological events
-->

<script lang="ts">
  import type { Snippet } from 'svelte';

  /**
   * Timeline event interface
   */
  export interface TimelineEvent {
    /** Event title */
    title: string;
    /** Event description */
    description?: string;
    /** Event date/time */
    date?: string;
    /** Event icon snippet */
    icon?: Snippet;
  }

  /**
   * Timeline events
   */
  export let events: TimelineEvent[];

  /**
   * Timeline orientation
   */
  export let orientation: 'vertical' | 'horizontal' = 'vertical';

  /**
   * Timeline variant
   */
  export let variant: 'default' | 'minimal' | 'detailed' = 'default';

  /**
   * Additional CSS classes
   */
  let className: string = '';
  export { className as class };
</script>

<!--
  Timeline component for displaying chronological events

  @example
  ```svelte
  <Timeline
    orientation="vertical"
    variant="detailed"
    events={[
      { title: '2020', description: 'Company founded', date: 'Jan 2020' },
      { title: '2021', description: 'Series A funding', date: 'Mar 2021' },
      { title: '2022', description: 'Product launch', date: 'Jun 2022' },
    ]}
  />
  ```
-->

<div
  class="slide-timeline slide-timeline-{orientation} slide-timeline-{variant} {className}"
>
  {#each events as event, index}
    <div class="slide-timeline-item">
      <div class="slide-timeline-marker">
        {#if event.icon}
          <div class="slide-timeline-icon">
            {@render event.icon()}
          </div>
        {:else}
          <div class="slide-timeline-dot" />
        {/if}
      </div>

      <div class="slide-timeline-content">
        {#if event.date}
          <div class="slide-timeline-date">{event.date}</div>
        {/if}
        <h4 class="slide-timeline-title">{event.title}</h4>
        {#if event.description}
          <p class="slide-timeline-description">{event.description}</p>
        {/if}
      </div>

      {#if index < events.length - 1}
        <div class="slide-timeline-connector" />
      {/if}
    </div>
  {/each}
</div>
