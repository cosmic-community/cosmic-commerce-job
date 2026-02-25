import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-20">
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🛍️</span>
              <span className="text-lg font-bold text-gray-900">Cosmic Commerce</span>
            </div>
            <p className="text-sm text-gray-500 max-w-sm">
              A curated selection of premium products, powered by Cosmic headless CMS. Quality craftsmanship meets modern technology.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Shop
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-8 text-center">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Cosmic Commerce. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}