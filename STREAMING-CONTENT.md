# SlideyUI MCP: Progressive Slide Reveal Feature Specification

**Version:** 1.0  
**Date:** October 20, 2025  
**Status:** Proposal  
**Author:** Product Specification

---

## 1. Executive Summary

This specification outlines a hybrid approach to implement Gamma.ai-style progressive slide reveal in SlideyUI MCP. The solution combines client-side animation with iterative slide building to create an engaging, real-time presentation creation experience.

### Goals
- Create engaging "streaming" visual effect for slide generation
- Support both single-call (fast) and iterative (progressive) workflows
- Maintain backward compatibility with existing implementations
- Provide smooth, professional animations

### Success Metrics
- Slide reveal animations complete within 200ms per element
- Support presentations up to 50 slides without performance degradation
- Zero breaking changes to existing API consumers

---

## 2. Technical Architecture

### 2.1 Hybrid Approach Overview

**Option A: Client-Side Progressive Reveal** (Primary)
- Single tool call generates complete HTML
- JavaScript animates slide appearance on page load
- Fast generation, smooth user experience
- Best for: Initial presentation creation

**Option B: Iterative Slide Building** (Secondary)
- Multiple sequential tool calls
- Each call adds one slide and returns updated HTML
- Claude provides commentary between slides
- Best for: Interactive, conversational slide building

---

## 3. API Changes

### 3.1 New Parameters for `create_presentation`

```typescript
interface CreatePresentationParams {
  // ... existing parameters ...
  
  // NEW: Progressive reveal options
  progressiveReveal?: {
    enabled: boolean;           // Enable client-side animation
    slideDelay?: number;        // Delay between slides (ms), default: 2000
    elementDelay?: number;      // Delay between elements (ms), default: 150
    animationStyle?: 'fade' | 'slide-up' | 'scale'; // Animation type, default: 'fade'
    autoStart?: boolean;        // Start animation on load, default: true
  };
}
```

**Example Usage:**
```json
{
  "title": "My Presentation",
  "theme": "corporate",
  "progressiveReveal": {
    "enabled": true,
    "slideDelay": 2500,
    "elementDelay": 200,
    "animationStyle": "slide-up"
  },
  "slides": [...]
}
```

### 3.2 Enhanced `add_slide` Response

**Current Behavior:**
- Returns HTML fragment for single slide only

**New Behavior:**
- Returns complete updated presentation HTML
- Includes updated navigation
- Maintains all existing slides plus new one

```typescript
interface AddSlideResponse {
  success: boolean;
  html: string;              // CHANGED: Full presentation HTML (not fragment)
  slideHtml: string;         // NEW: Just the new slide HTML
  metadata: {
    slideCount: number;
    newSlideIndex: number;
    newSlideId: string;
  };
}
```

---

## 4. Implementation Details

### 4.1 Client-Side Progressive Reveal JavaScript

**File:** `progressive-reveal.js` (to be injected into generated HTML)

```javascript
(function() {
  'use strict';
  
  const REVEAL_CONFIG = {
    slideDelay: {{SLIDE_DELAY}},      // Template variable
    elementDelay: {{ELEMENT_DELAY}},  // Template variable
    animationStyle: '{{ANIMATION_STYLE}}',
    autoStart: {{AUTO_START}}
  };

  class ProgressiveReveal {
    constructor(config) {
      this.config = config;
      this.slides = document.querySelectorAll('.slideyui-slide');
      this.currentIndex = 0;
    }

    init() {
      // Hide all slides initially
      this.slides.forEach(slide => {
        slide.style.opacity = '0';
        slide.style.visibility = 'hidden';
      });

      if (this.config.autoStart) {
        this.start();
      }
    }

    start() {
      this.revealNextSlide();
    }

    revealNextSlide() {
      if (this.currentIndex >= this.slides.length) {
        this.onComplete();
        return;
      }

      const slide = this.slides[this.currentIndex];
      this.revealSlide(slide).then(() => {
        this.currentIndex++;
        setTimeout(() => {
          this.revealNextSlide();
        }, this.config.slideDelay);
      });
    }

    async revealSlide(slide) {
      // Make slide visible
      slide.style.visibility = 'visible';
      slide.style.transition = 'opacity 0.8s ease-in';
      slide.style.opacity = '1';

      // Get all animatable elements
      const elements = slide.querySelectorAll(
        'h1, h2, h3, p, li, .slideyui-chart, .slideyui-timeline-event, img'
      );

      // Animate each element with stagger
      await this.animateElements(elements);
    }

    async animateElements(elements) {
      return new Promise(resolve => {
        elements.forEach((el, index) => {
          // Set initial state based on animation style
          this.setInitialState(el);

          // Reveal with delay
          setTimeout(() => {
            this.setRevealedState(el);
          }, index * this.config.elementDelay);
        });

        // Resolve when last element finishes
        const totalTime = elements.length * this.config.elementDelay + 500;
        setTimeout(resolve, totalTime);
      });
    }

    setInitialState(element) {
      element.style.opacity = '0';
      
      switch(this.config.animationStyle) {
        case 'slide-up':
          element.style.transform = 'translateY(20px)';
          break;
        case 'scale':
          element.style.transform = 'scale(0.95)';
          break;
        default: // 'fade'
          // opacity only
          break;
      }
    }

    setRevealedState(element) {
      element.style.transition = 'all 0.5s ease-out';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0) scale(1)';
    }

    onComplete() {
      // Fire custom event
      window.dispatchEvent(new CustomEvent('slideyui:reveal-complete'));
      
      // Enable navigation
      document.querySelector('.slideyui-deck').classList.add('reveal-complete');
    }
  }

  // Initialize on load
  window.addEventListener('load', () => {
    const revealer = new ProgressiveReveal(REVEAL_CONFIG);
    revealer.init();
    
    // Expose for manual control
    window.SlideyUI = window.SlideyUI || {};
    window.SlideyUI.revealer = revealer;
  });
})();
```

### 4.2 Server-Side Template Injection

**In MCP server's presentation generator:**

```python
def generate_presentation_html(params):
    # ... existing HTML generation ...
    
    if params.get('progressiveReveal', {}).get('enabled', False):
        reveal_config = params['progressiveReveal']
        
        # Inject progressive reveal script
        reveal_js = get_progressive_reveal_script(
            slide_delay=reveal_config.get('slideDelay', 2000),
            element_delay=reveal_config.get('elementDelay', 150),
            animation_style=reveal_config.get('animationStyle', 'fade'),
            auto_start=reveal_config.get('autoStart', True)
        )
        
        # Inject before closing </body> tag
        html = html.replace('</body>', f'{reveal_js}</body>')
        
        # Add CSS classes for reveal states
        html = add_reveal_css_classes(html)
    
    return html

def get_progressive_reveal_script(slide_delay, element_delay, animation_style, auto_start):
    """Load progressive-reveal.js template and replace variables"""
    template = load_template('progressive-reveal.js')
    
    return f'''
    <script>
    {template
        .replace('{{SLIDE_DELAY}}', str(slide_delay))
        .replace('{{ELEMENT_DELAY}}', str(element_delay))
        .replace('{{ANIMATION_STYLE}}', animation_style)
        .replace('{{AUTO_START}}', 'true' if auto_start else 'false')
    }
    </script>
    '''
```

### 4.3 Enhanced `add_slide` Implementation

```python
def add_slide(params):
    """Add a single slide and return complete updated HTML"""
    slide_spec = params['slide']
    slide_index = params.get('index', None)
    existing_html = params.get('existingHtml', None)  # NEW parameter
    
    # Generate new slide HTML
    new_slide_html = generate_slide_html(slide_spec, slide_index)
    
    if existing_html:
        # Parse existing HTML
        soup = BeautifulSoup(existing_html, 'html.parser')
        deck = soup.find(class_='slideyui-deck')
        
        # Append new slide
        new_slide_element = BeautifulSoup(new_slide_html, 'html.parser')
        deck.append(new_slide_element)
        
        # Update metadata
        slide_count = len(deck.find_all(class_='slideyui-slide'))
        
        return {
            'success': True,
            'html': str(soup),
            'slideHtml': new_slide_html,
            'metadata': {
                'slideCount': slide_count,
                'newSlideIndex': slide_index,
                'newSlideId': f'slide-{slide_index}'
            }
        }
    else:
        # Return just the slide (backward compatible)
        return {
            'success': True,
            'html': new_slide_html,
            'slideHtml': new_slide_html,
            'metadata': {
                'slideCount': 1,
                'newSlideIndex': slide_index,
                'newSlideId': f'slide-{slide_index}'
            }
        }
```

---

## 5. CSS Enhancements

### 5.1 Required CSS Classes

Add to existing stylesheet:

```css
/* Progressive Reveal States */
.slideyui-deck:not(.reveal-complete) .slideyui-navigation {
  pointer-events: none;
  opacity: 0.3;
}

.slideyui-deck.reveal-complete .slideyui-navigation {
  transition: opacity 0.3s ease-in;
  opacity: 1;
}

/* Animation presets */
.slideyui-slide[data-reveal-state="hidden"] {
  opacity: 0;
  visibility: hidden;
}

.slideyui-slide[data-reveal-state="revealing"] {
  opacity: 0;
  visibility: visible;
}

.slideyui-slide[data-reveal-state="revealed"] {
  opacity: 1;
  visibility: visible;
}

/* Loading indicator */
.slideyui-reveal-progress {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  z-index: 9999;
}

.reveal-complete .slideyui-reveal-progress {
  display: none;
}
```

### 5.2 Optional Progress Indicator

```javascript
// Add to ProgressiveReveal class
showProgress() {
  const progress = document.createElement('div');
  progress.className = 'slideyui-reveal-progress';
  progress.textContent = `Building slide ${this.currentIndex + 1} of ${this.slides.length}...`;
  document.body.appendChild(progress);
  return progress;
}

updateProgress(progressEl) {
  progressEl.textContent = `Building slide ${this.currentIndex + 1} of ${this.slides.length}...`;
}
```

---

## 6. Usage Examples

### 6.1 Claude Using Progressive Reveal (Single Call)

```javascript
// Claude calls create_presentation once
create_presentation({
  title: "AI in Healthcare",
  theme: "corporate",
  progressiveReveal: {
    enabled: true,
    slideDelay: 2000,
    elementDelay: 150,
    animationStyle: "slide-up"
  },
  slides: [
    { type: "title", title: "AI in Healthcare", subtitle: "The Future" },
    { type: "content", title: "Benefits", content: [...] },
    { type: "data", title: "Statistics", data: [...] }
  ]
})

// User sees slides appear one by one with smooth animations
```

### 6.2 Claude Using Iterative Building (Multiple Calls)

```javascript
// Call 1: Create base with first slide
create_presentation({
  title: "AI in Healthcare",
  theme: "corporate",
  slides: [
    { type: "title", title: "AI in Healthcare" }
  ]
})

// Claude: "Great! Now let me add a slide about current applications..."

// Call 2: Add slide
add_slide({
  slide: { type: "content", title: "Current Applications", content: [...] },
  existingHtml: "<previous html>"
})

// Call 3: Add another slide
add_slide({
  slide: { type: "data", title: "Benefits", data: [...] },
  existingHtml: "<updated html>"
})

// User sees new slides appear after each call
```

### 6.3 Manual Control API

For advanced users:

```javascript
// Disable auto-start
create_presentation({
  progressiveReveal: {
    enabled: true,
    autoStart: false
  }
})

// In browser console or custom button:
window.SlideyUI.revealer.start();  // Start reveal
window.SlideyUI.revealer.pause();  // Pause (future feature)
window.SlideyUI.revealer.skip();   // Skip to end (future feature)
```

---

## 7. Testing Requirements

### 7.1 Unit Tests

- [ ] Progressive reveal script initializes correctly
- [ ] Animation timing matches configuration
- [ ] All animation styles (fade, slide-up, scale) work
- [ ] Navigation disabled during reveal
- [ ] Navigation enabled after completion
- [ ] Custom event fires on completion

### 7.2 Integration Tests

- [ ] `create_presentation` with `progressiveReveal` generates correct HTML
- [ ] Script injection works for all themes
- [ ] Multiple calls to `add_slide` produce valid HTML
- [ ] `add_slide` returns complete presentation HTML
- [ ] Backward compatibility: works without `progressiveReveal` param

### 7.3 Performance Tests

- [ ] 5-slide presentation reveals in < 15 seconds
- [ ] 20-slide presentation reveals in < 60 seconds
- [ ] No memory leaks during reveal
- [ ] Smooth 60fps animation on modern browsers
- [ ] Graceful degradation on older browsers

### 7.4 Browser Compatibility

Test on:
- [ ] Chrome 90+
- [ ] Firefox 88+
- [ ] Safari 14+
- [ ] Edge 90+
- [ ] Mobile Safari (iOS 14+)
- [ ] Mobile Chrome (Android 10+)

---

## 8. Migration & Backward Compatibility

### 8.1 Breaking Changes
**None.** All new features are opt-in via parameters.

### 8.2 Deprecations
**None planned.**

### 8.3 Default Behavior
- `progressiveReveal.enabled` defaults to `false`
- Existing code continues to work without changes
- New presentations can opt-in to progressive reveal

---

## 9. Future Enhancements

### Phase 2 Considerations

1. **MCP Streaming Protocol Support**
   - If MCP adds streaming, implement true server-side streaming
   - Server yields slide chunks as generated
   - More authentic "real-time generation" feel

2. **Advanced Controls**
   - `pause()` / `resume()` methods
   - `skip()` to end immediately
   - Speed controls (0.5x, 1x, 2x)
   - Replay button

3. **Sound Effects**
   - Optional audio feedback on slide reveal
   - Configurable sound library

4. **Analytics**
   - Track reveal completion rates
   - Measure user engagement during reveal
   - A/B test animation styles

5. **Theme-Specific Animations**
   - Each theme gets custom animation style
   - Corporate: fade, Professional: slide-up, Creative: scale + rotate

---

## 10. Implementation Timeline

### Sprint 1 (Week 1-2): Core Infrastructure
- [ ] Add `progressiveReveal` parameters to schema
- [ ] Implement template injection system
- [ ] Create `progressive-reveal.js` core logic
- [ ] Add CSS classes for reveal states

### Sprint 2 (Week 3): Iterative Building
- [ ] Enhance `add_slide` to return full HTML
- [ ] Add `existingHtml` parameter handling
- [ ] Update HTML parsing logic
- [ ] Write integration tests

### Sprint 3 (Week 4): Polish & Testing
- [ ] Add progress indicator UI
- [ ] Cross-browser testing
- [ ] Performance optimization
- [ ] Documentation updates

### Sprint 4 (Week 5): Release
- [ ] Beta testing with select users
- [ ] Bug fixes
- [ ] Release v0.2.0
- [ ] Update Claude integration docs

---

## 11. Success Criteria

### Must Have (MVP)
✅ Progressive reveal works for 5+ slide presentations  
✅ Smooth animations at 60fps  
✅ Zero breaking changes to existing API  
✅ Works in Chrome, Firefox, Safari  

### Should Have
✅ Iterative building with `add_slide`  
✅ Progress indicator  
✅ Manual control API  
✅ 3 animation styles  

### Nice to Have
⭐ Sound effects  
⭐ Replay button  
⭐ Speed controls  

---

## 12. Open Questions

1. **Q:** Should progressive reveal be the default for all presentations?  
   **A:** No, opt-in for now. Reassess after user feedback.

2. **Q:** How do we handle very large presentations (50+ slides)?  
   **A:** Add `maxConcurrentAnimations` limit, batch reveals.

3. **Q:** Should we support skipping the reveal animation?  
   **A:** Yes, add escape key handler and "Skip" button.

4. **Q:** What about accessibility for screen readers?  
   **A:** Ensure ARIA live regions announce slide additions.

---

## 13. Appendix

### A. Example Generated HTML Structure

```html
<!doctype html>
<html>
<head>
  <title>My Presentation</title>
  <style>/* ... existing styles ... */</style>
</head>
<body>
  <div class="slideyui-deck">
    <div class="slideyui-slide" id="slide-0">...</div>
    <div class="slideyui-slide" id="slide-1">...</div>
    <div class="slideyui-slide" id="slide-2">...</div>
  </div>
  
  <!-- Navigation controls -->
  <div class="slideyui-navigation">...</div>
  
  <!-- Progressive reveal script (if enabled) -->
  <script>
    // progressive-reveal.js content
  </script>
</body>
</html>
```

### B. Configuration Reference

```typescript
interface ProgressiveRevealConfig {
  enabled: boolean;              // default: false
  slideDelay: number;            // default: 2000 (ms)
  elementDelay: number;          // default: 150 (ms)
  animationStyle: AnimStyle;     // default: 'fade'
  autoStart: boolean;            // default: true
  showProgress: boolean;         // default: true
}

type AnimStyle = 'fade' | 'slide-up' | 'scale';
```

---

## Document Control

**Review Status:** Draft  
**Next Review:** After technical feasibility review  
**Approvers:** Engineering Lead, Product Manager  
**Questions:** Contact product team

---

*End of Specification*