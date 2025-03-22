import { Media } from '@/components/media'
import { SerializedUploadNode } from '@payloadcms/richtext-lexical'

type Props = {
  node: SerializedUploadNode
}

export const MediaBlock: React.FC<Props> = (props) => {
  const { node } = props

  if (node.relationTo === 'media') {
    const uploadDoc = node.value
    return <Media resource={uploadDoc} imgClassName="max-h-[400px] object-contain" />
  }

  return null
}
