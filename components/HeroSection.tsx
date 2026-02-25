import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative bg-gray-900 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://imgix.cosmicjs.com/21b4d5d0-12a1-11f1-87b4-a3b1ac0874fc-photo-1441986300917-64674bd600d8-1772061868522.jpg?w=1920&h=800&fit=crop&auto=format,compress&q=80"
          alt="Hero background"
          width={1920}
          height={800}
          className="w-full h-full object-cover opacity-40"
        />
      </div>
      <div className="relative container-wide py-24 sm:py-32 lg:py-40">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Curated Products,
            <br />
            <span className="text-brand-400">Crafted for You</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-xl">
            Discover our handpicked selection of premium products. From leather goods to cutting-edge tech — quality you can feel.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              Shop All Products
            </Link>
            <Link
              href="/collections"
              className="inline-flex items-center px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
            >
              Browse Collections
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}