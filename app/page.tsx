import HeroSection from '@/components/HeroSection'
import ProductCard from '@/components/ProductCard'
import CollectionCard from '@/components/CollectionCard'
import ReviewCard from '@/components/ReviewCard'
import PostCard from '@/components/PostCard'
import { getProducts, getCollections, getReviews, getPosts } from '@/lib/cosmic'
import Link from 'next/link'

export default async function HomePage() {
  const [products, collections, reviews, posts] = await Promise.all([
    getProducts(),
    getCollections(),
    getReviews(),
    getPosts(),
  ])

  return (
    <div>
      <HeroSection />

      {/* Collections Section */}
      {collections.length > 0 && (
        <section className="container-wide py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Shop by Collection</h2>
              <p className="text-gray-500 mt-1">Explore our curated product collections</p>
            </div>
            <Link
              href="/collections"
              className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors hidden sm:block"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </section>
      )}

      {/* Products Section */}
      {products.length > 0 && (
        <section className="container-wide py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
              <p className="text-gray-500 mt-1">Our top picks for you</p>
            </div>
            <Link
              href="/products"
              className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors hidden sm:block"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="container-wide">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">What Our Customers Say</h2>
                <p className="text-gray-500 mt-1">Real reviews from real people</p>
              </div>
              <Link
                href="/reviews"
                className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors hidden sm:block"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.slice(0, 3).map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Section */}
      {posts.length > 0 && (
        <section className="container-wide py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">From the Blog</h2>
              <p className="text-gray-500 mt-1">Stories, guides, and insights</p>
            </div>
            <Link
              href="/blog"
              className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors hidden sm:block"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(0, 3).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}