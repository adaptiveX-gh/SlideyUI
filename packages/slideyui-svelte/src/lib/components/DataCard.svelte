<script lang="ts">
	/**
	 * DataCard Component
	 * Metrics, charts, and data visualization card
	 */

	import CardContainer from './CardContainer.svelte';
	import type { CardPadding } from '../types';

	export let title: string | undefined = undefined;
	export let value: string | number | undefined = undefined;
	export let label: string | undefined = undefined;
	export let trend: 'up' | 'down' | 'neutral' | undefined = undefined;
	export let trendValue: string | undefined = undefined;
	export let variant: 'metric' | 'chart' = 'metric';
	export let padding: CardPadding = 'spacious';
	export let aspectRatio: '16/9' | '4/3' | '1/1' | '3/2' | 'auto' = '16/9';
	export let mode: 'preview' | 'thumbnail' | 'full' = 'preview';
	export let bordered: boolean = true;
	export let shadow: boolean = true;
	export let interactive: boolean = false;
	export let cardId: string | undefined = undefined;
	export let cardState: 'generating' | 'selected' | 'error' | 'complete' | undefined = undefined;

	let className: string = '';
	export { className as class };

	const paddingClass = {
		compact: 'slide-card-compact',
		default: '',
		spacious: 'slide-card-spacious',
		none: 'slide-card-flush',
	}[padding];

	const trendIcons: Record<string, string> = {
		up: '↑',
		down: '↓',
		neutral: '→'
	};

	const trendColors: Record<string, string> = {
		up: 'text-green-600',
		down: 'text-red-600',
		neutral: 'text-gray-600'
	};
</script>

{#if variant === 'metric'}
	<CardContainer
		{aspectRatio}
		{mode}
		{bordered}
		{shadow}
		{interactive}
		{cardId}
		{cardState}
		class="flex flex-col card-data-metric {paddingClass} {className}"
	>
		<!-- Header -->
		<div class="flex items-start justify-between mb-4">
			{#if title}
				<h4 class="text-lg font-semibold text-slidey-muted-foreground">{title}</h4>
			{/if}
			<slot name="icon" />
		</div>

		<!-- Metric Value -->
		{#if value !== undefined}
			<div class="mb-2">
				<div class="text-5xl font-bold text-slidey-foreground">{value}</div>
				{#if label}
					<div class="text-sm text-slidey-muted-foreground mt-1">{label}</div>
				{/if}
			</div>
		{/if}

		<!-- Trend Indicator -->
		{#if trend}
			<div class="flex items-center gap-2 text-sm font-medium {trendColors[trend]}">
				<span class="text-xl">{trendIcons[trend]}</span>
				{#if trendValue}
					<span>{trendValue}</span>
				{/if}
			</div>
		{/if}

		<!-- Footer -->
		<slot name="footer" />
	</CardContainer>
{:else}
	<!-- Chart variant -->
	<CardContainer {aspectRatio} {mode} {cardId} {cardState} class="flex flex-col {paddingClass} {className}">
		{#if title}
			<div class="px-6 pt-6 pb-4 border-b border-slidey-border">
				<div class="flex items-start justify-between">
					<h4 class="text-xl font-semibold">{title}</h4>
					<slot name="icon" />
				</div>
			</div>
		{/if}

		<div class="flex-1 p-6 overflow-auto">
			<slot />
		</div>

		<slot name="footer">
			<!-- Default footer slot -->
		</slot>
	</CardContainer>
{/if}
