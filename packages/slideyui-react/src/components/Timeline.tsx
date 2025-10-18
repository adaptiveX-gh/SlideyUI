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
      className={`slide-timeline slide-timeline-${orientation} slide-timeline-${variant} ${className}`}
    >
      {events.map((event, index) => (
        <div key={index} className="slide-timeline-item">
          <div className="slide-timeline-marker">
            {event.icon ? (
              <div className="slide-timeline-icon">{event.icon}</div>
            ) : (
              <div className="slide-timeline-dot" />
            )}
          </div>

          <div className="slide-timeline-content">
            {event.date && (
              <div className="slide-timeline-date">{event.date}</div>
            )}
            <h4 className="slide-timeline-title">{event.title}</h4>
            {event.description && (
              <p className="slide-timeline-description">{event.description}</p>
            )}
          </div>

          {index < events.length - 1 && (
            <div className="slide-timeline-connector" />
          )}
        </div>
      ))}
    </div>
  );
}
