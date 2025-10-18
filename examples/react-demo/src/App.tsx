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
        <p className="slide-body mb-12 text-center text-3xl opacity-90">
          A presentation-first component library built on Tailwind CSS
        </p>

        <div className="grid grid-cols-2 gap-8 mt-12">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-2xl shadow-xl">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-3xl font-bold mb-3">Projection-Optimized</h3>
            <p className="text-2xl opacity-90">24px minimum font size ensures readability from any distance</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-2xl shadow-xl">
            <div className="text-6xl mb-4">⚡</div>
            <h3 className="text-3xl font-bold mb-3">Developer-Friendly</h3>
            <p className="text-2xl opacity-90">React components with full Tailwind CSS integration</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-8 rounded-2xl shadow-xl">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-3xl font-bold mb-3">Theme System</h3>
            <p className="text-2xl opacity-90">5 professional themes ready to use out of the box</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-8 rounded-2xl shadow-xl">
            <div className="text-6xl mb-4">📤</div>
            <h3 className="text-3xl font-bold mb-3">Export-Ready</h3>
            <p className="text-2xl opacity-90">Works everywhere: PDF, PowerPoint, and web</p>
          </div>
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
        <div className="space-y-8">
          <div className="flex items-center gap-8 bg-white/5 p-8 rounded-2xl backdrop-blur">
            <div className="flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white text-5xl font-black shadow-lg">
              5
            </div>
            <div className="flex-1">
              <h3 className="text-4xl font-bold mb-3">Professional Themes</h3>
              <p className="text-2xl opacity-80">Corporate, Pitch Deck, Academic, Workshop, Startup</p>
            </div>
          </div>

          <div className="flex items-center gap-8 bg-white/5 p-8 rounded-2xl backdrop-blur">
            <div className="flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-green-500 to-teal-600 text-white text-4xl font-black shadow-lg">
              13+
            </div>
            <div className="flex-1">
              <h3 className="text-4xl font-bold mb-3">Specialized Components</h3>
              <p className="text-2xl opacity-80">Callouts, Quotes, Timelines, Code Blocks, Polls & more</p>
            </div>
          </div>

          <div className="flex items-center gap-8 bg-white/5 p-8 rounded-2xl backdrop-blur">
            <div className="flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-600 text-white text-5xl font-black shadow-lg">
              ∞
            </div>
            <div className="flex-1">
              <h3 className="text-4xl font-bold mb-3">Customization Options</h3>
              <p className="text-2xl opacity-80">Full Tailwind CSS flexibility for unlimited possibilities</p>
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
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-10 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform">
              <div className="text-7xl font-black mb-4">10k+</div>
              <p className="text-3xl font-semibold">Downloads</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-700 text-white p-10 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform">
              <div className="text-7xl font-black mb-4">98%</div>
              <p className="text-3xl font-semibold">Satisfaction</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white p-10 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform">
              <div className="text-7xl font-black mb-4">500+</div>
              <p className="text-3xl font-semibold">Companies</p>
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
        <div className="space-y-8">
          <div className="flex items-center gap-8 group">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white text-4xl font-black shadow-lg group-hover:scale-110 transition-transform">
              1
            </div>
            <div className="flex-1 bg-white/5 p-6 rounded-xl backdrop-blur">
              <h3 className="text-4xl font-bold mb-3">Install</h3>
              <CodeBlock language="bash">npm install slideyui @slideyui/react</CodeBlock>
            </div>
          </div>

          <div className="flex items-center gap-8 group">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white text-4xl font-black shadow-lg group-hover:scale-110 transition-transform">
              2
            </div>
            <div className="flex-1 bg-white/5 p-6 rounded-xl backdrop-blur">
              <h3 className="text-4xl font-bold mb-3">Configure</h3>
              <p className="text-2xl opacity-90">Add SlideyUI to your Tailwind config</p>
            </div>
          </div>

          <div className="flex items-center gap-8 group">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white text-4xl font-black shadow-lg group-hover:scale-110 transition-transform">
              3
            </div>
            <div className="flex-1 bg-white/5 p-6 rounded-xl backdrop-blur">
              <h3 className="text-4xl font-bold mb-3">Build</h3>
              <p className="text-2xl opacity-90">Start creating amazing presentations! 🚀</p>
            </div>
          </div>
        </div>
      </ContentSlide>

      {/* Call to Action */}
      <TitleSlide
        title="Ready to Transform Your Presentations?"
        subtitle="Visit slideyui.dev to get started"
      >
        <div className="mt-16 flex gap-6 justify-center">
          <button className="px-16 py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-3xl font-black rounded-2xl shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transform transition-all">
            Get Started →
          </button>
          <button className="px-16 py-6 border-4 border-blue-600 text-blue-600 text-3xl font-black rounded-2xl hover:bg-blue-600 hover:text-white hover:scale-105 transform transition-all">
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
