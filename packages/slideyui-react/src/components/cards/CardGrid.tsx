/**
 * CardGrid Component
 * Responsive grid layout for presentation cards
 * Gamma-style flexible grid system for AI-first apps
 */

import { CardGridProps } from '../../types';
import clsx from 'clsx';

const gapClasses: Record<string, string> = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12',
};

const autoFlowClasses: Record<string, string> = {
  row: 'grid-flow-row',
  column: 'grid-flow-col',
  dense: 'grid-flow-dense',
};

/**
 * Responsive grid for organizing presentation cards
 *
 * @example
 * ```tsx
 * // Auto-fit grid
 * <CardGrid minCardWidth="300px">
 *   <CardContainer>Card 1</CardContainer>
 *   <CardContainer>Card 2</CardContainer>
 * </CardGrid>
 *
 * // Responsive columns
 * <CardGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}>
 *   {cards.map(card => <CardContainer key={card.id}>{card.content}</CardContainer>)}
 * </CardGrid>
 * ```
 */
export function CardGrid({
  columns,
  gap = 'md',
  className = '',
  children,
  autoFlow = 'row',
  minCardWidth,
}: CardGridProps) {
  // Generate grid classes based on columns prop
  const getGridCols = () => {
    if (!columns && minCardWidth) {
      // Auto-fit grid with minimum width
      return {
        gridTemplateColumns: `repeat(auto-fit, minmax(${minCardWidth}, 1fr))`,
      };
    }

    if (typeof columns === 'number') {
      return {};
    }

    // Responsive columns object
    return {};
  };

  const getGridColsClasses = () => {
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
  };

  const customStyle = getGridCols();

  return (
    <div
      className={clsx(
        'grid',
        getGridColsClasses(),
        gapClasses[gap],
        autoFlowClasses[autoFlow],
        className
      )}
      style={Object.keys(customStyle).length > 0 ? customStyle : undefined}
    >
      {children}
    </div>
  );
}
