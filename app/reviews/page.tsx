import { getReviews } from '@/lib/cosmic'
import ReviewCard from '@/components/ReviewCard'
import StarRating from '@/components/StarRating'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Customer Reviews | Cosmic Commerce',
  description: 'Read authentic reviews from our customers',
}

export default async function ReviewsPage() {
  const reviews = await getReviews()

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + parseInt(r.metadata.rating?.value || '5', 10), 0) /
        reviews.length
      : 0

  return (
    <div className="container-wide py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Customer Reviews</h1>
        <p className="text-gray-500 mt-2">
          What our customers are saying
        </p>
        {reviews.length > 0 && (
          <div className="flex items-center gap-3 mt-4">
            <StarRating rating={Math.round(averageRating)} size="lg" />
            <span className="text-lg font-semibold text-gray-900">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-gray-500">
              from {reviews.length} review{reviews.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No reviews yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  )
}