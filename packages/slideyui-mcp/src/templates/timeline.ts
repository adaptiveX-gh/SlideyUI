/**
 * Timeline slide template
 *
 * Renders slides with chronological event sequences.
 * Supports enhanced roadmap features including status badges, progress indicators,
 * milestones, and quarter/month grouping.
 */

import type { GenerationOptions } from '../types/index.js';
import { escapeHTML, renderMarkdown } from '../utils/html.js';
import type { z } from 'zod';
import type { TimelineSlideSchema } from '../schema/index.js';

type TimelineSlideSpec = z.infer<typeof TimelineSlideSchema>;
type TimelineEvent = TimelineSlideSpec['events'][0];

/**
 * Render status badge for roadmap mode
 */
function renderStatusBadge(status?: 'planned' | 'in-progress' | 'completed'): string {
  if (!status) return '';

  const statusLabels = {
    planned: 'Planned',
    'in-progress': 'In Progress',
    completed: 'Completed',
  };

  const statusIcons = {
    planned: `<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
    </svg>`,
    'in-progress': `<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>`,
    completed: `<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>`,
  };

  return `
    <span class="slideyui-timeline-status slideyui-timeline-status-${status}">
      ${statusIcons[status]}
      ${statusLabels[status]}
    </span>
  `;
}

/**
 * Render progress bar for roadmap mode
 */
function renderProgressBar(progress?: number): string {
  if (progress === undefined) return '';

  return `
    <div class="slideyui-timeline-progress-wrapper">
      <div class="slideyui-timeline-progress-bar">
        <div class="slideyui-timeline-progress-fill" style="width: ${progress}%"></div>
      </div>
      <span class="slideyui-timeline-progress-label">${progress}%</span>
    </div>
  `;
}

/**
 * Render milestone indicator
 */
function renderMilestoneIndicator(isMilestone: boolean): string {
  if (!isMilestone) return '<div class="slideyui-timeline-marker"></div>';

  return `
    <div class="slideyui-timeline-marker slideyui-timeline-marker-milestone">
      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
      </svg>
    </div>
  `;
}

/**
 * Render a single timeline event
 */
function renderTimelineEvent(
  event: TimelineEvent,
  index: number,
  mode: string,
  showProgress: boolean
): string {
  const isMilestone = event.milestone ?? false;
  const milestoneClass = isMilestone ? ' slideyui-timeline-event-milestone' : '';

  return `
    <div class="slideyui-timeline-event${milestoneClass}" data-event-index="${index}">
      ${renderMilestoneIndicator(isMilestone)}
      <div class="slideyui-timeline-content">
        <div class="slideyui-timeline-header">
          <span class="slideyui-timeline-date">${renderMarkdown(escapeHTML(event.date))}</span>
          ${event.quarter ? `<span class="slideyui-timeline-quarter">${escapeHTML(event.quarter)}</span>` : ''}
          ${mode === 'roadmap' ? renderStatusBadge(event.status) : ''}
        </div>
        <h3 class="slideyui-timeline-title">${renderMarkdown(escapeHTML(event.title))}</h3>
        ${event.description ? `<p class="slideyui-timeline-description">${renderMarkdown(escapeHTML(event.description))}</p>` : ''}
        ${mode === 'roadmap' && showProgress && event.progress !== undefined ? renderProgressBar(event.progress) : ''}
      </div>
    </div>
  `;
}

/**
 * Group events by quarter/month/year
 */
function groupEvents(
  events: TimelineEvent[],
  groupBy: 'none' | 'quarter' | 'month' | 'year'
): Map<string, TimelineEvent[]> {
  if (groupBy === 'none') {
    return new Map([['all', events]]);
  }

  const groups = new Map<string, TimelineEvent[]>();

  events.forEach((event) => {
    let groupKey = 'Other';

    if (groupBy === 'quarter' && event.quarter) {
      groupKey = event.quarter;
    } else if (groupBy === 'month' || groupBy === 'year') {
      // Try to extract from date string
      const dateMatch = event.date.match(/\d{4}/);
      if (dateMatch) {
        groupKey = dateMatch[0];
        if (groupBy === 'month') {
          const monthMatch = event.date.match(/\w+\s+\d{4}/);
          if (monthMatch) {
            groupKey = monthMatch[0];
          }
        }
      }
    }

    if (!groups.has(groupKey)) {
      groups.set(groupKey, []);
    }
    groups.get(groupKey)!.push(event);
  });

  return groups;
}

/**
 * Main timeline template function
 */
export function timelineTemplate(
  spec: TimelineSlideSpec,
  _options: GenerationOptions
): string {
  const title = renderMarkdown(escapeHTML(spec.title));
  const orientation = spec.orientation ?? 'horizontal';
  const mode = spec.mode ?? 'timeline';
  const showProgress = spec.showProgress ?? false;
  const groupBy = spec.groupBy ?? 'none';

  const orientationClass = `slideyui-timeline-${orientation}`;
  const modeClass = `slideyui-timeline-mode-${mode}`;

  const eventGroups = groupEvents(spec.events, groupBy);
  let eventIndex = 0;

  const groupsHTML = Array.from(eventGroups.entries())
    .map(([groupName, events]) => {
      const eventsHTML = events
        .map((event) => {
          const html = renderTimelineEvent(event, eventIndex, mode, showProgress);
          eventIndex++;
          return html;
        })
        .join('');

      if (groupBy === 'none') {
        return eventsHTML;
      }

      return `
        <div class="slideyui-timeline-group">
          <h3 class="slideyui-timeline-group-title">${escapeHTML(groupName)}</h3>
          <div class="slideyui-timeline-group-events">
            ${eventsHTML}
          </div>
        </div>
      `;
    })
    .join('');

  return `
    <div class="slideyui-card slideyui-timeline-card">
      <div class="slideyui-card-header">
        <h2 class="slideyui-card-title">${title}</h2>
      </div>
      <div class="slideyui-card-content">
        <div class="slideyui-timeline ${orientationClass} ${modeClass}">
          ${groupsHTML}
        </div>
      </div>
    </div>
  `;
}
