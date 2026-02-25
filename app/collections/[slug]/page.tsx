// app/collections/[slug]/page.tsx
import { getCollectionBySlug, getProductsByCollectionId } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const collection = await getCollectionBySlug(slug)
  if (!collection) {
    return { title: 'Collection Not Found' }
  }
  return {
    title: `${collection.metadata.name} | Cosmic Commerce`,
    description: collection.metadata.description || `Browse the ${collection.metadata.name} collection`,
  }
}

export default async function CollectionDetailPage({ params }: PageProps) {
  const { slug } = await params
  const collection = await getCollectionBySlug(slug)

  if (!collection) {
    notFound()
  }

  const products = await getProductsByCollectionId(collection.id)
  const heroImage = collection.metadata.hero_image?.imgix_url

  return (
    <div>
      {/* Hero */}
      <div className="relative h-64 sm:h-80 bg-gray-900 overflow-hidden">
        {heroImage ? (
          <img
            src={`${heroImage}?w=1920&h=640&fit=crop&auto=format,compress`}
            alt={collection.metadata.name}
            width={1920}
            height={640}
            className="w-full h-full object-cover opacity-50"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-600 to-brand-900" />
        )}
        <div className="absolute inset-0 flex items-center">
          <div className="container-wide">
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-4">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/collections" className="hover:text-white transition-colors">
                Collections
              </Link>
              <span>/</span>
              <span className="text-white">{collection.metadata.name}</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              {collection.metadata.name}
            </h1>
            {collection.metadata.description && (
              <p className="mt-3 text-lg text-white/80 max-w-2xl">
                {collection.metadata.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="container-wide py-12">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No products in this collection yet.</p>
            <Link
              href="/products"
              className="inline-flex items-center mt-4 text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              Browse all products →
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-8">
              {products.length} product{products.length !== 1 ? 's' : ''} in this collection
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}