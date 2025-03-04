import { cn } from '@/lib/utils'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText as RichTextWithoutBlocks } from '@payloadcms/richtext-lexical/react'

type Props = {
  data: SerializedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

// TODO: add jsxconverter
export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <RichTextWithoutBlocks
      className={cn(
        'px-2',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert ': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
