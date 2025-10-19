<script lang="ts">
  import {
    ContentCard,
    Footer,
    FooterSection,
    FooterLink,
    FooterSocial,
    FooterNewsletter,
    FooterLegal
  } from '@slideyui/svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';

  const basicFooterCode = `<Footer>
  <p>© 2024 Company Name. All rights reserved.</p>
</Footer>`;

  const gridFooterCode = `<Footer layout="grid-3">
  <FooterSection title="Products">
    <FooterLink href="/product1">Product 1</FooterLink>
    <FooterLink href="/product2">Product 2</FooterLink>
    <FooterLink href="/product3">Product 3</FooterLink>
  </FooterSection>

  <FooterSection title="Company">
    <FooterLink href="/about">About Us</FooterLink>
    <FooterLink href="/careers">Careers</FooterLink>
    <FooterLink href="/contact">Contact</FooterLink>
  </FooterSection>

  <FooterSection title="Support">
    <FooterLink href="/help">Help Center</FooterLink>
    <FooterLink href="/docs">Documentation</FooterLink>
    <FooterLink href="/faq">FAQ</FooterLink>
  </FooterSection>
</Footer>`;

  const centeredFooterCode = `<Footer layout="center">
  <FooterSection>
    <p class="font-semibold text-lg">Company Name</p>
    <p>Building the future of presentations</p>

    <FooterSocial
      links={[
        { icon: '𝕏', href: 'https://twitter.com', label: 'Twitter' },
        { icon: 'in', href: 'https://linkedin.com', label: 'LinkedIn' },
        { icon: 'f', href: 'https://facebook.com', label: 'Facebook' }
      ]}
    />

    <FooterLegal>
      © 2024 Company Name. All rights reserved.
    </FooterLegal>
  </FooterSection>
</Footer>`;

  const newsletterFooterCode = `<Footer layout="grid-2">
  <FooterSection title="Stay Updated">
    <p>Subscribe to our newsletter for the latest updates.</p>
    <FooterNewsletter
      onSubmit={(email) => console.log(email)}
      placeholder="Your email"
      buttonText="Subscribe"
    />
  </FooterSection>

  <FooterSection title="Quick Links">
    <FooterLink href="/blog">Blog</FooterLink>
    <FooterLink href="/resources">Resources</FooterLink>
    <FooterLink href="/privacy">Privacy Policy</FooterLink>
  </FooterSection>
</Footer>`;

  const backgroundImageCode = `<Footer
  layout="grid-3"
  backgroundImage="https://images.unsplash.com/photo-..."
>
  <FooterSection title="Products">
    <FooterLink href="#">Features</FooterLink>
    <FooterLink href="#">Pricing</FooterLink>
    <FooterLink href="#">Enterprise</FooterLink>
  </FooterSection>

  <FooterSection title="Resources">
    <FooterLink href="#">Documentation</FooterLink>
    <FooterLink href="#">Guides</FooterLink>
    <FooterLink href="#">API Reference</FooterLink>
  </FooterSection>

  <FooterSection title="Company">
    <FooterLink href="#">About</FooterLink>
    <FooterLink href="#">Blog</FooterLink>
    <FooterLink href="#">Careers</FooterLink>
  </FooterSection>

  <FooterLegal>
    © 2024 Your Company. All rights reserved.
  </FooterLegal>
</Footer>`;

  const cardWithFooterCode = `<ContentCard title="Premium Plan" aspectRatio="16/9">
  <div class="space-y-4">
    <p class="text-3xl font-bold">$99/month</p>
    <ul class="space-y-2">
      <li>✓ Unlimited presentations</li>
      <li>✓ Advanced analytics</li>
      <li>✓ Priority support</li>
      <li>✓ Custom branding</li>
    </ul>
  </div>

  <Footer layout="center" slot="footer">
    <button class="btn btn-primary btn-lg">Get Started</button>
    <FooterLegal>
      <a href="/terms" class="link">Terms</a> · <a href="/privacy" class="link">Privacy</a>
    </FooterLegal>
  </Footer>
</ContentCard>`;

  const socialIcons = [
    { icon: '𝕏', href: 'https://twitter.com', label: 'Twitter' },
    { icon: 'in', href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: 'f', href: 'https://facebook.com', label: 'Facebook' },
    { icon: 'yt', href: 'https://youtube.com', label: 'YouTube' }
  ];

  function handleNewsletterSubmit(email: string) {
    console.log('Newsletter signup:', email);
    alert(`Subscribed: ${email}`);
  }
</script>

<svelte:head>
  <title>Footer - SlideyUI Components</title>
</svelte:head>

<div class="container mx-auto px-6 py-12">
  <header class="mb-12">
    <h1 class="text-5xl font-bold mb-4">Footer</h1>
    <p class="text-xl text-base-content/70 max-w-3xl">
      Presentation-optimized footer components that can be embedded inside cards and slides. Includes support for grid layouts, social icons, newsletters, and background images.
    </p>
  </header>

  <!-- Installation -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Installation</h2>
    <p class="text-lg text-base-content/70 mb-4">
      The Footer component family is included in both packages.
    </p>

    <CodeBlock code={`import {
  Footer,
  FooterSection,
  FooterLink,
  FooterSocial,
  FooterNewsletter,
  FooterLegal
} from '@slideyui/svelte';`} lang="typescript" />
  </section>

  <!-- Basic Footer -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Basic Footer</h2>
    <p class="text-lg text-base-content/70 mb-8">
      A simple footer with text content.
    </p>

    <div class="mb-4">
      <ContentCard title="Simple Example" aspectRatio="16/9">
        <p class="text-lg">Card content goes here</p>

        <Footer slot="footer">
          <p>© 2024 Company Name. All rights reserved.</p>
        </Footer>
      </ContentCard>
    </div>

    <CodeBlock code={basicFooterCode} lang="svelte" />
  </section>

  <!-- Grid Layout Footer -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Grid Layout Footer</h2>
    <p class="text-lg text-base-content/70 mb-8">
      Use grid layouts to organize footer content into columns.
    </p>

    <div class="space-y-8">
      <!-- 3 Column Grid -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">3-Column Grid</h3>

        <div class="mb-4">
          <ContentCard title="Product Overview" aspectRatio="16/9">
            <p class="text-lg mb-4">Explore our comprehensive product lineup</p>
            <div class="grid grid-cols-3 gap-4">
              <div class="bg-base-200 p-4 rounded">Feature A</div>
              <div class="bg-base-200 p-4 rounded">Feature B</div>
              <div class="bg-base-200 p-4 rounded">Feature C</div>
            </div>

            <Footer layout="grid-3" slot="footer">
              <FooterSection title="Products">
                <FooterLink href="#">Product 1</FooterLink>
                <FooterLink href="#">Product 2</FooterLink>
                <FooterLink href="#">Product 3</FooterLink>
              </FooterSection>

              <FooterSection title="Company">
                <FooterLink href="#">About Us</FooterLink>
                <FooterLink href="#">Careers</FooterLink>
                <FooterLink href="#">Contact</FooterLink>
              </FooterSection>

              <FooterSection title="Support">
                <FooterLink href="#">Help Center</FooterLink>
                <FooterLink href="#">Documentation</FooterLink>
                <FooterLink href="#">FAQ</FooterLink>
              </FooterSection>
            </Footer>
          </ContentCard>
        </div>

        <CodeBlock code={gridFooterCode} lang="svelte" />
      </div>

      <!-- 4 Column Grid -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">4-Column Grid</h3>

        <div class="mb-4">
          <ContentCard title="Resource Center" aspectRatio="16/9">
            <p class="text-lg">Access all our resources in one place</p>

            <Footer layout="grid-4" slot="footer">
              <FooterSection title="Learn">
                <FooterLink href="#">Tutorials</FooterLink>
                <FooterLink href="#">Guides</FooterLink>
                <FooterLink href="#">Webinars</FooterLink>
              </FooterSection>

              <FooterSection title="Build">
                <FooterLink href="#">API Docs</FooterLink>
                <FooterLink href="#">SDKs</FooterLink>
                <FooterLink href="#">Tools</FooterLink>
              </FooterSection>

              <FooterSection title="Connect">
                <FooterLink href="#">Community</FooterLink>
                <FooterLink href="#">Forum</FooterLink>
                <FooterLink href="#">Discord</FooterLink>
              </FooterSection>

              <FooterSection title="Legal">
                <FooterLink href="#">Terms</FooterLink>
                <FooterLink href="#">Privacy</FooterLink>
                <FooterLink href="#">Security</FooterLink>
              </FooterSection>
            </Footer>
          </ContentCard>
        </div>

        <CodeBlock code={`<Footer layout="grid-4">
  <FooterSection title="Learn">...</FooterSection>
  <FooterSection title="Build">...</FooterSection>
  <FooterSection title="Connect">...</FooterSection>
  <FooterSection title="Legal">...</FooterSection>
</Footer>`} lang="svelte" />
      </div>
    </div>
  </section>

  <!-- Centered Footer -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Centered Footer</h2>
    <p class="text-lg text-base-content/70 mb-8">
      Center-aligned footer perfect for social links and branding.
    </p>

    <div class="mb-4">
      <ContentCard title="About Us" aspectRatio="16/9">
        <p class="text-lg text-center">
          We're building the future of AI-powered presentations
        </p>

        <Footer layout="center" slot="footer">
          <FooterSection>
            <p class="font-semibold text-lg">SlideyUI</p>
            <p>Making presentations beautiful</p>

            <FooterSocial links={socialIcons} />

            <FooterLegal>
              © 2024 SlideyUI. All rights reserved.
            </FooterLegal>
          </FooterSection>
        </Footer>
      </ContentCard>
    </div>

    <CodeBlock code={centeredFooterCode} lang="svelte" />
  </section>

  <!-- Newsletter Footer -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Newsletter Footer</h2>
    <p class="text-lg text-base-content/70 mb-8">
      Include newsletter signup forms in your footers.
    </p>

    <div class="mb-4">
      <ContentCard title="Join Our Community" aspectRatio="16/9">
        <p class="text-lg">
          Get exclusive updates, tips, and resources delivered to your inbox
        </p>

        <Footer layout="grid-2" slot="footer">
          <FooterSection title="Stay Updated">
            <p class="mb-3">Subscribe to our newsletter for the latest updates.</p>
            <FooterNewsletter
              onSubmit={handleNewsletterSubmit}
              placeholder="Your email"
              buttonText="Subscribe"
            />
          </FooterSection>

          <FooterSection title="Quick Links">
            <FooterLink href="#">Blog</FooterLink>
            <FooterLink href="#">Resources</FooterLink>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Terms of Service</FooterLink>
          </FooterSection>
        </Footer>
      </ContentCard>
    </div>

    <CodeBlock code={newsletterFooterCode} lang="svelte" />
  </section>

  <!-- Footer with Background Image -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Footer with Background Image</h2>
    <p class="text-lg text-base-content/70 mb-8">
      Add visual impact with background images. Text is automatically styled for readability over images.
    </p>

    <div class="mb-4">
      <ContentCard title="Enterprise Solutions" aspectRatio="16/9" variant="featured">
        <div class="text-lg space-y-4">
          <p>Scalable solutions for organizations of any size</p>
          <ul class="space-y-2">
            <li>✓ Custom integrations</li>
            <li>✓ Dedicated support</li>
            <li>✓ Advanced security</li>
            <li>✓ SLA guarantees</li>
          </ul>
        </div>

        <Footer
          layout="grid-3"
          backgroundImage="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&auto=format&fit=crop"
          slot="footer"
        >
          <FooterSection title="Products">
            <FooterLink href="#">Features</FooterLink>
            <FooterLink href="#">Pricing</FooterLink>
            <FooterLink href="#">Enterprise</FooterLink>
          </FooterSection>

          <FooterSection title="Resources">
            <FooterLink href="#">Documentation</FooterLink>
            <FooterLink href="#">Guides</FooterLink>
            <FooterLink href="#">API Reference</FooterLink>
          </FooterSection>

          <FooterSection title="Company">
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Blog</FooterLink>
            <FooterLink href="#">Careers</FooterLink>
          </FooterSection>

          <FooterLegal>
            © 2024 Your Company. All rights reserved.
          </FooterLegal>
        </Footer>
      </ContentCard>
    </div>

    <CodeBlock code={backgroundImageCode} lang="svelte" />
  </section>

  <!-- Social Footer -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Footer with Social Icons</h2>
    <p class="text-lg text-base-content/70 mb-8">
      Add social media links with the FooterSocial component.
    </p>

    <div class="mb-4">
      <ContentCard title="Connect With Us" aspectRatio="16/9">
        <p class="text-lg">Join our community across all platforms</p>

        <Footer layout="center" slot="footer">
          <FooterSection>
            <p class="font-semibold">Follow us on social media</p>

            <FooterSocial links={socialIcons} />

            <div class="flex gap-4 text-sm">
              <FooterLink href="#">Privacy</FooterLink>
              <FooterLink href="#">Terms</FooterLink>
              <FooterLink href="#">Cookies</FooterLink>
            </div>

            <FooterLegal>
              © 2024 Company Name. Built with ❤️
            </FooterLegal>
          </FooterSection>
        </Footer>
      </ContentCard>
    </div>

    <CodeBlock code={`<FooterSocial
  links={[
    { icon: '𝕏', href: 'https://twitter.com', label: 'Twitter' },
    { icon: 'in', href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: 'f', href: 'https://facebook.com', label: 'Facebook' },
    { icon: 'yt', href: 'https://youtube.com', label: 'YouTube' }
  ]}
/>`} lang="svelte" />
  </section>

  <!-- Card with Footer -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Cards with Footer Actions</h2>
    <p class="text-lg text-base-content/70 mb-8">
      Footers are perfect for call-to-action buttons and important card actions.
    </p>

    <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Pricing Card -->
      <ContentCard title="Premium Plan" aspectRatio="4/3">
        <div class="space-y-4">
          <p class="text-3xl font-bold">$99/month</p>
          <ul class="space-y-2">
            <li>✓ Unlimited presentations</li>
            <li>✓ Advanced analytics</li>
            <li>✓ Priority support</li>
            <li>✓ Custom branding</li>
          </ul>
        </div>

        <Footer layout="center" slot="footer">
          <button class="btn btn-primary btn-lg w-full">Get Started</button>
          <FooterLegal>
            <a href="/terms" class="link">Terms</a> · <a href="/privacy" class="link">Privacy</a>
          </FooterLegal>
        </Footer>
      </ContentCard>

      <!-- Contact Card -->
      <ContentCard title="Contact Sales" aspectRatio="4/3">
        <div class="space-y-4">
          <p class="text-lg">Get a custom quote for your team</p>
          <ul class="space-y-2">
            <li>✓ Volume discounts</li>
            <li>✓ Dedicated account manager</li>
            <li>✓ Custom contracts</li>
            <li>✓ Flexible billing</li>
          </ul>
        </div>

        <Footer slot="footer">
          <FooterNewsletter
            onSubmit={handleNewsletterSubmit}
            placeholder="Work email"
            buttonText="Contact Us"
          />
          <FooterLegal>
            We'll get back to you within 24 hours
          </FooterLegal>
        </Footer>
      </ContentCard>
    </div>

    <CodeBlock code={cardWithFooterCode} lang="svelte" />
  </section>

  <!-- API Reference -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">API Reference</h2>

    <div class="space-y-8">
      <!-- Footer Props -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">Footer Props</h3>
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code class="text-sm">layout</code></td>
                <td><code class="text-sm">'default' | 'grid-2' | 'grid-3' | 'grid-4' | 'center'</code></td>
                <td><code class="text-sm">'default'</code></td>
                <td>Footer layout style</td>
              </tr>
              <tr>
                <td><code class="text-sm">backgroundImage</code></td>
                <td><code class="text-sm">string</code></td>
                <td><code class="text-sm">undefined</code></td>
                <td>Background image URL</td>
              </tr>
              <tr>
                <td><code class="text-sm">class</code></td>
                <td><code class="text-sm">string</code></td>
                <td><code class="text-sm">undefined</code></td>
                <td>Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- FooterSection Props -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">FooterSection Props</h3>
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code class="text-sm">title</code></td>
                <td><code class="text-sm">string</code></td>
                <td><code class="text-sm">undefined</code></td>
                <td>Section title</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- FooterNewsletter Props -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">FooterNewsletter Props</h3>
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code class="text-sm">onSubmit</code></td>
                <td><code class="text-sm">(email: string) => void</code></td>
                <td><code class="text-sm">undefined</code></td>
                <td>Callback when form is submitted</td>
              </tr>
              <tr>
                <td><code class="text-sm">placeholder</code></td>
                <td><code class="text-sm">string</code></td>
                <td><code class="text-sm">'Enter your email'</code></td>
                <td>Input placeholder text</td>
              </tr>
              <tr>
                <td><code class="text-sm">buttonText</code></td>
                <td><code class="text-sm">string</code></td>
                <td><code class="text-sm">'Subscribe'</code></td>
                <td>Button text</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>

  <!-- Best Practices -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Best Practices</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="card bg-success/10 border border-success">
        <div class="card-body">
          <h3 class="card-title text-success">Do</h3>
          <ul class="space-y-2">
            <li>Use footers to add context and actions to cards</li>
            <li>Choose appropriate grid layouts for content density</li>
            <li>Use centered layout for social-focused footers</li>
            <li>Add background images for visual impact</li>
            <li>Include newsletter signups for engagement</li>
            <li>Use FooterLegal for copyright and legal text</li>
            <li>Keep footer content concise and scannable</li>
          </ul>
        </div>
      </div>

      <div class="card bg-error/10 border border-error">
        <div class="card-body">
          <h3 class="card-title text-error">Don't</h3>
          <ul class="space-y-2">
            <li>Overcrowd footers with too much content</li>
            <li>Use background images with low contrast</li>
            <li>Forget to test footer layouts on mobile</li>
            <li>Mix multiple layout styles in one footer</li>
            <li>Use tiny font sizes that are hard to read</li>
            <li>Ignore the footer slot when designing cards</li>
            <li>Make footers taller than the main card content</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Next Steps -->
  <section>
    <h2 class="text-3xl font-bold mb-6">Related</h2>
    <div class="flex gap-4 flex-wrap">
      <a href="/docs/components/cards" class="btn btn-outline">
        Cards
      </a>
      <a href="/docs/components" class="btn btn-outline">
        All Components
      </a>
      <a href="/docs/layouts" class="btn btn-outline">
        Layouts
      </a>
      <a href="/docs/examples" class="btn btn-primary">
        View Examples
      </a>
    </div>
  </section>
</div>
