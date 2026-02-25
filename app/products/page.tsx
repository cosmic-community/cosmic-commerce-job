import { getProducts } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Products | Cosmic Commerce',
  description: 'Browse our complete product catalog',
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="container-wide py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
        <p className="text-gray-500 mt-2">
          Browse our complete collection of {products.length} products
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}