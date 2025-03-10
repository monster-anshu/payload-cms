import type { Block } from 'payload'
import {
  lexicalEditor,
  FixedToolbarFeature,
  BlocksFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'
import { Code } from '@/blocks/Code/config'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}

export const defaultLexical = lexicalEditor({
  features({ defaultFeatures, rootFeatures }) {
    return [...defaultFeatures, FixedToolbarFeature(), BlocksFeature({ blocks: [Code] })]
  },
})
