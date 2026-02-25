import Link from 'next/link'
import MobileNav from '@/components/MobileNav'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="container-wide">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🛍️</span>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              Cosmic Commerce
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/products"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Products
            </Link>
            <Link
              href="/collections"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Collections
            </Link>
            <Link
              href="/reviews"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Reviews
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Blog
            </Link>
          </nav>

          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}