<script lang="ts">
	/**
	 * CardGrid Component
	 * Responsive grid layout for presentation cards
	 * Gamma-style flexible grid system for AI-first apps
	 */

	type ResponsiveColumns = {
		sm?: number;
		md?: number;
		lg?: number;
		xl?: number;
	};

	export let columns: number | ResponsiveColumns | undefined = undefined;
	export let gap: 'sm' | 'md' | 'lg' | 'xl' = 'md';
	export let minCardWidth: string | undefined = undefined;
	export let autoFlow: 'row' | 'column' | 'dense' = 'row';

	let className: string = '';
	export { className as class };

	const gapClasses: Record<string, string> = {
		sm: 'gap-4',
		md: 'gap-6',
		lg: 'gap-8',
		xl: 'gap-12'
	};

	const autoFlowClasses: Record<string, string> = {
		row: 'grid-flow-row',
		column: 'grid-flow-col',
		dense: 'grid-flow-dense'
	};

	function getGridColsClasses(): string {
		if (!columns) return '';

		if (typeof columns === 'number') {
			return `grid-cols-${columns}`;
		}

		// Responsive breakpoints
		const classes: string[] = [];
		if (columns.sm) classes.push(`grid-cols-${columns.sm}`);
		if (columns.md) classes.push(`md:grid-cols-${columns.md}`);
		if (columns.lg) classes.push(`lg:grid-cols-${columns.lg}`);
		if (columns.xl) classes.push(`xl:grid-cols-${columns.xl}`);

		return classes.join(' ');
	}

	$: gridStyle = !columns && minCardWidth
		? `grid-template-columns: repeat(auto-fit, minmax(${minCardWidth}, 1fr))`
		: undefined;

	$: computedClasses = [
		'grid',
		getGridColsClasses(),
		gapClasses[gap],
		autoFlowClasses[autoFlow],
		className
	]
		.filter(Boolean)
		.join(' ');
</script>

<div class={computedClasses} style={gridStyle}>
	<slot />
</div>
