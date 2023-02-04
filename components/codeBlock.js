import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import {dracula, solarizedLight, vscDarkPlus, shadesOfPurple} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import {useDarkModeContext} from '../context/darkModeContext'

const CodeBlock = {
  code({node, inline, className, children, ...props}) {
    const match = /language-(\w+)/.exec(className || '')
    const darkMode = useDarkModeContext()
    return !inline && match ? (
      <div style={{aspectRatio:3, marginTop:'2rem',marginBottom:'2rem'}}>
        <SyntaxHighlighter 
          // style={darkMode.value ? dracula : solarizedLight}
          style={dracula}
          // using inline styles to set fix width of code block otherwse it stretches beyond parent container width in blog posts
          customStyle={{maxWidth: '45rem', maxWidthoverflowX: 'scroll', fontSize: '0.8rem',border:'0.8rem transparent', borderRadius:'0.5rem'}}
          showLineNumbers="True"
          language={match[1]}
          PreTag="div"
          className="disableScrollbars"
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