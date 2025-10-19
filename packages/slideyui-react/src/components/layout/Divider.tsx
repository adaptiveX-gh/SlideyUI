import React from 'react';
import type { DividerProps } from '../../types';

/**
 * Divider - Presentation-optimized divider component with optional text
 *
 * @example
 * ```tsx
 * // Simple horizontal divider
 * <Divider />
 *
 * // Divider with text
 * <Divider>OR</Divider>
 *
 * // Vertical divider
 * <Divider orientation="vertical" />
 *
 * // Colored divider
 * <Divider variant="accent">Section Break</Divider>
 * ```
 *
 * @component
 * @see https://daisyui.com/components/divider/
 */
export const Divider: React.FC<DividerProps> = ({
  children,
  orientation = 'horizontal',
  variant,
  className = '',
  ...props
}) => {
  const baseClass = 'divider';
  const orientationClass = orientation === 'vertical' ? 'divider-vertical' : 'divider-horizontal';
  const variantClass = variant ? `divider-${variant}` : '';

  const classes = [baseClass, orientationClass, variantClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="separator" aria-orientation={orientation} {...props}>
      {children}
    </div>
  );
};

Divider.displayName = 'Divider';
