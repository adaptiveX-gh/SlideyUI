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





# SlideyUI MCP - Server-Sent Events (SSE) Streaming Specification

## Executive Summary

Enable real-time streaming of presentation content using Server-Sent Events (SSE) to provide a Gamma AI-like progressive rendering experience. Users will see slides materialize in real-time as they're generated, significantly improving perceived performance and engagement.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Technical Specification](#technical-specification)
3. [API Design](#api-design)
4. [Implementation Plan](#implementation-plan)
5. [Error Handling](#error-handling)
6. [Security Considerations](#security-considerations)
7. [Testing Strategy](#testing-strategy)
8. [Performance & Scaling](#performance--scaling)
9. [Migration Path](#migration-path)

---

## 1. Architecture Overview

### Current Architecture

```
┌─────────────┐         ┌─────────────┐         ┌──────────────┐
│   Claude    │────────▶│ MCP Server  │────────▶│  Claude.ai   │
│             │  JSON   │             │  JSON   │   Artifact   │
│   Request   │  RPC    │  Generate   │ Response│              │
└─────────────┘         └─────────────┘         └──────────────┘
                              │
                              │ Blocking
                              ▼
                        [Generate All]
                        [Slides 1-5  ]
                        [Wait 5-10s  ]
```

### Target Architecture with SSE

```
┌─────────────┐         ┌─────────────┐         ┌──────────────┐
│   Claude    │────────▶│ MCP Server  │────────▶│  Claude.ai   │
│             │  JSON   │             │   SSE   │   Artifact   │
│   Request   │  RPC    │  Stream     │ Stream  │   Updates    │
└─────────────┘         └─────────────┘         └──────────────┘
                              │
                              │ Non-blocking
                              ▼
                        [Generate    ]
                        [Stream Slide 1] ──▶ Update UI
                        [Stream Slide 2] ──▶ Update UI
                        [Stream Slide 3] ──▶ Update UI
                        [Stream Slide 4] ──▶ Update UI
                        [Stream Slide 5] ──▶ Update UI
                        [Complete      ] ──▶ Finalize
```

### Component Architecture

```
┌───────────────────────────────────────────────────────────┐
│                     MCP Server                             │
├───────────────────────────────────────────────────────────┤
│                                                            │
│  ┌─────────────────┐         ┌──────────────────┐        │
│  │  JSON-RPC       │         │   SSE Endpoint   │        │
│  │  Handler        │◀───────▶│   /stream/:id    │        │
│  │                 │         │                  │        │
│  └────────┬────────┘         └────────┬─────────┘        │
│           │                           │                   │
│           ▼                           ▼                   │
│  ┌─────────────────────────────────────────────┐         │
│  │         Stream Manager                      │         │
│  │  - Create stream sessions                   │         │
│  │  - Track active connections                 │         │
│  │  - Handle cleanup                           │         │
│  └────────┬────────────────────────────────────┘         │
│           │                                               │
│           ▼                                               │
│  ┌─────────────────────────────────────────────┐         │
│  │      Presentation Generator                 │         │
│  │  - Generate slides progressively            │         │
│  │  - Emit events per slide                    │         │
│  │  - Handle errors gracefully                 │         │
│  └─────────────────────────────────────────────┘         │
│                                                            │
└───────────────────────────────────────────────────────────┘
```

---

## 2. Technical Specification

### 2.1 SSE Protocol Design

**Event Stream Format:**
```
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
X-Accel-Buffering: no

event: metadata
data: {"slideCount":5,"theme":"corporate","estimatedTime":8}

event: slide
data: {"index":0,"type":"title","html":"<div>...</div>","progress":0.2}

event: slide
data: {"index":1,"type":"content","html":"<div>...</div>","progress":0.4}

event: progress
data: {"current":2,"total":5,"percent":40,"message":"Generating slide 3..."}

event: slide
data: {"index":2,"type":"data","html":"<div>...</div>","progress":0.6}

event: slide
data: {"index":3,"type":"comparison","html":"<div>...</div>","progress":0.8}

event: slide
data: {"index":4,"type":"timeline","html":"<div>...</div>","progress":1.0}

event: complete
data: {"finalHtml":"<!DOCTYPE html>...","metadata":{"duration":7.2,"slideCount":5}}

event: done
data: [CLOSE]
```

### 2.2 Event Types

```typescript
// Event type definitions
type StreamEvent = 
  | MetadataEvent
  | SlideEvent
  | ProgressEvent
  | ErrorEvent
  | CompleteEvent
  | DoneEvent;

interface MetadataEvent {
  event: 'metadata';
  data: {
    streamId: string;
    slideCount: number;
    theme: string;
    title: string;
    estimatedTime: number;  // seconds
    timestamp: string;      // ISO 8601
  };
}

interface SlideEvent {
  event: 'slide';
  data: {
    index: number;
    type: SlideType;
    html: string;
    progress: number;       // 0.0 to 1.0
    timestamp: string;
  };
}

interface ProgressEvent {
  event: 'progress';
  data: {
    current: number;
    total: number;
    percent: number;
    message: string;
    timestamp: string;
  };
}

interface ErrorEvent {
  event: 'error';
  data: {
    code: string;
    message: string;
    slideIndex?: number;
    recoverable: boolean;
    timestamp: string;
  };
}

interface CompleteEvent {
  event: 'complete';
  data: {
    finalHtml: string;
    metadata: {
      duration: number;     // seconds
      slideCount: number;
      theme: string;
      generatedAt: string;
    };
  };
}

interface DoneEvent {
  event: 'done';
  data: null;
}
```

### 2.3 Connection Lifecycle

```
Client                          Server
  │                               │
  │  1. Initiate Stream           │
  ├──────────────────────────────▶│
  │  POST /create_presentation    │
  │  { streaming: true, ... }     │
  │                               │
  │  2. Return Stream ID          │
  │◀──────────────────────────────┤
  │  { streamId: "abc123" }       │
  │                               │
  │  3. Connect to SSE            │
  ├──────────────────────────────▶│
  │  GET /stream/abc123           │
  │                               │
  │  4. Stream Events             │
  │◀──────────────────────────────┤
  │  event: metadata              │
  │  event: slide (1)             │
  │  event: slide (2)             │
  │  ...                          │
  │  event: complete              │
  │  event: done                  │
  │                               │
  │  5. Close Connection          │
  │◀──────────────────────────────┤
  │                               │
```

---

## 3. API Design

### 3.1 New MCP Functions

#### `create_presentation_stream`

Initiates a streaming presentation generation.

**Request:**
```typescript
interface CreatePresentationStreamRequest {
  title: string;
  theme: string | CustomTheme;
  slides: SlideSpec[];
  metadata?: PresentationMetadata;
  options?: {
    aspectRatio?: '16:9' | '4:3';
    fontSize?: 'default' | 'large' | 'xlarge';
    streamOptions?: {
      chunkDelay?: number;      // ms between slides (for testing)
      includeProgress?: boolean; // Send progress events
      bufferSize?: number;       // SSE buffer size
    };
  };
}

interface CreatePresentationStreamResponse {
  success: boolean;
  streamId: string;
  streamUrl: string;            // e.g., "/stream/abc123"
  estimatedDuration: number;    // seconds
  slideCount: number;
  expiresAt: string;           // ISO 8601, stream TTL
}
```

**Example:**
```json
{
  "title": "AI in Healthcare",
  "theme": "corporate",
  "slides": [
    { "type": "title", "title": "AI in Healthcare", ... },
    { "type": "content", "title": "Applications", ... },
    ...
  ],
  "options": {
    "streamOptions": {
      "includeProgress": true
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "streamId": "pres_2025_abc123xyz",
  "streamUrl": "/stream/pres_2025_abc123xyz",
  "estimatedDuration": 8,
  "slideCount": 5,
  "expiresAt": "2025-10-20T18:30:00Z"
}
```

#### `get_stream_status`

Check the status of an active or completed stream.

**Request:**
```typescript
interface GetStreamStatusRequest {
  streamId: string;
}

interface GetStreamStatusResponse {
  streamId: string;
  status: 'pending' | 'streaming' | 'complete' | 'error' | 'expired';
  progress: {
    current: number;
    total: number;
    percent: number;
  };
  slidesGenerated: number;
  startedAt?: string;
  completedAt?: string;
  error?: {
    code: string;
    message: string;
  };
}
```

#### `cancel_stream`

Cancel an active stream.

**Request:**
```typescript
interface CancelStreamRequest {
  streamId: string;
  reason?: string;
}

interface CancelStreamResponse {
  success: boolean;
  streamId: string;
  message: string;
}
```

### 3.2 SSE Endpoint Specification

**Endpoint:** `GET /stream/:streamId`

**Headers:**
```http
GET /stream/pres_2025_abc123xyz HTTP/1.1
Host: mcp-server.example.com
Accept: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
Authorization: Bearer <token>  // If authentication required
```

**Response Headers:**
```http
HTTP/1.1 200 OK
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive
X-Accel-Buffering: no
Access-Control-Allow-Origin: *
```

**Event Stream:**
See section 2.1 for event format.

---

## 4. Implementation Plan

### Phase 1: Core Infrastructure (Week 1)

#### 4.1 Stream Manager Implementation

**File:** `src/stream/StreamManager.ts`

```typescript
import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';

interface StreamSession {
  id: string;
  status: 'pending' | 'streaming' | 'complete' | 'error' | 'cancelled';
  params: CreatePresentationStreamRequest;
  createdAt: Date;
  expiresAt: Date;
  connections: Set<ServerResponse>;
  generator?: AsyncGenerator<StreamEvent>;
  metadata: {
    slideCount: number;
    slidesGenerated: number;
    startedAt?: Date;
    completedAt?: Date;
    error?: Error;
  };
}

export class StreamManager extends EventEmitter {
  private sessions: Map<string, StreamSession> = new Map();
  private readonly SESSION_TTL = 5 * 60 * 1000; // 5 minutes
  private readonly MAX_SESSIONS = 1000;
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    super();
    this.startCleanup();
  }

  /**
   * Create a new stream session
   */
  createSession(params: CreatePresentationStreamRequest): string {
    // Check max sessions limit
    if (this.sessions.size >= this.MAX_SESSIONS) {
      this.cleanupExpiredSessions();
      if (this.sessions.size >= this.MAX_SESSIONS) {
        throw new Error('Maximum concurrent streams reached');
      }
    }

    const id = `pres_${Date.now()}_${uuidv4().slice(0, 8)}`;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + this.SESSION_TTL);

    const session: StreamSession = {
      id,
      status: 'pending',
      params,
      createdAt: now,
      expiresAt,
      connections: new Set(),
      metadata: {
        slideCount: params.slides.length,
        slidesGenerated: 0,
      },
    };

    this.sessions.set(id, session);
    this.emit('session:created', { id, params });

    return id;
  }

  /**
   * Get session by ID
   */
  getSession(id: string): StreamSession | undefined {
    return this.sessions.get(id);
  }

  /**
   * Add connection to session
   */
  addConnection(sessionId: string, response: ServerResponse): void {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session not found: ${sessionId}`);
    }

    session.connections.add(response);
    this.emit('connection:added', { sessionId, connectionCount: session.connections.size });

    // Start generation when first connection arrives
    if (session.connections.size === 1 && session.status === 'pending') {
      this.startGeneration(session);
    }
  }

  /**
   * Remove connection from session
   */
  removeConnection(sessionId: string, response: ServerResponse): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.connections.delete(response);
      this.emit('connection:removed', { sessionId, connectionCount: session.connections.size });
    }
  }

  /**
   * Start presentation generation
   */
  private async startGeneration(session: StreamSession): Promise<void> {
    session.status = 'streaming';
    session.metadata.startedAt = new Date();

    try {
      // Create generator
      session.generator = this.generatePresentation(session);

      // Consume events and broadcast
      for await (const event of session.generator) {
        this.broadcast(session, event);

        // Update metadata
        if (event.event === 'slide') {
          session.metadata.slidesGenerated++;
        }
      }

      // Mark as complete
      session.status = 'complete';
      session.metadata.completedAt = new Date();
      this.emit('session:complete', { id: session.id });

    } catch (error) {
      session.status = 'error';
      session.metadata.error = error as Error;
      session.metadata.completedAt = new Date();

      // Broadcast error
      this.broadcast(session, {
        event: 'error',
        data: {
          code: 'GENERATION_ERROR',
          message: (error as Error).message,
          recoverable: false,
          timestamp: new Date().toISOString(),
        },
      });

      this.emit('session:error', { id: session.id, error });
    }
  }

  /**
   * Generate presentation events
   */
  private async *generatePresentation(session: StreamSession): AsyncGenerator<StreamEvent> {
    const { params } = session;

    // Send metadata event
    yield {
      event: 'metadata',
      data: {
        streamId: session.id,
        slideCount: params.slides.length,
        theme: typeof params.theme === 'string' ? params.theme : 'custom',
        title: params.title,
        estimatedTime: params.slides.length * 1.5, // 1.5s per slide estimate
        timestamp: new Date().toISOString(),
      },
    };

    // Generate each slide
    for (let i = 0; i < params.slides.length; i++) {
      // Progress event (optional)
      if (params.options?.streamOptions?.includeProgress) {
        yield {
          event: 'progress',
          data: {
            current: i + 1,
            total: params.slides.length,
            percent: Math.round(((i + 1) / params.slides.length) * 100),
            message: `Generating slide ${i + 1} of ${params.slides.length}...`,
            timestamp: new Date().toISOString(),
          },
        };
      }

      // Generate slide HTML
      const slideHtml = await this.generateSlideHTML(params.slides[i], i, params);

      // Slide event
      yield {
        event: 'slide',
        data: {
          index: i,
          type: params.slides[i].type,
          html: slideHtml,
          progress: (i + 1) / params.slides.length,
          timestamp: new Date().toISOString(),
        },
      };

      // Artificial delay for testing (remove in production)
      const delay = params.options?.streamOptions?.chunkDelay ?? 0;
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    // Generate complete HTML
    const finalHtml = await this.generateCompleteHTML(session);

    // Complete event
    yield {
      event: 'complete',
      data: {
        finalHtml,
        metadata: {
          duration: session.metadata.startedAt 
            ? (new Date().getTime() - session.metadata.startedAt.getTime()) / 1000
            : 0,
          slideCount: params.slides.length,
          theme: typeof params.theme === 'string' ? params.theme : 'custom',
          generatedAt: new Date().toISOString(),
        },
      },
    };

    // Done event (signals stream close)
    yield {
      event: 'done',
      data: null,
    };
  }

  /**
   * Generate HTML for a single slide
   */
  private async generateSlideHTML(
    slide: SlideSpec,
    index: number,
    params: CreatePresentationStreamRequest
  ): Promise<string> {
    // Import existing slide generation logic
    const { generateSlide } = await import('../generators/slideGenerator');
    return generateSlide(slide, index, params.theme, params.options);
  }

  /**
   * Generate complete presentation HTML
   */
  private async generateCompleteHTML(session: StreamSession): Promise<string> {
    // Import existing presentation generation logic
    const { generatePresentation } = await import('../generators/presentationGenerator');
    return generatePresentation({
      ...session.params,
      streaming: false, // Generate complete version
    });
  }

  /**
   * Broadcast event to all connections in a session
   */
  private broadcast(session: StreamSession, event: StreamEvent): void {
    const eventString = `event: ${event.event}\ndata: ${JSON.stringify(event.data)}\n\n`;

    for (const connection of session.connections) {
      try {
        connection.write(eventString);
      } catch (error) {
        console.error(`Failed to write to connection:`, error);
        this.removeConnection(session.id, connection);
      }
    }
  }

  /**
   * Cancel a stream session
   */
  cancelSession(sessionId: string, reason?: string): void {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session not found: ${sessionId}`);
    }

    session.status = 'cancelled';

    // Broadcast error event
    this.broadcast(session, {
      event: 'error',
      data: {
        code: 'CANCELLED',
        message: reason || 'Stream cancelled by client',
        recoverable: false,
        timestamp: new Date().toISOString(),
      },
    });

    // Close all connections
    for (const connection of session.connections) {
      connection.end();
    }

    this.emit('session:cancelled', { id: sessionId, reason });
  }

  /**
   * Cleanup expired sessions
   */
  private cleanupExpiredSessions(): void {
    const now = new Date();
    const expired: string[] = [];

    for (const [id, session] of this.sessions) {
      if (now > session.expiresAt || 
          (session.status === 'complete' && session.connections.size === 0)) {
        expired.push(id);
      }
    }

    for (const id of expired) {
      const session = this.sessions.get(id);
      if (session) {
        // Close any remaining connections
        for (const connection of session.connections) {
          connection.end();
        }
        this.sessions.delete(id);
        this.emit('session:expired', { id });
      }
    }

    if (expired.length > 0) {
      console.log(`Cleaned up ${expired.length} expired sessions`);
    }
  }

  /**
   * Start periodic cleanup
   */
  private startCleanup(): void {
    this.cleanupInterval = setInterval(() => {
      this.cleanupExpiredSessions();
    }, 60 * 1000); // Every minute
  }

  /**
   * Shutdown stream manager
   */
  shutdown(): void {
    clearInterval(this.cleanupInterval);

    // Cancel all active sessions
    for (const [id, session] of this.sessions) {
      if (session.status === 'streaming' || session.status === 'pending') {
        this.cancelSession(id, 'Server shutting down');
      }
    }

    this.sessions.clear();
  }
}
```

#### 4.2 HTTP Server Setup

**File:** `src/server/streamServer.ts`

```typescript
import express, { Request, Response } from 'express';
import { StreamManager } from '../stream/StreamManager';

export function setupStreamEndpoints(app: express.Application, streamManager: StreamManager) {
  
  /**
   * SSE endpoint
   */
  app.get('/stream/:streamId', (req: Request, res: Response) => {
    const { streamId } = req.params;

    // Validate session
    const session = streamManager.getSession(streamId);
    if (!session) {
      res.status(404).json({ error: 'Stream not found' });
      return;
    }

    // Check if expired
    if (new Date() > session.expiresAt) {
      res.status(410).json({ error: 'Stream expired' });
      return;
    }

    // Set SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no'); // Disable nginx buffering
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Keep connection alive with periodic comments
    const keepAliveInterval = setInterval(() => {
      res.write(': keep-alive\n\n');
    }, 15000); // Every 15 seconds

    // Add connection to session
    streamManager.addConnection(streamId, res);

    // Handle client disconnect
    req.on('close', () => {
      clearInterval(keepAliveInterval);
      streamManager.removeConnection(streamId, res);
    });

    // Handle errors
    res.on('error', (error) => {
      console.error(`Stream error for ${streamId}:`, error);
      clearInterval(keepAliveInterval);
      streamManager.removeConnection(streamId, res);
    });
  });

  /**
   * Get stream status
   */
  app.get('/stream/:streamId/status', (req: Request, res: Response) => {
    const { streamId } = req.params;
    const session = streamManager.getSession(streamId);

    if (!session) {
      res.status(404).json({ error: 'Stream not found' });
      return;
    }

    const response = {
      streamId: session.id,
      status: session.status,
      progress: {
        current: session.metadata.slidesGenerated,
        total: session.metadata.slideCount,
        percent: Math.round((session.metadata.slidesGenerated / session.metadata.slideCount) * 100),
      },
      slidesGenerated: session.metadata.slidesGenerated,
      startedAt: session.metadata.startedAt?.toISOString(),
      completedAt: session.metadata.completedAt?.toISOString(),
      error: session.metadata.error ? {
        code: 'GENERATION_ERROR',
        message: session.metadata.error.message,
      } : undefined,
    };

    res.json(response);
  });

  /**
   * Cancel stream
   */
  app.delete('/stream/:streamId', (req: Request, res: Response) => {
    const { streamId } = req.params;
    const { reason } = req.body;

    try {
      streamManager.cancelSession(streamId, reason);
      res.json({ success: true, streamId, message: 'Stream cancelled' });
    } catch (error) {
      res.status(404).json({ 
        success: false, 
        error: (error as Error).message 
      });
    }
  });
}
```

#### 4.3 MCP Integration

**File:** `src/mcp/streamHandlers.ts`

```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StreamManager } from '../stream/StreamManager';

export function registerStreamHandlers(server: Server, streamManager: StreamManager) {
  
  /**
   * Create streaming presentation
   */
  server.setRequestHandler(
    {
      method: 'tools/call',
      params: {
        name: 'create_presentation_stream',
      },
    },
    async (request) => {
      const params = request.params.arguments as CreatePresentationStreamRequest;

      try {
        // Create stream session
        const streamId = streamManager.createSession(params);
        const session = streamManager.getSession(streamId);

        if (!session) {
          throw new Error('Failed to create stream session');
        }

        // Return stream info
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              success: true,
              streamId,
              streamUrl: `/stream/${streamId}`,
              estimatedDuration: params.slides.length * 1.5,
              slideCount: params.slides.length,
              expiresAt: session.expiresAt.toISOString(),
            }, null, 2),
          }],
        };
      } catch (error) {
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              success: false,
              error: (error as Error).message,
            }, null, 2),
          }],
          isError: true,
        };
      }
    }
  );

  /**
   * Get stream status
   */
  server.setRequestHandler(
    {
      method: 'tools/call',
      params: {
        name: 'get_stream_status',
      },
    },
    async (request) => {
      const { streamId } = request.params.arguments as GetStreamStatusRequest;
      const session = streamManager.getSession(streamId);

      if (!session) {
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              error: 'Stream not found',
            }),
          }],
          isError: true,
        };
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            streamId: session.id,
            status: session.status,
            progress: {
              current: session.metadata.slidesGenerated,
              total: session.metadata.slideCount,
              percent: Math.round((session.metadata.slidesGenerated / session.metadata.slideCount) * 100),
            },
            slidesGenerated: session.metadata.slidesGenerated,
            startedAt: session.metadata.startedAt?.toISOString(),
            completedAt: session.metadata.completedAt?.toISOString(),
          }, null, 2),
        }],
      };
    }
  );

  /**
   * Cancel stream
   */
  server.setRequestHandler(
    {
      method: 'tools/call',
      params: {
        name: 'cancel_stream',
      },
    },
    async (request) => {
      const { streamId, reason } = request.params.arguments as CancelStreamRequest;

      try {
        streamManager.cancelSession(streamId, reason);
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              success: true,
              streamId,
              message: 'Stream cancelled',
            }, null, 2),
          }],
        };
      } catch (error) {
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              success: false,
              error: (error as Error).message,
            }),
          }],
          isError: true,
        };
      }
    }
  );
}
```

### Phase 2: Client Integration (Week 2)

#### 4.4 Client-Side SSE Handler

**File:** `client/src/services/StreamClient.ts`

```typescript
export class PresentationStreamClient {
  private eventSource: EventSource | null = null;
  private callbacks: Map<string, Function[]> = new Map();

  /**
   * Connect to stream
   */
  connect(streamUrl: string): void {
    this.eventSource = new EventSource(streamUrl);

    // Register event listeners
    this.eventSource.addEventListener('metadata', (e) => {
      const data = JSON.parse(e.data);
      this.emit('metadata', data);
    });

    this.eventSource.addEventListener('slide', (e) => {
      const data = JSON.parse(e.data);
      this.emit('slide', data);
    });

    this.eventSource.addEventListener('progress', (e) => {
      const data = JSON.parse(e.data);
      this.emit('progress', data);
    });

    this.eventSource.addEventListener('error', (e) => {
      const data = JSON.parse(e.data);
      this.emit('error', data);
    });

    this.eventSource.addEventListener('complete', (e) => {
      const data = JSON.parse(e.data);
      this.emit('complete', data);
    });

    this.eventSource.addEventListener('done', () => {
      this.close();
    });

    // Handle connection errors
    this.eventSource.onerror = (error) => {
      console.error('SSE connection error:', error);
      this.emit('connection-error', error);
      this.close();
    };
  }

  /**
   * Subscribe to events
   */
  on(event: string, callback: Function): void {
    if (!this.callbacks.has(event)) {
      this.callbacks.set(event, []);
    }
    this.callbacks.get(event)!.push(callback);
  }

  /**
   * Emit event to subscribers
   */
  private emit(event: string, data: any): void {
    const callbacks = this.callbacks.get(event);
    if (callbacks) {
      callbacks.forEach(cb => cb(data));
    }
  }

  /**
   * Close connection
   */
  close(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    this.callbacks.clear();
  }
}
```

#### 4.5 Claude Integration Example

```typescript
// How Claude would use the streaming API

async function createStreamingPresentation() {
  // Step 1: Initiate stream
  const streamResponse = await tools.create_presentation_stream({
    title: "AI in Healthcare",
    theme: "corporate",
    slides: [
      { type: "title", title: "AI in Healthcare", ... },
      { type: "content", title: "Applications", ... },
      // ... more slides
    ],
    options: {
      streamOptions: {
        includeProgress: true
      }
    }
  });

  const { streamId, streamUrl } = streamResponse;

  // Step 2: Create artifact with skeleton
  await artifacts.create({
    id: `pres-${streamId}`,
    type: "text/html",
    title: "AI in Healthcare",
    content: generateSkeletonHTML(5) // 5 slides with loading states
  });

  // Step 3: Connect to stream (handled by Claude.ai frontend)
  // The frontend establishes SSE connection and updates artifact
  return {
    message: "Streaming presentation generation started...",
    streamId,
    streamUrl
  };
}
```

### Phase 3: Testing & Optimization (Week 3)

#### 4.6 Unit Tests

**File:** `tests/unit/StreamManager.test.ts`

```typescript
import { StreamManager } from '../../src/stream/StreamManager';

describe('StreamManager', () => {
  let manager: StreamManager;

  beforeEach(() => {
    manager = new StreamManager();
  });

  afterEach(() => {
    manager.shutdown();
  });

  test('should create session with unique ID', () => {
    const id1 = manager.createSession(mockParams);
    const id2 = manager.createSession(mockParams);
    expect(id1).not.toBe(id2);
  });

  test('should enforce max sessions limit', () => {
    // Create MAX_SESSIONS number of sessions
    for (let i = 0; i < 1000; i++) {
      manager.createSession(mockParams);
    }
    
    // Next one should trigger cleanup
    expect(() => manager.createSession(mockParams)).not.toThrow();
  });

  test('should cleanup expired sessions', async () => {
    const id = manager.createSession(mockParams);
    const session = manager.getSession(id);
    
    // Manually expire session
    session!.expiresAt = new Date(Date.now() - 1000);
    
    // Trigger cleanup
    await new Promise(resolve => setTimeout(resolve, 61000));
    
    expect(manager.getSession(id)).toBeUndefined();
  });

  test('should cancel session and close connections', () => {
    const id = manager.createSession(mockParams);
    const mockResponse = createMockResponse();
    
    manager.addConnection(id, mockResponse);
    manager.cancelSession(id);
    
    const session = manager.getSession(id);
    expect(session!.status).toBe('cancelled');
    expect(mockResponse.end).toHaveBeenCalled();
  });
});
```

#### 4.7 Integration Tests

**File:** `tests/integration/streaming.test.ts`

```typescript
import request from 'supertest';
import { app } from '../../src/server/app';

describe('Streaming Endpoints', () => {
  
  test('should create stream and receive events', async () => {
    // Create stream
    const createResponse = await request(app)
      .post('/create_presentation_stream')
      .send(mockPresentationParams)
      .expect(200);

    const { streamId, streamUrl } = createResponse.body;
    expect(streamId).toBeDefined();
    expect(streamUrl).toMatch(/^\/stream\//);

    // Connect to SSE (using EventSource mock)
    const events: any[] = [];
    const client = new EventSource(`http://localhost:3000${streamUrl}`);

    client.addEventListener('slide', (e) => {
      events.push(JSON.parse(e.data));
    });

    // Wait for completion
    await new Promise((resolve) => {
      client.addEventListener('done', resolve);
    });

    // Verify all slides received
    expect(events).toHaveLength(5);
    expect(events[0].index).toBe(0);
    expect(events[4].index).toBe(4);

    client.close();
  });

  test('should handle multiple concurrent streams', async () => {
    const streams = await Promise.all([
      createStream(mockParams1),
      createStream(mockParams2),
      createStream(mockParams3),
    ]);

    expect(streams).toHaveLength(3);
    expect(new Set(streams.map(s => s.streamId)).size).toBe(3);
  });

  test('should return 404 for non-existent stream', async () => {
    await request(app)
      .get('/stream/invalid-id')
      .expect(404);
  });
});
```

---

## 5. Error Handling

### 5.1 Error Categories

```typescript
enum StreamErrorCode {
  // Connection errors
  CONNECTION_FAILED = 'CONNECTION_FAILED',
  CONNECTION_TIMEOUT = 'CONNECTION_TIMEOUT',
  CONNECTION_CLOSED = 'CONNECTION_CLOSED',
  
  // Generation errors
  GENERATION_ERROR = 'GENERATION_ERROR',
  SLIDE_GENERATION_FAILED = 'SLIDE_GENERATION_FAILED',
  THEME_ERROR = 'THEME_ERROR',
  
  // Resource errors
  MAX_SESSIONS_EXCEEDED = 'MAX_SESSIONS_EXCEEDED',
  STREAM_NOT_FOUND = 'STREAM_NOT_FOUND',
  STREAM_EXPIRED = 'STREAM_EXPIRED',
  
  // Client errors
  INVALID_PARAMS = 'INVALID_PARAMS',
  CANCELLED = 'CANCELLED',
}
```

### 5.2 Error Recovery Strategies

```typescript
class StreamErrorHandler {
  
  /**
   * Handle slide generation error
   */
  async handleSlideError(
    session: StreamSession,
    slideIndex: number,
    error: Error
  ): Promise<void> {
    // Broadcast error event
    this.broadcast(session, {
      event: 'error',
      data: {
        code: 'SLIDE_GENERATION_FAILED',
        message: `Failed to generate slide ${slideIndex}: ${error.message}`,
        slideIndex,
        recoverable: true,
        timestamp: new Date().toISOString(),
      },
    });

    // Try to continue with placeholder
    const placeholderHtml = this.generateErrorPlaceholder(slideIndex, error);
    
    this.broadcast(session, {
      event: 'slide',
      data: {
        index: slideIndex,
        type: 'error',
        html: placeholderHtml,
        progress: (slideIndex + 1) / session.metadata.slideCount,
        timestamp: new Date().toISOString(),
      },
    });
  }

  /**
   * Handle connection error
   */
  handleConnectionError(
    session: StreamSession,
    connection: ServerResponse,
    error: Error
  ): void {
    console.error(`Connection error for stream ${session.id}:`, error);
    
    // Remove failed connection
    session.connections.delete(connection);
    
    // If no connections left, pause generation
    if (session.connections.size === 0) {
      console.log(`No active connections for stream ${session.id}, pausing...`);
      // Generation will resume when new connection arrives
    }
  }

  /**
   * Generate error placeholder slide
   */
  private generateErrorPlaceholder(index: number, error: Error): string {
    return `
      <div class="slideyui-slide error-slide">
        <div class="error-content">
          <h2>⚠️ Generation Error</h2>
          <p>Slide ${index + 1} could not be generated.</p>
          <p class="error-message">${error.message}</p>
        </div>
      </div>
    `;
  }
}
```

### 5.3 Timeout Handling

```typescript
class TimeoutManager {
  private readonly GENERATION_TIMEOUT = 30000; // 30 seconds per slide
  private readonly STREAM_TIMEOUT = 300000;    // 5 minutes total
  
  /**
   * Wrap generation with timeout
   */
  async withTimeout<T>(
    operation: Promise<T>,
    timeout: number,
    errorMessage: string
  ): Promise<T> {
    return Promise.race([
      operation,
      new Promise<T>((_, reject) =>
        setTimeout(() => reject(new Error(errorMessage)), timeout)
      ),
    ]);
  }
}
```

---

## 6. Security Considerations

### 6.1 Authentication & Authorization

```typescript
// Middleware for stream authentication
app.use('/stream/:streamId', (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  
  // Verify token
  const userId = verifyToken(token);
  if (!userId) {
    res.status(401).json({ error: 'Invalid token' });
    return;
  }
  
  // Verify stream ownership
  const { streamId } = req.params;
  const session = streamManager.getSession(streamId);
  
  if (!session || session.params.userId !== userId) {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }
  
  next();
});
```

### 6.2 Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

// Limit stream creation
const createStreamLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Max 10 streams per 15 minutes per IP
  message: 'Too many streams created, please try again later',
});

app.post('/create_presentation_stream', createStreamLimiter, async (req, res) => {
  // ... handler
});
```

### 6.3 Input Validation

```typescript
import Joi from 'joi';

const streamParamsSchema = Joi.object({
  title: Joi.string().required().max(200),
  theme: Joi.string().required(),
  slides: Joi.array().items(Joi.object()).min(1).max(50),
  metadata: Joi.object().optional(),
  options: Joi.object().optional(),
});

// Validate before creating stream
const { error } = streamParamsSchema.validate(params);
if (error) {
  throw new Error(`Invalid params: ${error.message}`);
}
```

### 6.4 Resource Limits

```typescript
const LIMITS = {
  MAX_CONCURRENT_STREAMS: 1000,
  MAX_SLIDES_PER_PRESENTATION: 50,
  MAX_CONNECTIONS_PER_STREAM: 10,
  MAX_STREAM_DURATION: 5 * 60 * 1000, // 5 minutes
  MAX_SLIDE_SIZE: 1 * 1024 * 1024, // 1 MB per slide
};
```

---

## 7. Testing Strategy

### 7.1 Test Coverage Requirements

- **Unit Tests**: 90%+ coverage
  - StreamManager
  - Event generation
  - Error handling
  - Cleanup logic

- **Integration Tests**: Critical paths
  - End-to-end streaming
  - Multiple concurrent streams
  - Error scenarios
  - Connection handling

- **Load Tests**: Performance validation
  - 100 concurrent streams
  - 1000 total sessions
  - Network latency simulation
  - Memory leak detection

### 7.2 Test Scenarios

```typescript
describe('Streaming Performance', () => {
  test('should handle 100 concurrent streams', async () => {
    const streams = [];
    for (let i = 0; i < 100; i++) {
      streams.push(createAndConsumeStream());
    }
    await Promise.all(streams);
    expect(true).toBe(true); // All completed without errors
  });

  test('should not leak memory over 1000 streams', async () => {
    const initialMemory = process.memoryUsage().heapUsed;
    
    for (let i = 0; i < 1000; i++) {
      await createAndConsumeStream();
    }
    
    global.gc(); // Force garbage collection
    const finalMemory = process.memoryUsage().heapUsed;
    const growth = (finalMemory - initialMemory) / initialMemory;
    
    expect(growth).toBeLessThan(0.1); // Less than 10% growth
  });
});
```

---

## 8. Performance & Scaling

### 8.1 Performance Targets

| Metric | Target | Measured |
|--------|--------|----------|
| Time to first slide | < 1s | TBD |
| Inter-slide delay | < 500ms | TBD |
| Total generation time (5 slides) | < 5s | TBD |
| Memory per stream | < 10 MB | TBD |
| Concurrent streams | 100+ | TBD |
| CPU usage (per stream) | < 10% | TBD |

### 8.2 Optimization Strategies

```typescript
// 1. Slide generation parallelization
async function generateSlidesParallel(slides: SlideSpec[]): Promise<string[]> {
  // Generate slides in parallel (with concurrency limit)
  const limit = pLimit(3); // Max 3 concurrent generations
  
  const promises = slides.map((slide, index) =>
    limit(() => generateSlideHTML(slide, index))
  );
  
  return Promise.all(promises);
}

// 2. Template caching
const templateCache = new Map<string, string>();

function getTemplate(theme: string): string {
  if (!templateCache.has(theme)) {
    templateCache.set(theme, loadTemplate(theme));
  }
  return templateCache.get(theme)!;
}

// 3. Connection pooling
class ConnectionPool {
  private pool: ServerResponse[] = [];
  private readonly MAX_POOL_SIZE = 100;
  
  acquire(): ServerResponse | null {
    return this.pool.pop() || null;
  }
  
  release(connection: ServerResponse): void {
    if (this.pool.length < this.MAX_POOL_SIZE) {
      this.pool.push(connection);
    }
  }
}
```

### 8.3 Monitoring & Metrics

```typescript
import prometheus from 'prom-client';

// Define metrics
const streamCounter = new prometheus.Counter({
  name: 'slideyui_streams_total',
  help: 'Total number of streams created',
  labelNames: ['status'],
});

const streamDuration = new prometheus.Histogram({
  name: 'slideyui_stream_duration_seconds',
  help: 'Duration of stream generation',
  buckets: [1, 2, 5, 10, 30, 60],
});

const activeStreams = new prometheus.Gauge({
  name: 'slideyui_active_streams',
  help: 'Number of currently active streams',
});

const slideGenerationTime = new prometheus.Histogram({
  name: 'slideyui_slide_generation_seconds',
  help: 'Time to generate individual slides',
  labelNames: ['type'],
  buckets: [0.1, 0.5, 1, 2, 5],
});

// Instrument code
streamManager.on('session:created', () => {
  streamCounter.inc({ status: 'created' });
  activeStreams.inc();
});

streamManager.on('session:complete', ({ duration }) => {
  streamDuration.observe(duration);
  activeStreams.dec();
  streamCounter.inc({ status: 'complete' });
});
```

---

## 9. Migration Path

### 9.1 Backwards Compatibility

```typescript
// Existing function still works
function create_presentation(params): string {
  // Legacy synchronous generation
  return generatePresentationSync(params);
}

// New streaming function
function create_presentation_stream(params): StreamInfo {
  // Returns stream info for SSE connection
  return initiateStream(params);
}
```

### 9.2 Feature Flag

```typescript
// Enable streaming based on feature flag
const ENABLE_STREAMING = process.env.SLIDEYUI_STREAMING === 'true';

if (ENABLE_STREAMING) {
  registerStreamHandlers(server, streamManager);
  setupStreamEndpoints(app, streamManager);
}
```

### 9.3 Gradual Rollout

**Phase 1**: Internal testing
- Enable for Anthropic employees only
- Monitor performance and errors
- Gather feedback

**Phase 2**: Beta users
- Enable for opted-in beta users
- A/B test streaming vs non-streaming
- Measure engagement metrics

**Phase 3**: General availability
- Enable for all users
- Make streaming default
- Keep non-streaming as fallback

---

## 10. Documentation

### 10.1 API Documentation

```markdown
# Streaming API

## Create Streaming Presentation

Initiates real-time generation of a presentation with progressive slide delivery.

**Endpoint:** `POST /create_presentation_stream`

**Parameters:**
- `title` (string, required): Presentation title
- `theme` (string, required): Theme name or custom theme object
- `slides` (array, required): Array of slide specifications
- `options` (object, optional): Generation options

**Response:**
```json
{
  "success": true,
  "streamId": "pres_2025_abc123xyz",
  "streamUrl": "/stream/pres_2025_abc123xyz",
  "estimatedDuration": 8,
  "slideCount": 5,
  "expiresAt": "2025-10-20T18:30:00Z"
}
```

## Connect to Stream

**Endpoint:** `GET /stream/:streamId`

**Headers:**
- `Accept: text/event-stream`

**Events:**
- `metadata`: Stream initialization
- `slide`: Individual slide generation
- `progress`: Generation progress updates
- `error`: Error notifications
- `complete`: Final HTML delivery
- `done`: Stream completion signal
```

### 10.2 Usage Examples

```typescript
// Example 1: Basic streaming
const stream = await create_presentation_stream({
  title: "My Presentation",
  theme: "corporate",
  slides: [...]
});

const eventSource = new EventSource(stream.streamUrl);

eventSource.addEventListener('slide', (e) => {
  const slide = JSON.parse(e.data);
  updateUI(slide);
});

// Example 2: With progress tracking
eventSource.addEventListener('progress', (e) => {
  const progress = JSON.parse(e.data);
  updateProgressBar(progress.percent);
});

// Example 3: Error handling
eventSource.addEventListener('error', (e) => {
  const error = JSON.parse(e.data);
  if (error.recoverable) {
    // Show warning but continue
    showWarning(error.message);
  } else {
    // Fatal error, stop stream
    eventSource.close();
    showError(error.message);
  }
});
```

---

## Implementation Timeline

### Week 1: Core Infrastructure
- [ ] Day 1-2: StreamManager implementation
- [ ] Day 3: HTTP server setup
- [ ] Day 4: MCP integration
- [ ] Day 5: Basic testing

### Week 2: Client & Integration
- [ ] Day 1-2: Client-side SSE handler
- [ ] Day 3: Claude integration
- [ ] Day 4-5: End-to-end testing

### Week 3: Testing & Optimization
- [ ] Day 1-2: Performance testing & optimization
- [ ] Day 3: Load testing
- [ ] Day 4: Documentation
- [ ] Day 5: Beta deployment

### Week 4: Production Rollout
- [ ] Day 1-2: Monitoring setup
- [ ] Day 3: Internal beta
- [ ] Day 4-5: Public beta

---

## Success Criteria

✅ Time to first slide < 1 second
✅ Support 100+ concurrent streams
✅ 99.9% uptime for streaming endpoint
✅ < 0.1% error rate
✅ Memory usage < 10 MB per stream
✅ All tests passing with 90%+ coverage
✅ Documentation complete
✅ Positive user feedback (> 4/5 rating)

---

## Open Questions

1. **Claude.ai Integration**: How does the frontend artifact system handle SSE connections?
2. **Network Requirements**: What are the typical network conditions for Claude.ai users?
3. **Mobile Support**: Should we optimize for mobile network conditions?
4. **Caching**: Should completed streams be cached for replay?
5. **Analytics**: What metrics should we track for user engagement?

---

## Next Steps

1. Review specification with engineering team
2. Estimate implementation timeline
3. Set up development environment
4. Create feature branch
5. Begin Phase 1 implementation

---

Would you like me to:
1. Expand on any specific section?
2. Add more code examples?
3. Create database schema if persistence is needed?
4. Design the monitoring dashboard?
5. Write the deployment guide?