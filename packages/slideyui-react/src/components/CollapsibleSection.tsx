/**
 * CollapsibleSection Component
 * Expandable content area with keyboard accessibility
 * Perfect for FAQs, progressive disclosure, and nested content hierarchies
 */

import { useState } from 'react';
import clsx from 'clsx';
import { CollapsibleSectionProps } from '../types';

/**
 * Collapsible section for expandable content areas
 *
 * Features:
 * - Keyboard accessible (Enter/Space to toggle)
 * - Deep linking support via id prop
 * - Smooth expand/collapse animations
 * - ARIA attributes for screen readers
 * - onToggle callback for state tracking
 *
 * @example
 * ```tsx
 * // Simple FAQ
 * <ContentCard title="Frequently Asked Questions">
 *   <CollapsibleSection title="What is SlideyUI?" defaultOpen>
 *     <p>SlideyUI is a card-first UI system for AI-generated presentations...</p>
 *   </CollapsibleSection>
 *   <CollapsibleSection title="How do I embed media?">
 *     <p>Use the MediaCard or EmbedCard components with provider...</p>
 *   </CollapsibleSection>
 * </ContentCard>
 * ```
 *
 * @example
 * ```tsx
 * // With deep linking and state tracking
 * <CollapsibleSection
 *   title="Advanced Configuration"
 *   id="advanced-config"
 *   defaultOpen={false}
 *   onToggle={(isOpen) => console.log('Section toggled:', isOpen)}
 * >
 *   <p>Advanced settings and options...</p>
 * </CollapsibleSection>
 * ```
 *
 * @example
 * ```tsx
 * // Nested collapsible sections
 * <CollapsibleSection title="API Reference">
 *   <p>Our API has three main categories:</p>
 *   <CollapsibleSection title="Authentication">
 *     <p>Auth endpoints...</p>
 *   </CollapsibleSection>
 *   <CollapsibleSection title="Data">
 *     <p>Data endpoints...</p>
 *   </CollapsibleSection>
 * </CollapsibleSection>
 * ```
 */
export function CollapsibleSection({
  title,
  defaultOpen = false,
  id,
  onToggle,
  children,
  className = '',
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle?.(newState);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Toggle on Enter or Space
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  const contentId = id ? `${id}-content` : undefined;

  return (
    <div className={clsx('card-collapsible', className)}>
      {/* Trigger Button */}
      <button
        type="button"
        className="card-collapsible-trigger"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={contentId}
        role="button"
      >
        {title}
      </button>

      {/* Content Area */}
      <div
        id={contentId}
        className="card-collapsible-content"
        data-state={isOpen ? 'open' : 'closed'}
      >
        <div className="card-collapsible-body">{children}</div>
      </div>
    </div>
  );
}
