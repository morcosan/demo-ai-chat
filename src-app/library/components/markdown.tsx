import { NewTabSvg } from '@ds/release'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js'
import { Marked, Renderer, TokenizerExtension, Tokens } from 'marked'
import { markedHighlight } from 'marked-highlight'
import { useMemo } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

interface Props extends ReactProps {
	text: string
}

// Escape all html tags
const ESCAPE_HTML: TokenizerExtension = {
	name: 'ESCAPE_HTML',
	level: 'inline',
	start: (src: string) => src.indexOf('<'),
	tokenizer: (src: string) => {
		const rule = /^<[^>]*>/ // Match HTML tags
		const match = rule.exec(src)
		if (match) return { type: 'text', raw: match[0], text: match[0] }
	},
}

export const Markdown = ({ text, className }: Props) => {
	const highlightFn = (code: string, lang: string) => {
		return hljs.highlight(code, { language: hljs.getLanguage(lang) ? lang : 'plaintext' }).value
	}

	const renderer = new Renderer()
	renderer.link = ({ href, text }: Tokens.Link) => {
		return renderToStaticMarkup(
			<a href={href} target="_blank" rel="noopener noreferrer" className="ds-link">
				{text || href}
				<NewTabSvg className="ml-xs-2 inline-block h-xs-4 w-xs-4 align-baseline" />
			</a>
		)
	}
	const marked = new Marked(markedHighlight({ langPrefix: 'lang-', highlight: highlightFn }))
	marked.setOptions({ renderer })
	marked.use({ extensions: [ESCAPE_HTML] })

	const html = useMemo(() => {
		const unparsed = text.replace(/\n/g, '  \n') // Fix new lines for markdown
		const parsed = marked.parse(unparsed, { async: false })
		return DOMPurify.sanitize(parsed, { ADD_ATTR: ['target'] })
	}, [text])

	return <div className={cx('ds-markdown', className)} dangerouslySetInnerHTML={{ __html: html }} />
}
