/**
 * Product overview slide template
 *
 * Renders a product showcase with image, features list, and optional pricing.
 * Supports multiple layout variations for different presentation styles.
 */

import type {
  ProductOverviewSlideSpec,
  GenerationOptions,
} from '../types/index.js';
import { escapeHTML } from '../utils/html.js';

/**
 * Render product image
 */
function renderProductImage(imageUrl: string): string {
  return `
    <div class="slideyui-product-image-container">
      <img
        src="${escapeHTML(imageUrl)}"
        alt="Product image"
        class="slideyui-product-image"
      />
    </div>
  `;
}

/**
 * Render product details (description, features, pricing)
 */
function renderProductDetails(
  description: string | undefined,
  features: string[],
  pricing:
    | {
        price: string;
        period?: string;
        cta?: string;
      }
    | undefined
): string {
  const descriptionHTML = description
    ? `<p class="slideyui-product-description">${escapeHTML(description)}</p>`
    : '';

  const featuresHTML = `
    <div class="slideyui-product-features">
      <ul class="slideyui-list slideyui-list-check">
        ${features.map((feature) => `<li>${escapeHTML(feature)}</li>`).join('\n')}
      </ul>
    </div>
  `;

  const pricingHTML = pricing
    ? `
      <div class="slideyui-product-pricing">
        <div class="slideyui-pricing-amount">
          <span class="slideyui-price">${escapeHTML(pricing.price)}</span>
          ${pricing.period ? `<span class="slideyui-price-period">/${escapeHTML(pricing.period)}</span>` : ''}
        </div>
        ${pricing.cta ? `<button class="slideyui-btn slideyui-btn-primary mt-4">${escapeHTML(pricing.cta)}</button>` : ''}
      </div>
    `
    : '';

  return `
    <div class="slideyui-product-details">
      ${descriptionHTML}
      ${featuresHTML}
      ${pricingHTML}
    </div>
  `;
}

/**
 * Get layout classes based on layout option
 */
function getLayoutClasses(layout: string): {
  imageClass: string;
  detailsClass: string;
  containerClass: string;
} {
  switch (layout) {
    case 'image-right':
      return {
        imageClass: 'col-span-12 md:col-span-6 order-2 md:order-2',
        detailsClass: 'col-span-12 md:col-span-6 order-1 md:order-1',
        containerClass: 'grid grid-cols-12 gap-6 md:gap-8',
      };
    case 'image-top':
      return {
        imageClass: 'col-span-12',
        detailsClass: 'col-span-12',
        containerClass: 'grid grid-cols-12 gap-6',
      };
    case 'image-left':
    default:
      return {
        imageClass: 'col-span-12 md:col-span-6',
        detailsClass: 'col-span-12 md:col-span-6',
        containerClass: 'grid grid-cols-12 gap-6 md:gap-8',
      };
  }
}

export function productOverviewTemplate(
  spec: ProductOverviewSlideSpec,
  _options: GenerationOptions
): string {
  const title = escapeHTML(spec.title);
  const layout = spec.layout ?? 'image-left';
  const { imageClass, detailsClass, containerClass } =
    getLayoutClasses(layout);

  const imageHTML = spec.productImage
    ? renderProductImage(spec.productImage)
    : '';
  const detailsHTML = renderProductDetails(
    spec.description,
    spec.features,
    spec.pricing
  );

  return `
    <div class="slideyui-card slideyui-product-overview-card">
      <div class="slideyui-card-header">
        <h2 class="slideyui-card-title">${title}</h2>
      </div>
      <div class="slideyui-card-content">
        <div class="${containerClass}">
          ${
            spec.productImage
              ? `
            <div class="${imageClass}">
              ${imageHTML}
            </div>
          `
              : ''
          }
          <div class="${spec.productImage ? detailsClass : 'col-span-12'}">
            ${detailsHTML}
          </div>
        </div>
      </div>
    </div>
  `;
}
