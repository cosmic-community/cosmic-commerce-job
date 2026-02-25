import Link from 'next/link'
import type { Post } from '@/types'

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImage = post.metadata.featured_image?.imgix_url
  const author = post.metadata.author
  const category = post.metadata.category

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
    >
      {featuredImage && (
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={`${featuredImage}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={post.title}
            width={400}
            height={225}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="p-6">
        {category && (
          <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider">
            {category.metadata?.name || category.title}
          </span>
        )}
        <h3 className="mt-2 text-lg font-bold text-gray-900 group-hover:text-brand-700 transition-colors line-clamp-2">
          {post.title}
        </h3>
        {author && (
          <div className="flex items-center gap-3 mt-4">
            {author.metadata?.photo && (
              <img
                src={`${author.metadata.photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                alt={author.metadata.name}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <span className="text-sm text-gray-500">{author.metadata?.name || author.title}</span>
          </div>
        )}
      </div>
    </Link>
  )
}