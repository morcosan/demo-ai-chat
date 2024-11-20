import { useUiTheme } from '@ds/src/systems/ui-theme'
import hljs from 'highlight.js'
import hljsCssDark from 'highlight.js/styles/a11y-dark.css?raw'
import hljsCssLight from 'highlight.js/styles/a11y-light.css?raw'
import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import { useMemo } from 'react'

interface Props extends ReactProps {
	text: string
}

export const MarkdownText = ({ text, className }: Props) => {
	const { $color, $fontSize, $fontWeight, $radius, $spacing, isUiDark } = useUiTheme()

	const hljsCSS = isUiDark ? hljsCssDark : hljsCssLight

	const cssMarkdown: CSS = {
		'pre > code': {
			display: 'block',
			overflowX: 'auto',
			margin: `${$spacing['xs-1']} -1px`,
			padding: `${$spacing['xs-5']} ${$spacing['xs-6']}`,
			border: `1px solid ${$color['border-subtle']}`,
			borderRadius: $radius['sm'],
			backgroundColor: $color['bg-coding'],
		},
		'pre + *': { marginTop: `${$spacing['sm-0']} !important` },

		'*:not(pre) > code': {
			width: 'fit-content',
			padding: '3px 6px',
			borderRadius: $radius['xs'],
			backgroundColor: $color['bg-coding'],
			color: $color['text-coding'],
			fontSize: $fontSize['sm'],
			fontWeight: $fontWeight['md'],
			whiteSpace: 'nowrap',
		},

		'ul, ol': {
			display: 'flex',
			flexDirection: 'column',
			gap: $spacing['xs-1'],
			margin: `${$spacing['xs-2']} 0 ${$spacing['xs-1']}`,
			paddingLeft: $spacing['sm-1'],

			'& p': { margin: 0 },
		},
		ul: { listStyle: 'disc' },
		ol: { listStyle: 'auto' },
		'ul + *, ol + *': { marginTop: `${$spacing['sm-0']} !important` },

		p: { marginTop: $spacing['xs-4'] },
		'p:only-child': { margin: `calc(-1 * ${$spacing['xs-1']}) 0` },

		strong: { fontWeight: $fontWeight['xl'] },
	}

	const langFn = (lang: string) => (hljs.getLanguage(lang) ? lang : 'plaintext')

	const marked = new Marked(
		markedHighlight({
			langPrefix: 'lang-',
			highlight: (code: string, lang: string) => hljs.highlight(code, { language: langFn(lang) }).value,
		})
	)
	const html = useMemo(() => marked.parse(text), [text, isUiDark])

	return (
		<>
			<style>{hljsCSS}</style>

			<div className={className} css={cssMarkdown}>
				{text}
			</div>
			{/*<div className={className} css={cssMarkdown} dangerouslySetInnerHTML={{ __html: html }} />*/}
		</>
	)
}
