<script lang="ts">
	/**
	 * ComponentPreview
	 * Wrapper for showing live component examples in documentation
	 */

	import CodeBlock from './CodeBlock.svelte';

	export let title: string;
	export let description: string | undefined = undefined;
	export let code: string | undefined = undefined;
</script>

<div class="component-preview my-8">
	<div class="preview-header mb-4">
		<h3 class="text-2xl font-bold">{title}</h3>
		{#if description}
			<p class="text-base-content/70 mt-2">{description}</p>
		{/if}
	</div>

	<div class="preview-body">
		<slot />
	</div>

	{#if code || $$slots.code}
		<div class="preview-code mt-4">
			{#if code}
				<CodeBlock {code} lang="html" />
			{:else}
				<slot name="code" />
			{/if}
		</div>
	{/if}
</div>

<style>
	.component-preview {
		@apply border border-base-300 rounded-lg p-6;
	}

	.preview-body {
		@apply bg-base-100 rounded-lg p-4;
	}
</style>
