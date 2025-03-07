import { postgresAdapter } from '@payloadcms/db-postgres'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { s3Storage } from '@payloadcms/storage-s3'
import { Posts } from './collections/Posts'
import { Categories } from './collections/Categories'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { Post } from './payload-types'
import { getServerSideURL } from './utils/getURL'
import { defaultLexical } from '@/fields/lexial-editor'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const generateTitle: GenerateTitle<Post> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Himanshu Gunwant Blog` : 'Himanshu Gunwant Blog'
}

const generateURL: GenerateURL<Post> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/post/${doc.slug}` : url
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Posts, Categories],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  editor: defaultLexical,
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        region: process.env.S3_REGION,
        // ... Other S3 configuration
      },
    }),
    seoPlugin({
      generateTitle,
      generateURL,
    }),
  ],
})
