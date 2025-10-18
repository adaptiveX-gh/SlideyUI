/**
 * SpeakerNotes Component
 * Speaker notes overlay for presenter mode
 *
 * @deprecated Use CardNotes instead for modern card-based presentations
 */

import { SpeakerNotesProps } from '../types';
import { usePresentationContext } from './Presentation';

/**
 * Speaker notes component that appears in presenter mode
 *
 * @deprecated Use CardNotes instead for modern card-based presentations
 *
 * @example
 * ```tsx
 * <ContentSlide title="Key Points">
 *   <p>Main content here</p>
 *   <SpeakerNotes>
 *     Remember to emphasize the first point.
 *     Pause for questions after this slide.
 *   </SpeakerNotes>
 * </ContentSlide>
 * ```
 */
export function SpeakerNotes({
  children,
  className = '',
}: SpeakerNotesProps) {
  const { presenterMode } = usePresentationContext();

  if (!presenterMode) {
    return null;
  }

  return (
    <div className={`slide-speaker-notes ${className}`}>
      <div className="slide-speaker-notes-header">
        <svg
          className="slide-speaker-notes-icon"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
          <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
        </svg>
        <span className="slide-speaker-notes-title">Speaker Notes</span>
      </div>
      <div className="slide-speaker-notes-content">
        {children}
      </div>
    </div>
  );
}
