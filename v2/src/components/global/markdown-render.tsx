// components/MarkdownRenderer.tsx
import React from 'react'

interface MarkdownRendererProps {
  content: string
}

// Custom function to parse markdown-like syntax and convert it to JSX
const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const renderContent = (text: string) => {
    const elements: React.ReactNode[] = []
    const paragraphs = text.split(/\n\n+/) // Split by two or more newlines for paragraphs

    paragraphs.forEach((paragraph, pIndex) => {
      const lines = paragraph.split('\n') // Split by single newline within a paragraph

      const lineElements = lines.map((line, index) => {
        // Headings
        if (line.startsWith('#### '))
          return <h4 key={`${pIndex}-${index}`}>{line.slice(5).trim()}</h4>
        if (line.startsWith('### '))
          return <h3 key={`${pIndex}-${index}`}>{line.slice(4).trim()}</h3>
        if (line.startsWith('## '))
          return <h2 key={`${pIndex}-${index}`}>{line.slice(3).trim()}</h2>
        if (line.startsWith('# ')) return <h1 key={`${pIndex}-${index}`}>{line.slice(2).trim()}</h1>

        // Unordered list items
        if (line.startsWith('- ')) {
          return <li key={`${pIndex}-${index}`}>{line.slice(2).trim()}</li>
        }

        // Images: ![alt text](image-url)
        const imageMatch = line.match(/!\[(.*?)\]\((.*?)\)/)
        if (imageMatch) {
          const [_, alt, src] = imageMatch
          return <img key={`${pIndex}-${index}`} src={src} alt={alt} className="my-4" />
        }

        // Bold (**bold**)
        line = line.replace(/\*\*(.*?)\*\*/g, (_, match) => `<b>${match}</b>`)

        // Underline (__underline__)
        line = line.replace(/__(.*?)__/g, (_, match) => `<u>${match}</u>`)

        // Strikethrough (~~strikethrough~~)
        line = line.replace(/~~(.*?)~~/g, (_, match) => `<s>${match}</s>`)

        // Render as plain text with <br /> between lines
        return (
          <React.Fragment key={`${pIndex}-${index}`}>
            <span dangerouslySetInnerHTML={{ __html: line }} />
            {index < lines.length - 1 && <br />} {/* Add <br /> for soft line breaks */}
          </React.Fragment>
        )
      })

      // If the paragraph contains list items, wrap them in <ul>
      if (lines.every(line => line.startsWith('- '))) {
        elements.push(
          <ul key={pIndex} className="mb-4 list-disc pl-6">
            {lineElements}
          </ul>,
        )
      } else {
        elements.push(
          <div key={pIndex} className="mb-4">
            {lineElements}
          </div>,
        )
      }
    })

    return elements
  }

  return <div>{renderContent(content)}</div>
}

export default MarkdownRenderer
