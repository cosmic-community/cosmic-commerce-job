import { getCollections } from '@/lib/cosmic'
import CollectionCard from '@/components/CollectionCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Collections | Cosmic Commerce',
  description: 'Browse our curated product collections',
}

export default async function CollectionsPage() {
  const collections = await getCollections()

  return (
    <div className="container-wide py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Collections</h1>
        <p className="text-gray-500 mt-2">
          Explore our curated product collections
        </p>
      </div>

      {collections.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No collections found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      )}
    </div>
  )
}