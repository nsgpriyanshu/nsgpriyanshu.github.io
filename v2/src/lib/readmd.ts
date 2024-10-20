import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export const getMarkdownData = (fileName: string) => {
  const filePath = path.join(process.cwd(), 'content/blog', fileName)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    frontmatter: data, // e.g., title, author, date
    content,
  }
}

export const getAllMarkdownSlugs = () => {
  const directoryPath = path.join(process.cwd(), 'content/blog')
  const fileNames = fs.readdirSync(directoryPath)

  return fileNames.map(file => file.replace(/\.md$/, '')) // Return slugs without .md extension
}
