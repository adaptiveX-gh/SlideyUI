<script lang="ts">
	/**
	 * LiveCardDemo Component
	 * Interactive demo for showing SlideyUI cards in action
	 * Uses @slideyui/svelte for live, editable examples
	 */

	import { CardGrid, ContentCard, MediaCard, DataCard } from '@slideyui/svelte';

	// Demo controls
	let showBorders = true;
	let cardShadow = true;
	let interactive = true;
	let aspectRatio: '16/9' | '4/3' | '1/1' = '16/9';
	let gridGap: 'sm' | 'md' | 'lg' | 'xl' = 'lg';
</script>

<div class="card-demo">
	<!-- Demo Controls -->
	<div class="controls mb-6 p-4 bg-base-200 rounded-lg">
		<h3 class="text-lg font-semibold mb-4">Try it yourself:</h3>

		<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
			<label class="flex items-center gap-2 cursor-pointer">
				<input type="checkbox" bind:checked={showBorders} class="checkbox checkbox-sm" />
				<span>Borders</span>
			</label>

			<label class="flex items-center gap-2 cursor-pointer">
				<input type="checkbox" bind:checked={cardShadow} class="checkbox checkbox-sm" />
				<span>Shadow</span>
			</label>

			<label class="flex items-center gap-2 cursor-pointer">
				<input type="checkbox" bind:checked={interactive} class="checkbox checkbox-sm" />
				<span>Interactive</span>
			</label>

			<label class="flex flex-col gap-1">
				<span class="text-sm">Aspect Ratio</span>
				<select bind:value={aspectRatio} class="select select-sm select-bordered">
					<option value="16/9">16:9</option>
					<option value="4/3">4:3</option>
					<option value="1/1">1:1</option>
				</select>
			</label>

			<label class="flex flex-col gap-1">
				<span class="text-sm">Grid Gap</span>
				<select bind:value={gridGap} class="select select-sm select-bordered">
					<option value="sm">Small</option>
					<option value="md">Medium</option>
					<option value="lg">Large</option>
					<option value="xl">Extra Large</option>
				</select>
			</label>
		</div>
	</div>

	<!-- Live Demo -->
	<div class="demo-container">
		<CardGrid columns={{ sm: 1, md: 2, lg: 3 }} gap={gridGap}>
			<ContentCard
				title="Welcome to SlideyUI"
				subtitle="AI-First Presentation Components"
				{aspectRatio}
				bordered={showBorders}
				shadow={cardShadow}
				{interactive}
			>
				<p class="text-2xl">
					Build beautiful presentations with card-based components optimized for AI generation.
				</p>
			</ContentCard>

			<DataCard
				variant="metric"
				title="Developer Experience"
				value="10/10"
				label="User Rating"
				trend="up"
				trendValue="+25%"
				{aspectRatio}
				bordered={showBorders}
				shadow={cardShadow}
				{interactive}
			/>

			<ContentCard
				title="Key Features"
				{aspectRatio}
				bordered={showBorders}
				shadow={cardShadow}
				{interactive}
			>
				<ul class="slide-list text-lg">
					<li>24px minimum fonts</li>
					<li>High contrast colors</li>
					<li>Aspect ratio aware</li>
					<li>AI-ready state tracking</li>
				</ul>
			</ContentCard>
		</CardGrid>
	</div>

	<!-- Code Preview -->
	<div class="mt-6">
		<details class="collapse collapse-arrow bg-base-200">
			<summary class="collapse-title text-lg font-medium">View Source Code</summary>
			<div class="collapse-content">
				<pre class="text-sm bg-base-300 p-4 rounded overflow-x-auto"><code>&lt;script&gt;
  import &#123; CardGrid, ContentCard, DataCard &#125; from '@slideyui/svelte';
&lt;/script&gt;

&lt;CardGrid columns=&#123;&#123; sm: 1, md: 2, lg: 3 &#125;&#125; gap="{gridGap}"&gt;
  &lt;ContentCard
    title="Welcome to SlideyUI"
    subtitle="AI-First Presentation Components"
    aspectRatio="{aspectRatio}"
    bordered=&#123;{showBorders}&#125;
    shadow=&#123;{cardShadow}&#125;
    interactive=&#123;{interactive}&#125;
  &gt;
    &lt;p&gt;Build beautiful presentations...&lt;/p&gt;
  &lt;/ContentCard&gt;

  &lt;DataCard
    variant="metric"
    title="Developer Experience"
    value="10/10"
    trend="up"
    trendValue="+25%"
    aspectRatio="{aspectRatio}"
  /&gt;
&lt;/CardGrid&gt;</code></pre>
			</div>
		</details>
	</div>
</div>

<style>
	.card-demo {
		@apply my-8;
	}

	.demo-container {
		@apply bg-gradient-to-br from-base-100 to-base-200 p-8 rounded-lg;
	}
</style>
