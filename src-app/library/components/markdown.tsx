import { NewTabSvg } from '@ds/release'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js'
import { Marked, Renderer, TokenizerExtension, Tokens } from 'marked'
import { markedHighlight } from 'marked-highlight'
import { useMemo, useRef } from 'react'
import { createRoot, Root } from 'react-dom/client'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { CopyButton } from './copy-button'

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
	const rawCodeRefs = useRef<string[]>([])
	const rootRefs = useRef(new WeakMap<Element, Root>())

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
		rawCodeRefs.current.push(raw)

		return renderToStaticMarkup(
			<pre>
				<div>
					{lang || 'plaintext'}
					<div data-code-actions="" />
				</div>
				<code dangerouslySetInnerHTML={{ __html: text }} />
			</pre>
		)
	}

	const languageFn = (lang: string) => ({ language: hljs.getLanguage(lang) ? lang : 'plaintext' })
	const highlightFn = (code: string, lang: string) => hljs.highlight(code, languageFn(lang)).value

	const marked = new Marked(markedHighlight({ highlight: highlightFn }))
	marked.setOptions({ renderer })
	marked.use({ extensions: [ESCAPE_HTML] })

	const html = useMemo(() => {
		rawCodeRefs.current = []

		const unparsed = text.replace(/\n/g, '  \n') // Fix new lines for markdown
		const parsed = marked.parse(unparsed, { async: false })

		return DOMPurify.sanitize(parsed, { ADD_ATTR: ['target'] })
	}, [text])

	const injectCodeActions = (container: HTMLDivElement) => {
		const elems = container?.querySelectorAll('[data-code-actions]')
		elems?.forEach((elem: Element, index: number) => {
			const regex = /```(?:\w+)?\s([\s\S]*?)```/
			const raw = rawCodeRefs.current[index]
			const code = raw.startsWith('```') ? raw.match(regex)?.[1].trim() || '' : raw

			const root = rootRefs.current.get(elem) || createRoot(elem)
			root.render(
				// Button component requires a router context
				<MemoryRouter>
					<CopyButton variant="text-default" text={code} className="-mr-button-px-xs" />
				</MemoryRouter>
			)
			rootRefs.current.set(elem, root)
		})
	}

	return (
		<div
			ref={injectCodeActions}
			className={cx('ds-markdown', className)}
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	)
}
