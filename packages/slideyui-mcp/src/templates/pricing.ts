/**
 * Pricing slide template
 *
 * Renders pricing table slides with multiple pricing plans.
 * Supports plan highlighting and responsive grid layout.
 */

import type { GenerationOptions } from '../types/index.js';
import { escapeHTML, renderMarkdown } from '../utils/html.js';
import type { z } from 'zod';
import type { PricingSlideSchema } from '../schema/index.js';

type PricingSlideSpec = z.infer<typeof PricingSlideSchema>;

/**
 * Render a single pricing plan card
 */
function renderPricingPlan(
  plan: PricingSlideSpec['plans'][0],
  isHighlighted: boolean
): string {
  const name = escapeHTML(plan.name);
  const price = typeof plan.price === 'number' ? `$${plan.price}` : escapeHTML(plan.price);
  const period = plan.period ? escapeHTML(plan.period) : 'per month';
  const cta = plan.cta ? escapeHTML(plan.cta) : 'Get Started';
  const isRecommended = plan.recommended ?? false;

  const highlightClass = isHighlighted || isRecommended ? 'slideyui-pricing-plan-highlighted' : '';
  const recommendedBadge = isRecommended
    ? '<span class="slideyui-pricing-badge">Recommended</span>'
    : '';

  const featuresHTML = plan.features
    .map(
      (feature) => `
      <li class="slideyui-pricing-feature">
        <svg class="slideyui-pricing-feature-icon" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
        </svg>
        <span>${renderMarkdown(escapeHTML(feature))}</span>
      </li>
    `
    )
    .join('');

  return `
    <div class="slideyui-pricing-plan ${highlightClass}">
      ${recommendedBadge}
      <div class="slideyui-pricing-header">
        <h3 class="slideyui-pricing-name">${name}</h3>
        <div class="slideyui-pricing-price-wrapper">
          <span class="slideyui-pricing-price">${price}</span>
          <span class="slideyui-pricing-period">/${period}</span>
        </div>
      </div>
      <div class="slideyui-pricing-features">
        <ul class="slideyui-pricing-feature-list">
          ${featuresHTML}
        </ul>
      </div>
      <div class="slideyui-pricing-footer">
        <button class="slideyui-pricing-cta" type="button">${cta}</button>
      </div>
    </div>
  `;
}

/**
 * Main pricing template function
 */
export function pricingTemplate(
  spec: PricingSlideSpec,
  _options: GenerationOptions
): string {
  const title = spec.title ? renderMarkdown(escapeHTML(spec.title)) : '';
  const highlightIndex = spec.highlight;

  // Determine grid columns based on number of plans
  const planCount = spec.plans.length;
  let gridClass = 'slideyui-pricing-grid-3'; // default
  if (planCount === 1) {
    gridClass = 'slideyui-pricing-grid-1';
  } else if (planCount === 2) {
    gridClass = 'slideyui-pricing-grid-2';
  } else if (planCount === 4) {
    gridClass = 'slideyui-pricing-grid-4';
  }

  const plansHTML = spec.plans
    .map((plan, index) => {
      const isHighlighted = highlightIndex !== undefined && index === highlightIndex;
      return renderPricingPlan(plan, isHighlighted);
    })
    .join('\n');

  return `
    <div class="slideyui-card slideyui-pricing-card">
      ${title ? `
        <div class="slideyui-card-header">
          <h2 class="slideyui-card-title">${title}</h2>
        </div>
      ` : ''}
      <div class="slideyui-card-content">
        <div class="slideyui-pricing-container ${gridClass}">
          ${plansHTML}
        </div>
      </div>
    </div>
  `;
}
