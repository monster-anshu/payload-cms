import { getPayload } from 'payload'
import React from 'react'
import configPromise from '@payload-config'

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
    },
  })

  return (
    <main className="container">
      <h1 className="text-4xl">Posts</h1>
      <div className="py-2">
        {posts.docs.map((doc) => {
          return <div key={doc.id}>{doc.title}</div>
        })}
      </div>
    </main>
  )
}
