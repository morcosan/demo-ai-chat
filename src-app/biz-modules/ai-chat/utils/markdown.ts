import DOMPurify from 'dompurify'
import { marked } from 'marked'

const _htmlParser = document.createElement('div')

export const getTextFromMarkdown = (markdown: string) => {
	_htmlParser.innerHTML = DOMPurify.sanitize(marked.parse(markdown, { async: false }))
	return _htmlParser.textContent || ''
}
