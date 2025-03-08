'use client'
import { Button } from '@/components/ui/button'
import { CopyIcon } from '@payloadcms/ui/icons/Copy'

export function CopyButton({ code }: { code: string }) {
  return (
    <div className="flex justify-end align-middle">
      <Button
        className="flex gap-1 text-xs"
        variant={'secondary'}
        onClick={async () => {
          await navigator.clipboard.writeText(code)
        }}
      >
        <CopyIcon />
      </Button>
    </div>
  )
}
