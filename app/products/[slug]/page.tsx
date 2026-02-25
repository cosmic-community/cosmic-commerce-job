// app/products/[slug]/page.tsx
import { getProductBySlug, getReviewsByProductId } from '@/lib/cosmic'
import ReviewCard from '@/components/ReviewCard'
import StarRating from '@/components/StarRating'
import BuyButton from '@/components/BuyButton'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) {
    return { title: 'Product Not Found' }
  }
  return {
    title: `${product.metadata.name} | Cosmic Commerce`,
    description: `${product.metadata.name} — $${product.metadata.price.toFixed(2)}`,
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const reviews = await getReviewsByProductId(product.id)

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + parseInt(r.metadata.rating?.value || '5', 10), 0) /
          reviews.length
      : 0

  const imageUrl = product.metadata.product_image?.imgix_url
  const inStock = product.metadata.in_stock !== false

  return (
    <div className="container-wide py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-900 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-gray-900 transition-colors">
          Products
        </Link>
        <span>/</span>
        <span className="text-gray-900">{product.metadata.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden">
          {imageUrl ? (
            <img
              src={`${imageUrl}?w=1200&h=1200&fit=crop&auto=format,compress`}
              alt={product.metadata.name}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          {product.metadata.collection && (
            <Link
              href={`/collections/${product.metadata.collection.slug}`}
              className="text-sm font-medium text-brand-600 uppercase tracking-wider hover:text-brand-700 transition-colors"
            >
              {product.metadata.collection.metadata?.name || product.metadata.collection.title}
            </Link>
          )}

          <h1 className="text-3xl font-bold text-gray-900 mt-2">
            {product.metadata.name}
          </h1>

          {reviews.length > 0 && (
            <div className="flex items-center gap-3 mt-3">
              <StarRating rating={Math.round(averageRating)} />
              <span className="text-sm text-gray-500">
                {averageRating.toFixed(1)} ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
              </span>
            </div>
          )}

          <div className="mt-6">
            <span className="text-3xl font-bold text-gray-900">
              ${product.metadata.price.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-3 mt-4">
            {inStock ? (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                In Stock
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-red-700 bg-red-50 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 bg-red-500 rounded-full" />
                Out of Stock
              </span>
            )}
            {product.metadata.sku && (
              <span className="text-sm text-gray-400">SKU: {product.metadata.sku}</span>
            )}
          </div>

          {/* Changed: Added BuyButton component */}
          <BuyButton
            productName={product.metadata.name}
            price={product.metadata.price}
            inStock={inStock}
          />

          {product.metadata.description && (
            <div className="mt-8 prose prose-gray prose-sm max-w-none">
              <ReactMarkdown>{product.metadata.description}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Customer Reviews ({reviews.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} showProduct={false} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}