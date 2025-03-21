import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/media'
import { formatAuthors } from '@/utils/formatAuthors'
import { formatDateTime } from '@/utils/formatDateTime'
import Link from 'next/link'
import { MoveLeft } from 'lucide-react'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="max-w-[48rem] mx-auto">
      <Link href={'/'}>
        <MoveLeft />
      </Link>
      <h1 className="mb-5 mt-6 text-xl md:text-2xl lg:text-4xl">{title}</h1>
      <div className="flex mb-6 flex-col md:flex-row gap-4 md:gap-8 text-foreground/80">
        {hasAuthors && (
          <div className="flex flex-col gap-0.5">
            <p className="text-sm">Author</p>
            <p>{formatAuthors(populatedAuthors)}</p>
          </div>
        )}
        {publishedAt && (
          <div className="flex flex-col gap-0.5">
            <p className="text-sm">Date Published</p>
            <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
          </div>
        )}
        <div className="flex flex-col gap-0.5">
          <p className="text-sm">Category</p>
          <div className="capitalize text-sm ">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                  </React.Fragment>
                )
              }
              return null
            })}
          </div>
        </div>
      </div>
      <Media
        fill
        priority
        imgClassName="border rounded"
        className="relative aspect-video w-full"
        resource={heroImage}
      />
    </div>
  )
}
