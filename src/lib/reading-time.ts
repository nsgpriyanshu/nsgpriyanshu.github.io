export function readingTimeFromHtml(html: string, wpm = 200) {
  if (!html) return '1 min read'
  // strip HTML tags
  const text = html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (!text) return '1 min read'
  const words = text.split(' ').length
  const minutes = Math.max(1, Math.ceil(words / wpm))
  return `${minutes} min read`
}

export function readingTimeFromText(textInput: string, wpm = 200) {
  if (!textInput) return '1 min read'
  const text = textInput.replace(/\s+/g, ' ').trim()
  if (!text) return '1 min read'
  const words = text.split(' ').length
  const minutes = Math.max(1, Math.ceil(words / wpm))
  return `${minutes} min read`
}

export default readingTimeFromHtml
