/**
 * CardContainer Component
 * Base container for presentation cards with aspect ratio control
 * Designed as Layer 0 primitive for AI apps to build upon
 */

import { CardContainerProps } from '../../types';
import clsx from 'clsx';

const aspectRatioClasses: Record<string, string> = {
  '16/9': 'aspect-[16/9]',
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-square',
  '3/2': 'aspect-[3/2]',
  'auto': '',
};

const modeClasses: Record<string, string> = {
  preview: 'slide-card-preview',
  thumbnail: 'slide-card-thumbnail',
  full: 'slide-card-full',
};

/**
 * Base card container with presentation-optimized defaults
 *
 * @example
 * ```tsx
 * <CardContainer aspectRatio="16/9" shadow>
 *   <h2>Card Content</h2>
 * </CardContainer>
 * ```
 */
export function CardContainer({
  aspectRatio = '16/9',
  mode = 'preview',
  className = '',
  children,
  backgroundColor,
  backgroundImage,
  bordered = true,
  shadow = true,
  interactive = false,
  autoScale = false,
  fluidScale = false,
  'data-card-id': cardId,
  'data-card-state': cardState,
}: CardContainerProps) {
  return (
    <div
      className={clsx(
        'slide-card',
        aspectRatioClasses[aspectRatio],
        modeClasses[mode],
        interactive && 'cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]',
        className
      )}
      style={{
        backgroundColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: backgroundImage ? 'cover' : undefined,
        backgroundPosition: backgroundImage ? 'center' : undefined,
        border: bordered ? '1px solid var(--slidey-border)' : undefined,
        boxShadow: shadow ? '0 2px 8px rgba(0, 0, 0, 0.1)' : undefined,
      }}
      data-card-id={cardId}
      data-card-state={cardState}
      data-auto-scale={autoScale ? 'true' : undefined}
      data-fluid-scale={fluidScale ? 'true' : undefined}
    >
      {children}
    </div>
  );
}
