<script lang="ts">
  import { CardContainer } from '@slideyui/svelte';
</script>

<div class="prose max-w-none">
  <h1>Product Overview</h1>
  <p>
    This layout demonstrates a comprehensive product showcase pattern with a prominent title and a
    grid of product cards. Each card features an image, product name, and description. This pattern
    is ideal for product catalogs, feature overviews, service offerings, or any scenario requiring
    multiple items to be presented in an organized, scannable format.
  </p>

  <h2>Live Demo</h2>
  <p>
    The slide below showcases a 2×3 grid layout perfect for presenting multiple products or
    features. The consistent card structure makes it easy for viewers to compare and understand
    different offerings at a glance.
  </p>

  <div class="not-prose mb-12">
    <CardContainer aspectRatio="16/9" bordered={true} autoScale={true}>
      <div class="h-full p-8 lg:p-12 bg-base-100">
        <!-- Title -->
        <h2
          class="font-bold text-primary mb-6 lg:mb-8"
          style="font-size: clamp(2rem, 4vw, 3rem);"
        >
          Product Overview
        </h2>

        <!-- Product Grid: 2 rows × 3 columns -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <!-- Card 1: Internet of Things -->
          <div class="bg-base-200 rounded-lg p-4 lg:p-6 flex flex-col">
            <div class="mb-3 lg:mb-4">
              <img
                src="https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&h=300&fit=crop"
                alt="IoT devices and sensors"
                class="w-full h-32 lg:h-40 object-cover rounded-lg"
              />
            </div>
            <h3
              class="font-bold text-primary mb-2"
              style="font-size: clamp(1rem, 1.5vw, 1.25rem);"
            >
              Internet of Things
            </h3>
            <p
              class="text-base-content opacity-80 leading-relaxed"
              style="font-size: clamp(0.75rem, 1vw, 0.875rem);"
            >
              Detail and explain each product. Our examination of community and market issues
              increases with additional products/services.
            </p>
          </div>

          <!-- Card 2: Person/Team Image -->
          <div class="bg-base-200 rounded-lg p-4 lg:p-6 flex flex-col">
            <div class="mb-3 lg:mb-4">
              <img
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=300&fit=crop"
                alt="Professional team member"
                class="w-full h-32 lg:h-40 object-cover rounded-lg"
              />
            </div>
            <h3
              class="font-bold text-primary mb-2"
              style="font-size: clamp(1rem, 1.5vw, 1.25rem);"
            >
              Analytics Dashboard
            </h3>
            <p
              class="text-base-content opacity-80 leading-relaxed"
              style="font-size: clamp(0.75rem, 1vw, 0.875rem);"
            >
              Our alternate product category is available. Our products must work together to solve
              social and economic issues.
            </p>
          </div>

          <!-- Card 3: Mobile App Suite -->
          <div class="bg-base-200 rounded-lg p-4 lg:p-6 flex flex-col">
            <div class="mb-3 lg:mb-4">
              <img
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop"
                alt="Modern office corridor"
                class="w-full h-32 lg:h-40 object-cover rounded-lg"
              />
            </div>
            <h3
              class="font-bold text-primary mb-2"
              style="font-size: clamp(1rem, 1.5vw, 1.25rem);"
            >
              Mobile App Suite
            </h3>
            <p
              class="text-base-content opacity-80 leading-relaxed"
              style="font-size: clamp(0.75rem, 1vw, 0.875rem);"
            >
              Our alternate product category is available. Our products must work together to solve
              social and economic issues.
            </p>
          </div>

          <!-- Card 4: Lower Left -->
          <div class="bg-base-200 rounded-lg p-4 lg:p-6 flex flex-col">
            <div class="mb-3 lg:mb-4">
              <img
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop"
                alt="Person working on laptop"
                class="w-full h-32 lg:h-40 object-cover rounded-lg"
              />
            </div>
            <h3
              class="font-bold text-primary mb-2"
              style="font-size: clamp(1rem, 1.5vw, 1.25rem);"
            >
              Analytics Dashboard
            </h3>
            <p
              class="text-base-content opacity-80 leading-relaxed"
              style="font-size: clamp(0.75rem, 1vw, 0.875rem);"
            >
              Our alternate product category is available. Our products must work together to solve
              social and economic issues.
            </p>
          </div>

          <!-- Card 5: Lower Middle -->
          <div class="bg-base-200 rounded-lg p-4 lg:p-6 flex flex-col">
            <div class="mb-3 lg:mb-4">
              <img
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop"
                alt="Mobile phone showing apps"
                class="w-full h-32 lg:h-40 object-cover rounded-lg"
              />
            </div>
            <h3
              class="font-bold text-primary mb-2"
              style="font-size: clamp(1rem, 1.5vw, 1.25rem);"
            >
              Smart Home Platform
            </h3>
            <p
              class="text-base-content opacity-80 leading-relaxed"
              style="font-size: clamp(0.75rem, 1vw, 0.875rem);"
            >
              Our alternate product category is available. Our products must work together to solve
              social and economic issues.
            </p>
          </div>

          <!-- Card 6: Lower Right -->
          <div class="bg-base-200 rounded-lg p-4 lg:p-6 flex flex-col">
            <div class="mb-3 lg:mb-4">
              <img
                src="https://images.unsplash.com/photo-1497215842964-222b430dc094?w=400&h=300&fit=crop"
                alt="Modern office environment"
                class="w-full h-32 lg:h-40 object-cover rounded-lg"
              />
            </div>
            <h3
              class="font-bold text-primary mb-2"
              style="font-size: clamp(1rem, 1.5vw, 1.25rem);"
            >
              Smart Home Platform
            </h3>
            <p
              class="text-base-content opacity-80 leading-relaxed"
              style="font-size: clamp(0.75rem, 1vw, 0.875rem);"
            >
              Our alternate product category is available. Our products must work together to solve
              social and economic issues.
            </p>
          </div>
        </div>
      </div>
    </CardContainer>
  </div>

  <h2>Features</h2>
  <ul>
    <li><strong>Responsive Grid:</strong> 1 column mobile, 2 columns tablet, 3 columns desktop</li>
    <li><strong>Auto-Scaling Typography:</strong> Title, headings, and body text use fluid clamp()</li>
    <li>
      <strong>Consistent Card Structure:</strong> Image → Title → Description pattern for easy scanning
    </li>
    <li><strong>Theme-Aware:</strong> Uses base-100, base-200, base-content for dark mode support</li>
    <li>
      <strong>Image Optimization:</strong> Fixed height images with object-cover for consistent appearance
    </li>
    <li><strong>Primary Color Accent:</strong> Product titles use theme's primary color</li>
    <li><strong>Flexible Layout:</strong> Easy to add/remove products or change grid columns</li>
  </ul>

  <h2>Use Cases</h2>
  <p>This layout pattern is perfect for:</p>
  <ul>
    <li><strong>Product Catalogs:</strong> Showcase multiple products or SKUs</li>
    <li><strong>Feature Overviews:</strong> Highlight key features of a platform or service</li>
    <li><strong>Service Offerings:</strong> Present different service tiers or packages</li>
    <li><strong>Team Introductions:</strong> Show team members with photos and bios</li>
    <li><strong>Portfolio Displays:</strong> Present case studies or project examples</li>
    <li><strong>Module Navigation:</strong> Overview of different sections or modules</li>
    <li><strong>Comparison Grids:</strong> Compare multiple options side-by-side</li>
  </ul>

  <h2>Code Example (Svelte)</h2>
  <pre><code>{`<`}{`script lang="ts">`}{`
  import { CardContainer } from '@slideyui/svelte';
`}{`</script>`}{`

<CardContainer aspectRatio="16/9" bordered={true} autoScale={true}>
  <div class="h-full p-12 bg-base-100">
    <h2 class="font-bold text-primary mb-8"
        style="font-size: clamp(2rem, 4vw, 3rem);">
      Product Overview
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Product Card -->
      <div class="bg-base-200 rounded-lg p-6 flex flex-col">
        <div class="mb-4">
          <img
            src="/product-image.jpg"
            alt="Product name"
            class="w-full h-40 object-cover rounded-lg"
          />
        </div>
        <h3 class="font-bold text-primary mb-2"
            style="font-size: clamp(1rem, 1.5vw, 1.25rem);">
          Product Name
        </h3>
        <p class="text-base-content opacity-80 leading-relaxed"
           style="font-size: clamp(0.75rem, 1vw, 0.875rem);">
          Product description goes here. Explain the key features
          and benefits.
        </p>
      </div>

      <!-- Repeat for more products -->
    </div>
  </div>
</CardContainer>`}</code></pre>

  <h2>React Implementation</h2>
  <pre><code>{`import { CardContainer } from '@slideyui/react';

export default function ProductOverview() {
  const products = [
    {
      id: 1,
      name: 'Internet of Things',
      image: '/iot-image.jpg',
      description: 'Detail and explain each product...'
    },
    // ... more products
  ];

  return (
    <CardContainer aspectRatio="16/9" bordered autoScale>
      <div className="h-full p-12 bg-base-100">
        <h2 className="font-bold text-primary mb-8"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          Product Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id}
                 className="bg-base-200 rounded-lg p-6 flex flex-col">
              <div className="mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
              <h3 className="font-bold text-primary mb-2"
                  style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}>
                {product.name}
              </h3>
              <p className="text-base-content opacity-80 leading-relaxed"
                 style={{ fontSize: 'clamp(0.75rem, 1vw, 0.875rem)' }}>
                {product.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </CardContainer>
  );
}`}</code></pre>

  <h2>Customization Tips</h2>
  <ul>
    <li>
      <strong>Grid columns:</strong> Adjust <code>lg:grid-cols-3</code> to <code>lg:grid-cols-4</code>
      for 4 columns or <code>lg:grid-cols-2</code> for 2 columns
    </li>
    <li>
      <strong>Image height:</strong> Modify <code>h-40</code> to <code>h-48</code> or <code
        >h-32</code
      > for different image sizes
    </li>
    <li>
      <strong>Card padding:</strong> Change <code>p-6</code> to <code>p-4</code> for more compact
      cards or <code>p-8</code> for more spacious
    </li>
    <li>
      <strong>Gap spacing:</strong> Adjust <code>gap-6</code> to control spacing between cards
    </li>
    <li>
      <strong>Title color:</strong> Replace <code>text-primary</code> with <code
        >text-secondary</code
      > or <code>text-accent</code> for different color schemes
    </li>
    <li>
      <strong>Add icons:</strong> Include icon/emoji before titles: <code
        >&lt;span class="text-2xl mr-2"&gt;🚀&lt;/span&gt;</code
      >
    </li>
  </ul>

  <h2>Typography Scaling</h2>
  <p>The layout uses responsive typography that auto-scales with the container:</p>
  <ul>
    <li>
      <strong>Main Title:</strong> <code>clamp(2rem, 4vw, 3rem)</code> = 32-48px range
    </li>
    <li>
      <strong>Product Titles:</strong> <code>clamp(1rem, 1.5vw, 1.25rem)</code> = 16-20px range
    </li>
    <li>
      <strong>Descriptions:</strong> <code>clamp(0.75rem, 1vw, 0.875rem)</code> = 12-14px range
    </li>
  </ul>
  <p>
    When combined with <code>autoScale={true}</code>, the entire grid scales proportionally based on
    container size.
  </p>

  <h2>Image Guidelines</h2>
  <ul>
    <li><strong>Aspect Ratio:</strong> Landscape images work best (4:3 or 16:9)</li>
    <li><strong>Resolution:</strong> Minimum 400x300px for crisp display</li>
    <li>
      <strong>Format:</strong> WebP for best compression, fallback to JPEG or PNG
    </li>
    <li>
      <strong>Consistency:</strong> Use similar image styles (all photos, all illustrations, etc.)
    </li>
    <li>
      <strong>Object-cover:</strong> Ensures images fill space without distortion (crops if needed)
    </li>
    <li><strong>Alt text:</strong> Always include descriptive alt text for accessibility</li>
  </ul>

  <h2>Responsive Behavior</h2>
  <p>The grid adapts seamlessly across device sizes:</p>
  <ul>
    <li><strong>Mobile (&lt;768px):</strong> 1 column - cards stack vertically</li>
    <li><strong>Tablet (768-1023px):</strong> 2 columns - side-by-side pairs</li>
    <li><strong>Desktop (1024px+):</strong> 3 columns - full grid as shown</li>
  </ul>
  <p>
    All text uses fluid clamp() sizing to remain readable at all viewport sizes, automatically
    scaling smaller on mobile and larger on desktop displays.
  </p>

  <div class="alert alert-info mt-8">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="stroke-current shrink-0 w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
    <div>
      <strong>Pro Tip:</strong> Keep product descriptions concise (2-3 lines max) for visual balance.
      If you need more detail, consider linking to a detailed slide for each product.
    </div>
  </div>
</div>
