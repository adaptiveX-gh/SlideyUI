<!--
  BuildStep Component
  Progressive disclosure wrapper for step-by-step content reveal
-->

<script lang="ts">
  import { fade, fly, scale } from 'svelte/transition';
  import type { Snippet } from 'svelte';
  import { getBuildStepContext } from '../stores/buildStep';

  /**
   * Step number (when to appear)
   */
  export let step: number;

  /**
   * Animation type
   */
  export let animation: 'fade' | 'slide' | 'scale' | 'none' = 'fade';

  /**
   * Additional CSS classes
   */
  let className: string = '';
  export { className as class };

  /**
   * Content slot
   */
  export let children: Snippet | undefined = undefined;

  // Get build step context
  const buildStepContext = getBuildStepContext();

  // Determine if this step should be visible
  const isVisible = $derived(
    buildStepContext ? buildStepContext.isStepVisible(step) : true
  );

  // Get animation transition function
  function getTransition(node: HTMLElement) {
    switch (animation) {
      case 'slide':
        return fly(node, { x: 20, duration: 300 });
      case 'scale':
        return scale(node, { duration: 300 });
      case 'fade':
        return fade(node, { duration: 300 });
      case 'none':
      default:
        return { delay: 0, duration: 0 };
    }
  }
</script>

<!--
  Wrapper component for progressive disclosure of content
  Shows/hides content based on current build step

  Works in both traditional slide presentations and card-based layouts.
  Must be wrapped in a component that uses setBuildStepContext to function.

  @example
  Traditional slide usage:
  ```svelte
  <ContentSlide title="Progressive List">
    <BuildStep step={1}>First item appears</BuildStep>
    <BuildStep step={2}>Second item appears</BuildStep>
    <BuildStep step={3}>Third item appears</BuildStep>
  </ContentSlide>
  ```

  @example
  Card-based usage:
  ```svelte
  <script>
    import { createBuildStepStore, setBuildStepContext } from '@slideyui/svelte';

    const buildSteps = createBuildStepStore(3);
    setBuildStepContext(buildSteps);
  </script>

  <ContentCard title="Progressive Content">
    <BuildStep step={1}>
      <p>First point appears</p>
    </BuildStep>
    <BuildStep step={2}>
      <p>Second point appears</p>
    </BuildStep>
    <BuildStep step={3}>
      <p>Third point appears</p>
    </BuildStep>
  </ContentCard>
  ```

  @example
  Using with custom animations:
  ```svelte
  <BuildStep step={1} animation="slide">
    Slides in from right
  </BuildStep>
  <BuildStep step={2} animation="scale">
    Scales up from center
  </BuildStep>
  ```
-->

{#if isVisible}
  {#if animation === 'none'}
    <div class="slide-build-step {className}">
      {#if children}
        {@render children()}
      {/if}
    </div>
  {:else}
    <div
      class="slide-build-step slide-build-{animation} {className}"
      transition:getTransition
    >
      {#if children}
        {@render children()}
      {/if}
    </div>
  {/if}
{/if}
