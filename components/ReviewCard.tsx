import Link from 'next/link'
import StarRating from '@/components/StarRating'
import type { Review } from '@/types'

interface ReviewCardProps {
  review: Review;
  showProduct?: boolean;
}

export default function ReviewCard({ review, showProduct = true }: ReviewCardProps) {
  const ratingValue = parseInt(review.metadata.rating?.value || '5', 10)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-semibold text-gray-900">{review.metadata.reviewer_name}</p>
          {showProduct && review.metadata.product && (
            <Link
              href={`/products/${review.metadata.product.slug}`}
              className="text-sm text-brand-600 hover:text-brand-700 transition-colors"
            >
              {review.metadata.product.metadata?.name || review.metadata.product.title}
            </Link>
          )}
        </div>
        <StarRating rating={ratingValue} size="sm" />
      </div>

      <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
      <p className="text-sm text-gray-600 leading-relaxed">
        {review.metadata.review_text}
      </p>
    </div>
  )
}