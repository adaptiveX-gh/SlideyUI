/**
 * Team slide template
 *
 * Renders slides with team member profiles including photos, roles, bios, and social links.
 * Supports multiple layout options: grid, carousel, and highlight.
 */

import type { GenerationOptions } from '../types/index.js';
import { escapeHTML, renderMarkdown } from '../utils/html.js';
import type { z } from 'zod';
import type { TeamSlideSchema } from '../schema/index.js';

type TeamSlideSpec = z.infer<typeof TeamSlideSchema>;

/**
 * Render social media links for a team member
 */
function renderSocialLinks(social?: TeamSlideSpec['members'][0]['social']): string {
  if (!social) return '';

  const links: string[] = [];

  if (social.linkedin) {
    links.push(
      `<a href="${escapeHTML(social.linkedin)}" target="_blank" rel="noopener noreferrer" class="slideyui-team-social-link" aria-label="LinkedIn">
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      </a>`
    );
  }

  if (social.twitter) {
    links.push(
      `<a href="${escapeHTML(social.twitter)}" target="_blank" rel="noopener noreferrer" class="slideyui-team-social-link" aria-label="Twitter">
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      </a>`
    );
  }

  if (social.github) {
    links.push(
      `<a href="${escapeHTML(social.github)}" target="_blank" rel="noopener noreferrer" class="slideyui-team-social-link" aria-label="GitHub">
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      </a>`
    );
  }

  if (links.length === 0) return '';

  return `
    <div class="slideyui-team-social">
      ${links.join('\n')}
    </div>
  `;
}

/**
 * Render a team member card
 */
function renderTeamMember(member: TeamSlideSpec['members'][0], layout: string): string {
  const name = escapeHTML(member.name);
  const role = escapeHTML(member.role);
  const bio = member.bio ? renderMarkdown(escapeHTML(member.bio)) : '';
  const photo = member.photo ? escapeHTML(member.photo) : '';
  const socialLinks = renderSocialLinks(member.social);

  // Different rendering for highlight layout
  if (layout === 'highlight') {
    return `
      <div class="slideyui-team-member slideyui-team-member-highlight">
        ${photo ? `
          <div class="slideyui-team-photo-wrapper">
            <img src="${photo}" alt="${name}" class="slideyui-team-photo slideyui-team-photo-large" loading="lazy">
          </div>
        ` : `
          <div class="slideyui-team-photo-wrapper">
            <div class="slideyui-team-photo-placeholder slideyui-team-photo-large" aria-label="${name}">
              <span class="slideyui-team-photo-initials">${name.charAt(0).toUpperCase()}</span>
            </div>
          </div>
        `}
        <div class="slideyui-team-info">
          <h3 class="slideyui-team-name">${name}</h3>
          <p class="slideyui-team-role">${role}</p>
          ${bio ? `<p class="slideyui-team-bio">${bio}</p>` : ''}
          ${socialLinks}
        </div>
      </div>
    `;
  }

  // Standard grid/carousel layout
  return `
    <div class="slideyui-team-member">
      ${photo ? `
        <div class="slideyui-team-photo-wrapper">
          <img src="${photo}" alt="${name}" class="slideyui-team-photo" loading="lazy">
        </div>
      ` : `
        <div class="slideyui-team-photo-wrapper">
          <div class="slideyui-team-photo-placeholder" aria-label="${name}">
            <span class="slideyui-team-photo-initials">${name.charAt(0).toUpperCase()}</span>
          </div>
        </div>
      `}
      <div class="slideyui-team-info">
        <h3 class="slideyui-team-name">${name}</h3>
        <p class="slideyui-team-role">${role}</p>
        ${bio ? `<p class="slideyui-team-bio">${bio}</p>` : ''}
        ${socialLinks}
      </div>
    </div>
  `;
}

/**
 * Main team template function
 */
export function teamTemplate(
  spec: TeamSlideSpec,
  _options: GenerationOptions
): string {
  const title = spec.title ? renderMarkdown(escapeHTML(spec.title)) : '';
  const layout = spec.layout ?? 'grid';
  const layoutClass = `slideyui-team-layout-${layout}`;

  const membersHTML = spec.members
    .map((member) => renderTeamMember(member, layout))
    .join('\n');

  return `
    <div class="slideyui-card slideyui-team-card">
      ${title ? `
        <div class="slideyui-card-header">
          <h2 class="slideyui-card-title">${title}</h2>
        </div>
      ` : ''}
      <div class="slideyui-card-content">
        <div class="slideyui-team-container ${layoutClass}">
          ${membersHTML}
        </div>
      </div>
    </div>
  `;
}
