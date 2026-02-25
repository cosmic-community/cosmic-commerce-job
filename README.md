# Cosmic Commerce

![Cosmic Commerce](https://imgix.cosmicjs.com/21b4d5d0-12a1-11f1-87b4-a3b1ac0874fc-photo-1441986300917-64674bd600d8-1772061868522.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern e-commerce storefront built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com). Browse products, explore curated collections, read customer reviews, and enjoy blog content — all managed through the Cosmic headless CMS.

## Features

- 🛍️ **Product Catalog** — Full product listings with images, pricing, stock status, and markdown descriptions
- 📦 **Collections** — Curated product collections with hero images and descriptions
- ⭐ **Customer Reviews** — Star-rated reviews linked to specific products
- 📝 **Blog** — Full-featured blog with categories, authors, and featured images
- ⚡ **Server Components** — All data fetched server-side for blazing-fast performance
- 📱 **Responsive Design** — Beautiful on every screen size
- 🔍 **SEO Optimized** — Server-rendered pages with proper metadata
- 🖼️ **Image Optimization** — Imgix-powered image transformations

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=699f837af276ae650676d4c6&clone_repository=699f8885f276ae650676d530)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Design a content model for an e-commerce store with products, collections, and customer reviews"

### Code Generation Prompt

> "Build a Next.js website that uses my existing objects in this bucket"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [Cosmic](https://www.cosmicjs.com) — Headless CMS ([docs](https://www.cosmicjs.com/docs))
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) runtime installed
- A [Cosmic](https://www.cosmicjs.com) account with your e-commerce content

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd cosmic-commerce

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Start the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Cosmic SDK Examples

### Fetching Products

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Product by Slug

```typescript
const { object: product } = await cosmic.objects
  .findOne({ type: 'products', slug: 'minimalist-leather-backpack' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Reviews for a Product

```typescript
const { objects: reviews } = await cosmic.objects
  .find({ type: 'reviews', 'metadata.product': productId })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This project uses the following Cosmic content types:

| Type | Description |
|------|-------------|
| 🛍️ Products | Product listings with name, description, price, SKU, stock status, image, and collection |
| 📦 Collections | Curated groups of products with hero images |
| ⭐ Reviews | Customer reviews with ratings (1-5) linked to products |
| 📝 Posts | Blog posts with markdown content, featured images, authors, and categories |
| ✍️ Authors | Blog authors with bios and photos |
| 🏷️ Categories | Blog post categories |

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add environment variables: `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import the project on [Netlify](https://netlify.com)
3. Set build command: `bun run build`
4. Set publish directory: `.next`
5. Add environment variables
6. Deploy

<!-- README_END -->