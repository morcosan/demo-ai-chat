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
	const { $spacing, isUiDark } = useUiTheme()

	const hljsCSS = isUiDark ? hljsCssDark : hljsCssLight

	const cssMarkdown: CSS = {
		'pre + *': {
			marginTop: $spacing['xs-9'],
		},
	}

	const codeClass = cx(
		'my-xs-2 block overflow-x-auto px-xs-6 py-xs-5',
		'rounded-sm border border-color-border-subtle bg-color-bg-coding'
	)

	const langFn = (lang: string) => (hljs.getLanguage(lang) ? lang : 'plaintext')

	const marked = new Marked(
		markedHighlight({
			emptyLangClass: codeClass,
			langPrefix: `${codeClass} lang-`,
			highlight: (code: string, lang: string) => hljs.highlight(code, { language: langFn(lang) }).value,
		})
	)
	const html = useMemo(() => marked.parse(text), [text, isUiDark])

	return (
		<>
			<style>{hljsCSS}</style>

			<div className={className} css={cssMarkdown} dangerouslySetInnerHTML={{ __html: html }} />
		</>
	)
}
