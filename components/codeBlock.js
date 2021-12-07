import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import {dracula, coy} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import {useDarkModeContext} from '../context/darkModeContext'

const CodeBlock = {
  code({node, inline, className, children, ...props}) {
    const match = /language-(\w+)/.exec(className || '')
    const darkMode = useDarkModeContext()
    return !inline && match ? (
      <div style={{aspectRatio:3}}>
        <SyntaxHighlighter 
          style={darkMode.value ? dracula : coy}
          // using inline styles to set fix width of code block otherwse it stretches beyond parent container width in blog posts
          customStyle={{maxWidth: '45rem', maxWidthoverflowX: 'scroll', color: 'rgb(248, 248, 242)', background: 'rgb(40, 42, 54)'}}
          showLineNumbers="True"
          language={match[1]}
          PreTag="div"
          >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  }
}

export default CodeBlock