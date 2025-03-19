import type { Metadata } from 'next'
import type { Post } from '../payload-types'

export const generateMeta = async (args: { doc: Partial<Post> | null }): Promise<Metadata> => {
  const { doc } = args

  // const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title
    ? doc?.meta?.title + ' | Blog | Himanshu Gunwant'
    : 'Blog | Himanshu Gunwant'

  return {
    description: doc?.meta?.description,
    title,
    //TODO: add open graph
    // openGraph: ({
    //   description: doc?.meta?.description || '',
    //   images: ogImage
    //     ? [
    //         {
    //           url: ogImage,
    //         },
    //       ]
    //     : undefined,
    //   title,
    //   url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    // }),
  }
}
