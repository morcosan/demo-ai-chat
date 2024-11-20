import { NewTabSvg } from '@ds/release'
import { useUiTheme } from '@ds/src/systems/ui-theme'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js'
import hljsCssDark from 'highlight.js/styles/a11y-dark.css?raw'
import hljsCssLight from 'highlight.js/styles/a11y-light.css?raw'
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
	const { $color, $fontSize, $fontWeight, $radius, $spacing, $shadow, isUiDark } = useUiTheme()

	const hljsCSS = isUiDark ? hljsCssDark : hljsCssLight

	const cssMarkdown: CSS = {
		pre: {
			margin: `${$spacing['xs-0']} -1px`,
		},
		'pre > code': {
			display: 'block',
			overflowX: 'auto',
			padding: `${$spacing['xs-5']} ${$spacing['xs-6']}`,
			border: `1px solid ${$color['border-default']}`,
			borderRadius: $radius['sm'],
			backgroundColor: $color['bg-coding'],
			boxShadow: $shadow['xs'],
		},
		'pre + *, * + pre': { marginTop: `${$spacing['sm-0']} !important` },

		'*:not(pre) > code': {
			margin: '0 2px 0 1px',
			width: 'fit-content',
			padding: '3px 6px',
			borderRadius: $radius['xs'],
			backgroundColor: $color['bg-coding'],
			color: $color['text-coding'],
			fontSize: $fontSize['sm'],
			fontWeight: $fontWeight['md'],
			whiteSpace: 'nowrap',
			boxShadow: $shadow['xs'],
		},

		'ul, ol': {
			display: 'flex',
			flexDirection: 'column',
			gap: $spacing['xs-1'],
			margin: `${$spacing['xs-2']} 0 ${$spacing['xs-1']}`,
			paddingLeft: $spacing['sm-1'],

			'& p': { margin: 0 },

			'&:only-child': {
				paddingLeft: $spacing['xs-8'],
			},
		},
		ul: { listStyle: 'disc' },
		ol: { listStyle: 'auto' },
		'ul + *, ol + *': { marginTop: `${$spacing['sm-0']} !important` },

		'p:not(:first-child)': { marginTop: $spacing['xs-4'] },

		'& > *:not(pre):only-child': { margin: `calc(-1 * ${$spacing['xs-1']}) 0` },

		'h1, h2, h3, h4, h5, h6': {
			margin: `${$spacing['xs-4']} 0 ${$spacing['xs-1']}`,
			fontSize: $fontSize['lg'],
			fontWeight: $fontWeight['lg'],

			'&:first-child': { marginTop: 0 },
		},
		h1: {
			marginTop: $spacing['xs-9'],
			fontSize: $fontSize['xxl'],
		},
		h2: {
			marginTop: $spacing['xs-7'],
			fontSize: $fontSize['xl'],
		},
		h3: {
			marginTop: $spacing['xs-6'],
		},

		strong: { fontWeight: $fontWeight['xl'] },
	}

	const highlightFn = (code: string, lang: string) => {
		return hljs.highlight(code, { language: hljs.getLanguage(lang) ? lang : 'plaintext' }).value
	}

	// https://marked.js.org
	const renderer = new Renderer()
	renderer.link = ({ href, text }: Tokens.Link) => {
		return renderToStaticMarkup(
			<a href={href} target="_blank" rel="noopener noreferrer" className="ds-link">
				{text}
				<NewTabSvg className="ml-xs-2 inline-block h-xs-4 w-xs-4 align-baseline" />
			</a>
		)
	}
	const marked = new Marked(markedHighlight({ langPrefix: 'lang-', highlight: highlightFn }))
	marked.setOptions({ renderer })
	marked.use({ extensions: [ESCAPE_HTML] })

	const html = useMemo(() => {
		const parsed = marked.parse(text, { async: false })
		return DOMPurify.sanitize(parsed, { ADD_ATTR: ['target'] })
	}, [text])

	return (
		<>
			<style>{hljsCSS}</style>

			<div className={className} css={cssMarkdown} dangerouslySetInnerHTML={{ __html: html }} />
		</>
	)
}
