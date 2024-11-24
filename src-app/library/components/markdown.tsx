import { Button, CopySvg, NewTabSvg } from '@ds/release'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js'
import { Marked, Renderer, TokenizerExtension, Tokens } from 'marked'
import { markedHighlight } from 'marked-highlight'
import { useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'

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
	const renderer = new Renderer()

	renderer.link = ({ href, text }: Tokens.Link) => {
		return renderToStaticMarkup(
			<a href={href} target="_blank" rel="noopener noreferrer" className="ds-link">
				{text || href}
				<NewTabSvg className="ml-xs-2 inline-block h-xs-4 w-xs-4 align-baseline" />
			</a>
		)
	}
	renderer.image = ({ href, text, title }: Tokens.Image) => {
		return renderToStaticMarkup(
			<span className="ds-markdown-img-box">
				<img src={href} alt={title + ': ' + text} />
				<span aria-hidden="true">{title}</span>
			</span>
		)
	}
	renderer.code = ({ text, lang, raw }: Tokens.Code) => {
		return renderToStaticMarkup(
			<pre>
				<div>
					{lang || 'plaintext'}
					<div data-code-raw={raw} />
				</div>
				<code dangerouslySetInnerHTML={{ __html: text }} />
			</pre>
		)
	}

	const highlightFn = (code: string, lang: string) => {
		return hljs.highlight(code, { language: hljs.getLanguage(lang) ? lang : 'plaintext' }).value
	}

	const marked = new Marked(markedHighlight({ highlight: highlightFn }))
	marked.setOptions({ renderer })
	marked.use({ extensions: [ESCAPE_HTML] })

	const injectComponents = (container: HTMLDivElement) => {
		if (!container) return

		const placeholder = container.querySelector('[data-code-raw]')
		if (!placeholder) return

		const rawCode = placeholder.getAttribute('data-code-raw') || ''
		placeholder.removeAttribute('data-code-raw')

		createRoot(placeholder).render(
			<MemoryRouter>
				<Button
					variant="text-default"
					size="xs"
					tooltip={rawCode}
					className="-mr-button-px-xs"
					onClick={() => onClickCopyCode(rawCode)}
				>
					<CopySvg className="mb-px mr-xs-3 h-xs-4 w-xs-4" />
					{t('core.action.copyCode')}
				</Button>
			</MemoryRouter>
		)
	}

	const onClickCopyCode = (rawCode: string) => {
		navigator.clipboard.writeText(rawCode)
	}

	const html = useMemo(() => {
		const unparsed = text.replace(/\n/g, '  \n') // Fix new lines for markdown
		const parsed = marked.parse(unparsed, { async: false })
		return DOMPurify.sanitize(parsed, { ADD_ATTR: ['target'] })
	}, [text])

	return (
		<div
			ref={injectComponents}
			className={cx('ds-markdown', className)}
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	)
}
