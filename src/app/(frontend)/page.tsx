import { getPayload } from 'payload'
import React from 'react'
import configPromise from '@payload-config'
import { PostCard } from '@/components/post/PostCard'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      heroImage: true,
    },
  })

  return (
    <main>
      <div className="container mb-8">
        <h1 className="text-4xl">Blogs</h1>
      </div>
      <div className="container">
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {posts.docs.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <PostCard className="h-full" doc={result} showCategories />
                </div>
              )
            }
            return null
          })}
        </div>
      </div>
    </main>
  )
}
