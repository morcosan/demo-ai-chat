import { NewTabSvg } from '@ds/release'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js'
import { Marked, Renderer, TokenizerExtension, Tokens } from 'marked'
import { markedHighlight } from 'marked-highlight'
import { useMemo, useRef } from 'react'
import { createRoot, Root } from 'react-dom/client'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { MarkdownCode } from './markdown-code'

interface CodeData {
	html: string
	raw: string
	lang?: string
}

interface Props extends ReactProps {
	text: string
	onPreviewCode?(code: string, lang: string): void
	onPreviewUrl?(url: string): void
}

export const Markdown = (props: Props) => {
	const { text, className, onPreviewCode, onPreviewUrl } = props
	const codeDataRefs = useRef<CodeData[]>([])
	const codeRootRefs = useRef(new WeakMap<Element, Root>())
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
		codeDataRefs.current.push({ html: text, lang, raw })
		return renderToStaticMarkup(<div data-code-block="" className="ds-markdown-wrapper" />)
	}

	const injectCodeActions = (container: HTMLDivElement) => {
		const elems = container.querySelectorAll('[data-code-block]')
		elems?.forEach((elem: Element, index: number) => {
			const data = codeDataRefs.current[index]
			const root = codeRootRefs.current.get(elem) || createRoot(elem)
			codeRootRefs.current.set(elem, root)
			root.render(
				// Button component requires a router context
				<MemoryRouter>
					<MarkdownCode html={data.html} lang={data.lang} raw={data.raw} onPreviewCode={onPreviewCode} />
				</MemoryRouter>
			)
		})
	}

	const injectLinkActions = (container: HTMLDivElement) => {
		const elems = container.querySelectorAll('a')
		elems?.forEach((elem: Element) => {
			elem.addEventListener('click', (event: Event) => {
				const mouseEvent = event as MouseEvent
				const target = event.target as HTMLAnchorElement
				// Capture only left-click
				if (onPreviewUrl && mouseEvent.button === 0) {
					event.preventDefault()
					onPreviewUrl(target.href)
				}
			})
		})
	}

	const injectListStart = (container: HTMLDivElement) => {
		const elems = container.querySelectorAll('ol[start]') as NodeListOf<HTMLElement>
		elems?.forEach((elem: HTMLElement) => {
			const start = parseInt(elem.getAttribute('start') || '')
			!isNaN(start) && elem.style.setProperty('--start', String(start - 1))
		})
	}

	const injectActions = (container: HTMLDivElement | null) => {
		if (!container) return
		injectCodeActions(container)
		injectLinkActions(container)
		injectListStart(container)
	}

	const languageFn = (lang: string) => ({ language: hljs.getLanguage(lang) ? lang : 'plaintext' })
	const highlightFn = (code: string, lang: string) => hljs.highlight(code, languageFn(lang)).value

	const marked = new Marked(markedHighlight({ highlight: highlightFn }))
	marked.setOptions({ renderer })
	marked.use({ extensions: [ESCAPE_HTML] })

	const html = useMemo(() => {
		codeDataRefs.current = []

		const unparsed = text.replace(/\n/g, '  \n') // Fix new lines for markdown
		const parsed = marked.parse(unparsed, { async: false })

		return DOMPurify.sanitize(parsed, { ADD_ATTR: ['target'] })
	}, [text])

	return (
		<div ref={injectActions} className={cx('ds-markdown', className)} dangerouslySetInnerHTML={{ __html: html }} />
	)
}

// Escape all html tags
const ESCAPE_HTML: TokenizerExtension = {
	name: 'ESCAPE_HTML',
	level: 'block',
	start: (src: string) => src.indexOf('<'),
	tokenizer: (src: string) => {
		const rule = /^<[^>]*(?:>|$)/ // Match HTML tags
		const match = rule.exec(src)
		if (match) return { type: 'text', raw: match[0], text: match[0] }
	},
}
