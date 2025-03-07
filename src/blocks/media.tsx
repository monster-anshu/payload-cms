import type { StaticImageData } from 'next/image'
import { cn } from '@/lib/utils'
import { Media } from '@/components/media'
import type { MediaBlock as MediaBlockProps } from '@/payload-types'

type Props = MediaBlockProps & {
  breakout?: boolean
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
}

export const MediaBlock: React.FC<Props> = (props) => {
  const { className, enableGutter = true, imgClassName, media, staticImage } = props

  return (
    <div
      className={cn(
        '',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      {(media || staticImage) && (
        <Media
          imgClassName={cn('border border-border rounded-[0.8rem]', imgClassName)}
          resource={media}
          src={staticImage}
        />
      )}
    </div>
  )
}
