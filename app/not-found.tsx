import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container-wide py-32 text-center">
      <h1 className="text-6xl font-extrabold text-gray-200">404</h1>
      <h2 className="mt-4 text-2xl font-bold text-gray-900">Page Not Found</h2>
      <p className="mt-2 text-gray-500">Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
      <Link
        href="/"
        className="inline-flex items-center mt-8 px-6 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors"
      >
        Go Home
      </Link>
    </div>
  )
}