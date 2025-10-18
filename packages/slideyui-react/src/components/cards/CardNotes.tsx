/**
 * CardNotes Component
 * Speaker notes for presentation cards
 * Only visible in presenter mode
 */

import { ReactNode } from 'react';
import clsx from 'clsx';

export interface CardNotesProps {
  /** Notes content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Speaker notes for cards (only visible in presenter mode)
 *
 * @example
 * ```tsx
 * <ContentCard title="Welcome">
 *   <p>Slide content here</p>
 *   <CardNotes>
 *     Remember to mention the new features!
 *   </CardNotes>
 * </ContentCard>
 * ```
 */
export function CardNotes({ children, className = '' }: CardNotesProps) {
  return (
    <div
      className={clsx(
        'card-notes',
        'hidden', // Hidden by default, shown in presenter mode via CSS
        className
      )}
      data-card-notes
    >
      {children}
    </div>
  );
}
