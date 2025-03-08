import React from 'react'
import { Code } from './Component.client'

export type CodeBlockProps = {
  code?: string | null
  language?: string | null
  blockType: 'code'
}

type Props = CodeBlockProps & {
  className?: string
}

export const CodeBlock: React.FC<Props> = ({ className, code, language }) => {
  return (
    <div className={[className, 'not-prose'].filter(Boolean).join(' ')}>
      <Code code={code || ''} language={language || ''} />
    </div>
  )
}
