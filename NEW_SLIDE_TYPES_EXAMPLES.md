# New Slide Types - Usage Examples

This document provides examples for the four new specialized slide types added to the SlideyUI MCP server.

## Table of Contents

1. [Team Slide](#team-slide)
2. [Pricing Slide](#pricing-slide)
3. [Code Slide](#code-slide)
4. [Enhanced Timeline/Roadmap](#enhanced-timeineroadmap)

---

## Team Slide

Display team members with photos, roles, bios, and social links.

### Schema

```typescript
{
  type: 'team',
  title?: string,
  members: TeamMember[],
  layout?: 'grid' | 'carousel' | 'highlight'
}

interface TeamMember {
  name: string,
  role: string,
  photo?: string,
  bio?: string,
  social?: {
    linkedin?: string,
    twitter?: string,
    github?: string
  }
}
```

### Example 1: Grid Layout (Default)

```json
{
  "type": "team",
  "title": "Meet Our Team",
  "layout": "grid",
  "members": [
    {
      "name": "Alice Johnson",
      "role": "CEO & Founder",
      "photo": "https://example.com/photos/alice.jpg",
      "bio": "10+ years in tech leadership",
      "social": {
        "linkedin": "https://linkedin.com/in/alicejohnson",
        "twitter": "https://twitter.com/alicejohnson"
      }
    },
    {
      "name": "Bob Smith",
      "role": "CTO",
      "photo": "https://example.com/photos/bob.jpg",
      "bio": "Former Google engineer, AI specialist",
      "social": {
        "linkedin": "https://linkedin.com/in/bobsmith",
        "github": "https://github.com/bobsmith"
      }
    },
    {
      "name": "Carol Davis",
      "role": "Head of Design",
      "photo": "https://example.com/photos/carol.jpg",
      "bio": "Award-winning product designer",
      "social": {
        "linkedin": "https://linkedin.com/in/caroldavis"
      }
    }
  ]
}
```

### Example 2: Highlight Layout

Use this for featuring a single key person with more visual prominence:

```json
{
  "type": "team",
  "title": "Keynote Speaker",
  "layout": "highlight",
  "members": [
    {
      "name": "Dr. Jane Thompson",
      "role": "Chief Data Scientist",
      "photo": "https://example.com/photos/jane.jpg",
      "bio": "PhD in Machine Learning from MIT. Published 50+ papers on neural networks and computer vision. Former research lead at OpenAI.",
      "social": {
        "linkedin": "https://linkedin.com/in/janethompson",
        "twitter": "https://twitter.com/drjanethompson",
        "github": "https://github.com/janethompson"
      }
    }
  ]
}
```

---

## Pricing Slide

Display pricing plans in a clean, comparison-friendly format.

### Schema

```typescript
{
  type: 'pricing',
  title?: string,
  plans: PricingPlan[],
  highlight?: number  // Index of plan to highlight (0-based)
}

interface PricingPlan {
  name: string,
  price: string | number,
  period?: string,
  features: string[],
  cta?: string,
  recommended?: boolean
}
```

### Example 1: SaaS Pricing

```json
{
  "type": "pricing",
  "title": "Choose Your Plan",
  "highlight": 1,
  "plans": [
    {
      "name": "Starter",
      "price": 29,
      "period": "per month",
      "features": [
        "Up to 10 team members",
        "5GB storage",
        "Basic analytics",
        "Email support"
      ],
      "cta": "Start Free Trial"
    },
    {
      "name": "Professional",
      "price": 99,
      "period": "per month",
      "features": [
        "Up to 50 team members",
        "50GB storage",
        "Advanced analytics",
        "Priority support",
        "Custom integrations"
      ],
      "cta": "Get Started",
      "recommended": true
    },
    {
      "name": "Enterprise",
      "price": "Custom",
      "period": "",
      "features": [
        "Unlimited team members",
        "Unlimited storage",
        "Advanced security",
        "Dedicated account manager",
        "SLA guarantee",
        "Custom contracts"
      ],
      "cta": "Contact Sales"
    }
  ]
}
```

### Example 2: Product Tiers

```json
{
  "type": "pricing",
  "title": "API Pricing",
  "plans": [
    {
      "name": "Free",
      "price": 0,
      "period": "forever",
      "features": [
        "1,000 API calls/month",
        "Community support",
        "Basic documentation"
      ],
      "cta": "Sign Up Free"
    },
    {
      "name": "Pro",
      "price": 49,
      "period": "per month",
      "features": [
        "100,000 API calls/month",
        "Email support",
        "Full documentation",
        "99.9% uptime SLA"
      ],
      "cta": "Upgrade to Pro",
      "recommended": true
    }
  ]
}
```

---

## Code Slide

Display code snippets with syntax highlighting and line numbers.

### Schema

```typescript
{
  type: 'code',
  title?: string,
  language: string,
  code: string,
  highlights?: number[],  // Line numbers to highlight
  filename?: string,
  theme?: 'dark' | 'light' | 'auto'
}
```

### Example 1: TypeScript Code

```json
{
  "type": "code",
  "title": "React Component Example",
  "language": "typescript",
  "filename": "Button.tsx",
  "theme": "dark",
  "highlights": [5, 6, 7],
  "code": "import React from 'react';\n\ninterface ButtonProps {\n  label: string;\n  onClick: () => void;\n  variant?: 'primary' | 'secondary';\n}\n\nexport const Button: React.FC<ButtonProps> = ({\n  label,\n  onClick,\n  variant = 'primary'\n}) => {\n  return (\n    <button\n      className={`btn btn-${variant}`}\n      onClick={onClick}\n    >\n      {label}\n    </button>\n  );\n};"
}
```

### Example 2: Python Code

```json
{
  "type": "code",
  "title": "Data Processing Pipeline",
  "language": "python",
  "filename": "pipeline.py",
  "theme": "dark",
  "highlights": [10, 11, 12],
  "code": "import pandas as pd\nimport numpy as np\nfrom sklearn.preprocessing import StandardScaler\n\ndef process_data(df: pd.DataFrame) -> pd.DataFrame:\n    \"\"\"Clean and normalize dataset\"\"\"\n    # Remove null values\n    df = df.dropna()\n    \n    # Normalize numerical columns\n    scaler = StandardScaler()\n    df[['age', 'income']] = scaler.fit_transform(df[['age', 'income']])\n    \n    return df\n\n# Load and process\ndata = pd.read_csv('input.csv')\nprocessed = process_data(data)\nprocessed.to_csv('output.csv', index=False)"
}
```

### Example 3: SQL Query

```json
{
  "type": "code",
  "title": "Customer Analytics Query",
  "language": "sql",
  "filename": "analytics.sql",
  "theme": "light",
  "code": "SELECT \n  c.customer_id,\n  c.name,\n  COUNT(o.order_id) as total_orders,\n  SUM(o.total_amount) as lifetime_value,\n  AVG(o.total_amount) as avg_order_value\nFROM customers c\nLEFT JOIN orders o ON c.customer_id = o.customer_id\nWHERE o.order_date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)\nGROUP BY c.customer_id, c.name\nHAVING total_orders > 5\nORDER BY lifetime_value DESC\nLIMIT 100;"
}
```

### Supported Languages

The code template supports syntax highlighting for:
- JavaScript, TypeScript, JSX, TSX
- Python
- HTML, CSS, SCSS, XML
- JSON, YAML
- SQL
- Java, C, C++, C#
- Go, Rust, PHP, Ruby
- Swift, Kotlin, Scala
- Bash, Shell, PowerShell
- Markdown

---

## Enhanced Timeline/Roadmap

The timeline slide now supports roadmap features including status badges, progress indicators, milestones, and grouping.

### Schema

```typescript
{
  type: 'timeline',
  title: string,
  events: TimelineEvent[],
  orientation?: 'horizontal' | 'vertical',
  mode?: 'timeline' | 'roadmap',
  showProgress?: boolean,
  groupBy?: 'none' | 'quarter' | 'month' | 'year'
}

interface TimelineEvent {
  date: string,
  title: string,
  description?: string,
  status?: 'planned' | 'in-progress' | 'completed',
  progress?: number,  // 0-100
  milestone?: boolean,
  quarter?: string,  // e.g., "Q1 2024"
  dependencies?: number[]  // Array of event indices
}
```

### Example 1: Basic Timeline (Original Behavior)

```json
{
  "type": "timeline",
  "title": "Company History",
  "mode": "timeline",
  "orientation": "horizontal",
  "events": [
    {
      "date": "2020",
      "title": "Company Founded",
      "description": "Started in a garage with 3 founders"
    },
    {
      "date": "2021",
      "title": "Series A Funding",
      "description": "Raised $5M from venture capital"
    },
    {
      "date": "2023",
      "title": "Reached 1M Users",
      "description": "Major milestone in user growth"
    }
  ]
}
```

### Example 2: Product Roadmap with Progress

```json
{
  "type": "timeline",
  "title": "2024 Product Roadmap",
  "mode": "roadmap",
  "orientation": "horizontal",
  "showProgress": true,
  "groupBy": "quarter",
  "events": [
    {
      "date": "January 2024",
      "title": "Mobile App Launch",
      "description": "iOS and Android applications",
      "status": "completed",
      "progress": 100,
      "milestone": true,
      "quarter": "Q1 2024"
    },
    {
      "date": "February 2024",
      "title": "AI-Powered Search",
      "description": "Natural language search interface",
      "status": "completed",
      "progress": 100,
      "quarter": "Q1 2024"
    },
    {
      "date": "April 2024",
      "title": "Advanced Analytics Dashboard",
      "description": "Real-time metrics and insights",
      "status": "in-progress",
      "progress": 75,
      "quarter": "Q2 2024"
    },
    {
      "date": "May 2024",
      "title": "Team Collaboration Features",
      "description": "Shared workspaces and real-time editing",
      "status": "in-progress",
      "progress": 45,
      "quarter": "Q2 2024"
    },
    {
      "date": "July 2024",
      "title": "API v2.0 Release",
      "description": "GraphQL support and improved performance",
      "status": "planned",
      "progress": 0,
      "milestone": true,
      "quarter": "Q3 2024"
    },
    {
      "date": "September 2024",
      "title": "Enterprise SSO",
      "description": "SAML and OAuth integration",
      "status": "planned",
      "progress": 0,
      "quarter": "Q3 2024"
    }
  ]
}
```

### Example 3: Development Milestones

```json
{
  "type": "timeline",
  "title": "Feature Development Pipeline",
  "mode": "roadmap",
  "orientation": "vertical",
  "showProgress": true,
  "groupBy": "none",
  "events": [
    {
      "date": "Week 1-2",
      "title": "Design & Planning",
      "description": "User research and wireframes",
      "status": "completed",
      "progress": 100,
      "milestone": false
    },
    {
      "date": "Week 3-5",
      "title": "Backend Development",
      "description": "API endpoints and database schema",
      "status": "completed",
      "progress": 100,
      "milestone": false
    },
    {
      "date": "Week 6-8",
      "title": "Frontend Implementation",
      "description": "React components and state management",
      "status": "in-progress",
      "progress": 60,
      "milestone": false
    },
    {
      "date": "Week 9",
      "title": "Integration Testing",
      "description": "E2E tests and bug fixes",
      "status": "planned",
      "progress": 0,
      "milestone": false
    },
    {
      "date": "Week 10",
      "title": "Beta Release",
      "description": "Launch to select customers",
      "status": "planned",
      "progress": 0,
      "milestone": true
    }
  ]
}
```

---

## Complete Presentation Example

Here's a complete presentation using all the new slide types:

```json
{
  "theme": "pitch-deck",
  "title": "Product Launch Presentation",
  "slides": [
    {
      "type": "title",
      "title": "Introducing ProductX",
      "subtitle": "The Future of Team Collaboration",
      "author": "ACME Corp",
      "date": "October 2024"
    },
    {
      "type": "team",
      "title": "Leadership Team",
      "layout": "grid",
      "members": [
        {
          "name": "Sarah Chen",
          "role": "CEO",
          "photo": "https://example.com/sarah.jpg",
          "bio": "Former VP at Google",
          "social": {
            "linkedin": "https://linkedin.com/in/sarachen"
          }
        },
        {
          "name": "Michael Torres",
          "role": "CTO",
          "photo": "https://example.com/michael.jpg",
          "bio": "Ex-Amazon Principal Engineer",
          "social": {
            "linkedin": "https://linkedin.com/in/michaeltorres",
            "github": "https://github.com/mtorres"
          }
        }
      ]
    },
    {
      "type": "timeline",
      "title": "Product Roadmap",
      "mode": "roadmap",
      "showProgress": true,
      "groupBy": "quarter",
      "events": [
        {
          "date": "Q4 2024",
          "title": "Beta Launch",
          "status": "in-progress",
          "progress": 80,
          "milestone": true,
          "quarter": "Q4 2024"
        },
        {
          "date": "Q1 2025",
          "title": "Public Release",
          "status": "planned",
          "milestone": true,
          "quarter": "Q1 2025"
        }
      ]
    },
    {
      "type": "code",
      "title": "Simple API Integration",
      "language": "javascript",
      "filename": "app.js",
      "theme": "dark",
      "highlights": [3, 4, 5],
      "code": "import { ProductX } from '@productx/sdk';\n\nconst client = new ProductX({\n  apiKey: process.env.PRODUCTX_API_KEY\n});\n\nconst result = await client.collaborate({\n  workspace: 'team-alpha',\n  users: ['alice', 'bob']\n});\n\nconsole.log('Collaboration started:', result.id);"
    },
    {
      "type": "pricing",
      "title": "Flexible Pricing",
      "highlight": 1,
      "plans": [
        {
          "name": "Starter",
          "price": 19,
          "period": "per user/month",
          "features": [
            "Up to 10 users",
            "5GB storage",
            "Basic features"
          ],
          "cta": "Start Free Trial"
        },
        {
          "name": "Business",
          "price": 49,
          "period": "per user/month",
          "features": [
            "Up to 100 users",
            "50GB storage",
            "Advanced features",
            "Priority support"
          ],
          "cta": "Get Started",
          "recommended": true
        },
        {
          "name": "Enterprise",
          "price": "Custom",
          "features": [
            "Unlimited users",
            "Unlimited storage",
            "Custom features",
            "Dedicated support"
          ],
          "cta": "Contact Sales"
        }
      ]
    }
  ]
}
```

---

## Notes on Syntax Highlighting

The code slide template includes a basic regex-based syntax highlighter that works without external dependencies. For production use with more languages or better accuracy, consider integrating:

- **Shiki** (recommended): Static syntax highlighter using VS Code themes
- **Prism.js**: Popular lightweight syntax highlighter
- **Highlight.js**: Automatic language detection

The current implementation covers common languages and works well for presentation purposes where perfect syntax highlighting is less critical than readability.

---

## Dependencies

All new features are implemented **without additional npm dependencies**. The syntax highlighting in the code template uses built-in regex patterns, making it lightweight and fast. However, if you need production-grade syntax highlighting, you can optionally install:

```bash
npm install shiki
# or
npm install prismjs
```

Then modify the `code.ts` template to use the external library instead of the built-in highlighter.
