'use client'
import Link from 'next/link'
import React, { Fragment } from 'react'
import type { Post } from '@/payload-types'
import { cn } from '@/lib/utils'
import { Media } from '@/components/media'

export type PostCardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'heroImage'>

export const PostCard: React.FC<{
  alignItems?: 'center'
  className?: string
  doc: PostCardPostData
  showCategories?: boolean
}> = (props) => {
  const { className, doc, showCategories } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/post/${slug}`
  const cardImage = metaImage || doc.heroImage
  console.log(cardImage)
  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-PostCard hover:cursor-pointer',
        className,
      )}
    >
      <div className="relative w-full">
        {!cardImage && <div className="">No image</div>}
        {cardImage && typeof cardImage !== 'string' && (
          <Media resource={cardImage} className="aspect-video object-cover" fill />
        )}
      </div>
      <div className="p-4">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        <div className="prose">
          <h3>
            <Link className="not-prose" href={href}>
              {title}
            </Link>
          </h3>
        </div>
        {description && <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>}
      </div>
    </article>
  )
}
