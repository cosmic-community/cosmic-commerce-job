import Link from 'next/link'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.metadata.product_image?.imgix_url
  const price = product.metadata.price
  const inStock = product.metadata.in_stock !== false

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
    >
      <div className="aspect-square bg-gray-50 overflow-hidden">
        {imageUrl ? (
          <img
            src={`${imageUrl}?w=800&h=800&fit=crop&auto=format,compress`}
            alt={product.metadata.name}
            width={400}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      <div className="p-5">
        {product.metadata.collection && (
          <p className="text-xs font-medium text-brand-600 uppercase tracking-wider mb-1">
            {product.metadata.collection.title}
          </p>
        )}
        <h3 className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">
          {product.metadata.name}
        </h3>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
          {!inStock && (
            <span className="text-xs font-medium text-red-500 bg-red-50 px-2 py-1 rounded-full">
              Out of Stock
            </span>
          )}
          {inStock && (
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              In Stock
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}