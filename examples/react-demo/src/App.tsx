/**
 * SlideyUI Demo Presentation
 * "The Future of Presentations"
 */

import {
  Deck,
  TitleSlide,
  ContentSlide,
  ComparisonSlide,
  DataSlide,
  Callout,
  Quote,
  Timeline,
  CodeBlock,
  BuildStep,
} from '@slideyui/react';

function App() {
  return (
    <Deck theme="pitch-deck" showProgress showSlideNumbers>
      {/* Title Slide */}
      <TitleSlide
        title="The Future of Presentations"
        subtitle="Building slides that actually work"
        author="SlideyUI Team"
        date="October 2024"
      />

      {/* Problem Statement */}
      <ContentSlide title="The Problem">
        <BuildStep step={1}>
          <Callout type="warning">
            Traditional presentation tools are designed for print, not projection
          </Callout>
        </BuildStep>

        <BuildStep step={2}>
          <ul className="slide-list mt-8">
            <li>Fonts too small to read from the back row</li>
            <li>Poor contrast on projectors</li>
            <li>Content cut off by screen edges</li>
            <li>No code-friendly workflows</li>
          </ul>
        </BuildStep>
      </ContentSlide>

      {/* Solution */}
      <ContentSlide title="Introducing SlideyUI">
        <p className="slide-body mb-6">
          A presentation-first component library built on Tailwind CSS
        </p>

        <div className="grid grid-cols-2 gap-6 mt-8">
          <Callout type="key">
            <strong>Projection-Optimized</strong>
            <br />
            24px minimum font size
          </Callout>

          <Callout type="success">
            <strong>Developer-Friendly</strong>
            <br />
            React components + Tailwind
          </Callout>

          <Callout type="info">
            <strong>Theme System</strong>
            <br />
            5 professional themes
          </Callout>

          <Callout type="question">
            <strong>Export-Ready</strong>
            <br />
            PDF, PowerPoint, Web
          </Callout>
        </div>
      </ContentSlide>

      {/* Comparison */}
      <ComparisonSlide
        title="Traditional vs SlideyUI"
        left={{
          title: "Traditional Tools",
          content: (
            <ul className="slide-list">
              <li>Fixed canvas size</li>
              <li>Manual font sizing</li>
              <li>No version control</li>
              <li>Limited customization</li>
              <li>Export issues</li>
            </ul>
          ),
        }}
        right={{
          title: "SlideyUI",
          content: (
            <ul className="slide-list">
              <li>Responsive design</li>
              <li>Optimized typography</li>
              <li>Git-friendly</li>
              <li>Fully customizable</li>
              <li>Multi-format export</li>
            </ul>
          ),
        }}
      />

      {/* Features */}
      <ContentSlide title="Key Features">
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <span className="slide-number-huge text-slide-accent">5</span>
            <div>
              <h3 className="text-3xl font-bold mb-2">Professional Themes</h3>
              <p className="text-2xl">Corporate, Pitch Deck, Academic, Workshop, Startup</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="slide-number-huge text-slide-accent">12+</span>
            <div>
              <h3 className="text-3xl font-bold mb-2">Specialized Components</h3>
              <p className="text-2xl">Callouts, Quotes, Timelines, Code Blocks, Polls</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="slide-number-huge text-slide-accent">∞</span>
            <div>
              <h3 className="text-3xl font-bold mb-2">Customization Options</h3>
              <p className="text-2xl">Full Tailwind CSS flexibility</p>
            </div>
          </div>
        </div>
      </ContentSlide>

      {/* Code Example */}
      <ContentSlide title="Developer Experience" layout="code-focus">
        <CodeBlock language="jsx">
          {`import { Deck, TitleSlide, ContentSlide } from '@slideyui/react';

function MyPresentation() {
  return (
    <Deck theme="corporate" showProgress>
      <TitleSlide
        title="My Presentation"
        author="Your Name"
      />

      <ContentSlide title="Key Points">
        <ul className="slide-list">
          <li>Easy to use</li>
          <li>Beautiful design</li>
          <li>Export anywhere</li>
        </ul>
      </ContentSlide>
    </Deck>
  );
}`}
        </CodeBlock>
      </ContentSlide>

      {/* Timeline */}
      <ContentSlide title="Our Journey">
        <Timeline
          events={[
            { date: 'Q1 2024', description: 'Initial concept and research' },
            { date: 'Q2 2024', description: 'Core plugin development' },
            { date: 'Q3 2024', description: 'React components library' },
            { date: 'Q4 2024', description: 'Public launch 🚀' },
          ]}
          currentIndex={3}
        />
      </ContentSlide>

      {/* Quote */}
      <ContentSlide title="What People Say">
        <Quote
          quote="SlideyUI changed how we create technical presentations. The code blocks alone are worth it!"
          author="Alex Chen"
          role="Engineering Manager"
        />

        <div className="mt-8">
          <Quote
            quote="Finally, a presentation tool that works WITH my workflow instead of against it."
            author="Sarah Johnson"
            role="Product Designer"
          />
        </div>
      </ContentSlide>

      {/* Data Slide */}
      <DataSlide
        title="By the Numbers"
        chart={
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="slide-number-huge text-slide-primary">10k+</div>
              <p className="text-2xl mt-4">Downloads</p>
            </div>
            <div>
              <div className="slide-number-huge text-slide-accent">98%</div>
              <p className="text-2xl mt-4">Satisfaction</p>
            </div>
            <div>
              <div className="slide-number-huge text-slide-secondary">500+</div>
              <p className="text-2xl mt-4">Companies</p>
            </div>
          </div>
        }
        insights={[
          'Used by Fortune 500 companies',
          'Over 50,000 slides created',
          'Average 40% time savings',
        ]}
        source="Internal metrics, October 2024"
      />

      {/* Getting Started */}
      <ContentSlide title="Get Started in 3 Steps">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slide-accent text-white text-2xl font-bold">
              1
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">Install</h3>
              <CodeBlock language="bash">npm install slideyui @slideyui/react</CodeBlock>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slide-accent text-white text-2xl font-bold">
              2
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">Configure</h3>
              <p className="text-2xl">Add SlideyUI to your Tailwind config</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slide-accent text-white text-2xl font-bold">
              3
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">Build</h3>
              <p className="text-2xl">Start creating amazing presentations!</p>
            </div>
          </div>
        </div>
      </ContentSlide>

      {/* Call to Action */}
      <TitleSlide
        title="Ready to Transform Your Presentations?"
        subtitle="Visit slideyui.dev to get started"
      >
        <div className="mt-12 flex gap-6 justify-center">
          <button className="px-12 py-4 bg-slide-accent text-white text-2xl font-bold rounded-lg hover:opacity-90 transition-opacity">
            Get Started
          </button>
          <button className="px-12 py-4 border-2 border-slide-accent text-slide-accent text-2xl font-bold rounded-lg hover:bg-slide-accent hover:text-white transition-colors">
            View Docs
          </button>
        </div>
      </TitleSlide>

      {/* Thank You */}
      <TitleSlide title="Thank You!" subtitle="Questions?" />
    </Deck>
  );
}

export default App;
