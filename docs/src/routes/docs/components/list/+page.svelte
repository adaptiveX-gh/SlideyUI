<script lang="ts">
  import { CardContainer, List, ListItem } from '@slideyui/svelte';
</script>

<div class="prose max-w-none">
  <h1>List Component</h1>
  <p>
    A presentation-optimized vertical list layout based on DaisyUI's List component. Perfect for
    displaying structured information, features, steps, or any content that needs a clean,
    organized appearance on slides.
  </p>

  <h2>Basic Usage</h2>
  <p>
    The List component provides a simple way to display items with optional icons, titles, and
    descriptions.
  </p>

  <div class="not-prose mb-8">
    <CardContainer aspectRatio="16/9" bordered={true}>
      <div class="p-12">
        <h2 class="text-3xl font-bold mb-6" style="color: var(--slidey-color-primary)">
          Key Features
        </h2>
        <List>
          <ListItem
            icon="📊"
            title="Data Analytics"
            description="Real-time insights and reporting"
          />
          <ListItem
            icon="🔒"
            title="Enterprise Security"
            description="Bank-level encryption and compliance"
          />
          <ListItem
            icon="⚡"
            title="High Performance"
            description="Optimized for speed and scalability"
          />
          <ListItem
            icon="🎨"
            title="Customizable Design"
            description="Theme-aware and fully customizable"
          />
        </List>
      </div>
    </CardContainer>
  </div>

  <h2>Numbered List</h2>
  <p>Use the <code>numbered</code> variant to automatically number list items.</p>

  <div class="not-prose mb-8">
    <CardContainer aspectRatio="16/9" bordered={true}>
      <div class="p-12">
        <h2 class="text-3xl font-bold mb-6" style="color: var(--slidey-color-primary)">
          Implementation Steps
        </h2>
        <List variant="numbered">
          <ListItem
            title="Setup Environment"
            description="Install dependencies and configure settings"
          />
          <ListItem
            title="Design Architecture"
            description="Plan the system structure and components"
          />
          <ListItem
            title="Build Features"
            description="Develop core functionality and integrations"
          />
          <ListItem title="Test & Deploy" description="Quality assurance and production release" />
        </List>
      </div>
    </CardContainer>
  </div>

  <h2>Bordered List</h2>
  <p>Add a border around the list with the <code>bordered</code> variant.</p>

  <div class="not-prose mb-8">
    <CardContainer aspectRatio="16/9" bordered={true}>
      <div class="p-12">
        <h2 class="text-3xl font-bold mb-6" style="color: var(--slidey-color-primary)">
          Product Comparison
        </h2>
        <List variant="bordered">
          <ListItem icon="✓" title="Basic Plan" description="$10/month - Essential features" />
          <ListItem icon="✓✓" title="Pro Plan" description="$25/month - Advanced features" />
          <ListItem
            icon="⭐"
            title="Enterprise"
            description="Custom pricing - Full suite with support"
          />
        </List>
      </div>
    </CardContainer>
  </div>

  <h2>Compact List</h2>
  <p>Use the <code>compact</code> variant for tighter spacing.</p>

  <div class="not-prose mb-8">
    <CardContainer aspectRatio="16/9" bordered={true}>
      <div class="p-12">
        <h2 class="text-3xl font-bold mb-6" style="color: var(--slidey-color-primary)">
          Quick Facts
        </h2>
        <List variant="compact">
          <ListItem icon="🌍" title="Global Reach" description="Available in 150+ countries" />
          <ListItem icon="👥" title="User Base" description="10M+ active users" />
          <ListItem icon="💼" title="Enterprise Clients" description="500+ Fortune 1000 companies" />
          <ListItem icon="🏆" title="Awards" description="Industry leader 5 years running" />
          <ListItem icon="📈" title="Growth" description="200% year-over-year" />
        </List>
      </div>
    </CardContainer>
  </div>

  <h2>Hoverable List</h2>
  <p>
    The <code>hoverable</code> variant adds interactive hover effects, perfect for clickable items.
  </p>

  <div class="not-prose mb-8">
    <CardContainer aspectRatio="16/9" bordered={true}>
      <div class="p-12">
        <h2 class="text-3xl font-bold mb-6" style="color: var(--slidey-color-primary)">
          Navigation Menu
        </h2>
        <List variant="hoverable">
          <ListItem icon="🏠" title="Dashboard" description="View your overview and stats" />
          <ListItem icon="📁" title="Projects" description="Manage your active projects" />
          <ListItem icon="👤" title="Profile" description="Update your account settings" />
          <ListItem icon="⚙️" title="Settings" description="Configure preferences" />
        </List>
      </div>
    </CardContainer>
  </div>

  <h2>Custom Icon Colors</h2>
  <p>You can customize icon background colors for visual hierarchy.</p>

  <div class="not-prose mb-8">
    <CardContainer aspectRatio="16/9" bordered={true}>
      <div class="p-12">
        <h2 class="text-3xl font-bold mb-6" style="color: var(--slidey-color-primary)">
          Project Status
        </h2>
        <List>
          <ListItem
            icon="✓"
            iconColor="#10b981"
            title="Phase 1: Planning"
            description="Completed on schedule"
          />
          <ListItem
            icon="🔄"
            iconColor="#3b82f6"
            title="Phase 2: Development"
            description="In progress - 75% complete"
          />
          <ListItem
            icon="⏳"
            iconColor="#f59e0b"
            title="Phase 3: Testing"
            description="Scheduled for next month"
          />
          <ListItem
            icon="📋"
            iconColor="#6b7280"
            title="Phase 4: Deployment"
            description="Pending approval"
          />
        </List>
      </div>
    </CardContainer>
  </div>

  <h2>Advanced: Music Player List</h2>
  <p>
    A fancy list example with images and action buttons, similar to a music player interface.
  </p>

  <div class="not-prose mb-8">
    <CardContainer aspectRatio="16/9" bordered={true}>
      <div class="p-12">
        <List header="Most played songs this week" shadow={true}>
          <ListItem
            image="https://img.daisyui.com/images/profile/demo/1@94.webp"
            title="Dio Lupa"
            description="Remaining Reason"
          >
            {#snippet actions()}
              <button
                class="card-list-row-action"
                onclick={() => console.log('Play')}
                aria-label="Play"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M6 3L20 12 6 21 6 3z"></path>
                </svg>
              </button>
              <button
                class="card-list-row-action"
                onclick={() => console.log('Like')}
                aria-label="Like"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                  ></path>
                </svg>
              </button>
            {/snippet}
          </ListItem>
          <ListItem
            image="https://img.daisyui.com/images/profile/demo/4@94.webp"
            title="Ellie Beilish"
            description="Bears of a fever"
          >
            {#snippet actions()}
              <button
                class="card-list-row-action"
                onclick={() => console.log('Play')}
                aria-label="Play"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M6 3L20 12 6 21 6 3z"></path>
                </svg>
              </button>
              <button
                class="card-list-row-action"
                onclick={() => console.log('Like')}
                aria-label="Like"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                  ></path>
                </svg>
              </button>
            {/snippet}
          </ListItem>
          <ListItem
            image="https://img.daisyui.com/images/profile/demo/3@94.webp"
            title="Sabrino Gardener"
            description="Cappuccino"
          >
            {#snippet actions()}
              <button
                class="card-list-row-action"
                onclick={() => console.log('Play')}
                aria-label="Play"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M6 3L20 12 6 21 6 3z"></path>
                </svg>
              </button>
              <button
                class="card-list-row-action"
                onclick={() => console.log('Like')}
                aria-label="Like"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                  ></path>
                </svg>
              </button>
            {/snippet}
          </ListItem>
        </List>
      </div>
    </CardContainer>
  </div>

  <h2>Props</h2>

  <h3>List Props</h3>
  <table class="table-auto w-full">
    <thead>
      <tr>
        <th class="text-left">Prop</th>
        <th class="text-left">Type</th>
        <th class="text-left">Default</th>
        <th class="text-left">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>variant</code></td>
        <td><code>'default' | 'bordered' | 'compact' | 'numbered' | 'hoverable'</code></td>
        <td><code>'default'</code></td>
        <td>List style variant</td>
      </tr>
      <tr>
        <td><code>header</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Optional header text above the list</td>
      </tr>
      <tr>
        <td><code>shadow</code></td>
        <td><code>boolean</code></td>
        <td><code>false</code></td>
        <td>Add shadow to the list</td>
      </tr>
      <tr>
        <td><code>class</code></td>
        <td><code>string</code></td>
        <td><code>''</code></td>
        <td>Additional CSS classes</td>
      </tr>
    </tbody>
  </table>

  <h3>ListItem Props</h3>
  <table class="table-auto w-full">
    <thead>
      <tr>
        <th class="text-left">Prop</th>
        <th class="text-left">Type</th>
        <th class="text-left">Default</th>
        <th class="text-left">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>icon</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Icon or emoji to display</td>
      </tr>
      <tr>
        <td><code>iconColor</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Custom background color for icon badge</td>
      </tr>
      <tr>
        <td><code>image</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Image URL (alternative to icon)</td>
      </tr>
      <tr>
        <td><code>title</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Main heading text</td>
      </tr>
      <tr>
        <td><code>description</code></td>
        <td><code>string</code></td>
        <td><code>undefined</code></td>
        <td>Supporting description text</td>
      </tr>
      <tr>
        <td><code>actions</code></td>
        <td><code>snippet</code></td>
        <td><code>undefined</code></td>
        <td>Action buttons (use snippet in Svelte, ReactNode in React)</td>
      </tr>
      <tr>
        <td><code>class</code></td>
        <td><code>string</code></td>
        <td><code>''</code></td>
        <td>Additional CSS classes</td>
      </tr>
      <tr>
        <td><code>onclick</code></td>
        <td><code>function</code></td>
        <td><code>undefined</code></td>
        <td>Click handler for interactive items</td>
      </tr>
    </tbody>
  </table>

  <h2>Code Example</h2>
  <pre><code>{`<script lang="ts">
  import { List, ListItem } from '@slideyui/svelte';
<\/script>

<List variant="bordered">
  <ListItem
    icon="📊"
    title="Data Analytics"
    description="Real-time insights"
  />
  <ListItem
    icon="🔒"
    title="Security"
    description="Enterprise-grade protection"
  />
</List>`}</code></pre>

  <h2>Best Practices</h2>
  <ul>
    <li>
      <strong>Keep it scannable:</strong> Use concise titles and descriptions for quick comprehension
    </li>
    <li><strong>Consistent icons:</strong> Use similar icon styles throughout the list</li>
    <li>
      <strong>Limit items:</strong> 4-6 items per slide for maximum impact in presentations
    </li>
    <li>
      <strong>Use variants wisely:</strong> Numbered lists for sequential steps, bordered for
      emphasis
    </li>
    <li>
      <strong>Color coding:</strong> Use custom icon colors to indicate status or categories
    </li>
  </ul>

  <h2>Accessibility</h2>
  <p>The List component includes:</p>
  <ul>
    <li>Semantic HTML structure</li>
    <li>Proper contrast ratios for text</li>
    <li>Hover states for interactive elements</li>
    <li>Theme-aware colors that adapt to light/dark modes</li>
  </ul>
</div>
