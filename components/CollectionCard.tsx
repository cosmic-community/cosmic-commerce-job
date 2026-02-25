import Link from 'next/link'
import type { Collection } from '@/types'

interface CollectionCardProps {
  collection: Collection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const heroImage = collection.metadata.hero_image?.imgix_url

  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group relative block rounded-2xl overflow-hidden aspect-[16/9]"
    >
      {heroImage ? (
        <img
          src={`${heroImage}?w=1200&h=675&fit=crop&auto=format,compress`}
          alt={collection.metadata.name}
          width={600}
          height={338}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-brand-500 to-brand-700" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-xl font-bold text-white mb-1">
          {collection.metadata.name}
        </h3>
        {collection.metadata.description && (
          <p className="text-sm text-white/80 line-clamp-2">
            {collection.metadata.description}
          </p>
        )}
        <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-white group-hover:gap-2 transition-all">
          Browse Collection
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  )
}