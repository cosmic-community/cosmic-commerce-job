// app/blog/[slug]/page.tsx
import { getPostBySlug } from '@/lib/cosmic'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) {
    return { title: 'Post Not Found' }
  }
  return {
    title: `${post.title} | Cosmic Commerce Blog`,
    description: post.metadata.content?.substring(0, 160) || post.title,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const author = post.metadata.author
  const category = post.metadata.category
  const featuredImage = post.metadata.featured_image?.imgix_url

  return (
    <article className="container-wide py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-900 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-gray-900 transition-colors">
          Blog
        </Link>
        <span>/</span>
        <span className="text-gray-900 truncate max-w-[200px]">{post.title}</span>
      </nav>

      <div className="max-w-3xl mx-auto">
        {category && (
          <span className="text-sm font-semibold text-brand-600 uppercase tracking-wider">
            {category.metadata?.name || category.title}
          </span>
        )}

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 leading-tight">
          {post.title}
        </h1>

        {author && (
          <div className="flex items-center gap-4 mt-6 pb-8 border-b border-gray-100">
            {author.metadata?.photo && (
              <img
                src={`${author.metadata.photo.imgix_url}?w=100&h=100&fit=crop&auto=format,compress`}
                alt={author.metadata.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
            <div>
              <p className="font-semibold text-gray-900">
                {author.metadata?.name || author.title}
              </p>
              {author.metadata?.bio && (
                <p className="text-sm text-gray-500 line-clamp-1">{author.metadata.bio}</p>
              )}
            </div>
          </div>
        )}

        {featuredImage && (
          <div className="mt-8 rounded-2xl overflow-hidden">
            <img
              src={`${featuredImage}?w=1400&h=700&fit=crop&auto=format,compress`}
              alt={post.title}
              width={700}
              height={350}
              className="w-full h-auto"
            />
          </div>
        )}

        {post.metadata.content && (
          <div className="mt-10 prose prose-gray prose-lg max-w-none prose-headings:font-bold prose-a:text-brand-600 prose-img:rounded-xl">
            <ReactMarkdown>{post.metadata.content}</ReactMarkdown>
          </div>
        )}

        {/* Back to blog */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>
    </article>
  )
}