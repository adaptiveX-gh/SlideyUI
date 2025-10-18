/**
 * Timeline Component
 * Timeline visualization for chronological events
 */

import { SlideTimelineProps } from '../types';

/**
 * Timeline component for displaying chronological events
 *
 * @example
 * ```tsx
 * <Timeline
 *   orientation="vertical"
 *   variant="detailed"
 *   events={[
 *     { title: '2020', description: 'Company founded', date: 'Jan 2020' },
 *     { title: '2021', description: 'Series A funding', date: 'Mar 2021' },
 *     { title: '2022', description: 'Product launch', date: 'Jun 2022' },
 *   ]}
 * />
 * ```
 */
export function Timeline({
  events,
  orientation = 'vertical',
  variant = 'default',
  className = '',
}: SlideTimelineProps) {
  return (
    <div
      className={`card-timeline card-timeline-${orientation} card-timeline-${variant} ${className}`}
    >
      {events.map((event, index) => (
        <div key={index} className="card-timeline-item">
          {event.date && (
            <div className="card-timeline-date">{event.date}</div>
          )}
          <div className="card-timeline-content">
            {event.title}
            {event.description && <p>{event.description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
