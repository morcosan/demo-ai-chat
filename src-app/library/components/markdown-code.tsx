import { CopyButton } from '@app/library/release'
import { Button, ChevronDownSvg, ChevronUpSvg, DownloadSvg, PreviewSvg } from '@ds/release'
import { formatCode, MARKDOWN_REGEX } from '@utils/release'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js'
import { useEffect, useState } from 'react'

interface Props extends ReactProps {
	markdown: string
	markdownHtml?: string
	fullHeight?: boolean
	noCollapse?: boolean
	noDownload?: boolean
	noPreview?: boolean
	onPreviewCode?(markdown: string): void
}

export const MarkdownCode = (props: Props) => {
	const { markdown, markdownHtml, fullHeight, noCollapse, noDownload, noPreview, onPreviewCode } = props
	const [collapsed, setCollapsed] = useState(true)
	const [codeText, setCodeText] = useState('')
	const [codeHtml, setCodeHtml] = useState('')
	const [codeLang, setCodeLang] = useState('')
	const [codeFile, setCodeFile] = useState('')
	const [codeError, setCodeError] = useState('')

	const MIN_ROWS = 20
	const canCollapse = !noCollapse && codeText.split('\n').length > MIN_ROWS

	const onClickDownload = () => {
		const blob = new Blob([codeText], { type: 'text/plain' })
		const url = URL.createObjectURL(blob)
		const link = document.createElement('a')
		link.href = url
		link.download = codeFile
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
		URL.revokeObjectURL(url)
	}

	const computeCode = async () => {
		const text = markdown.trim()
		const match = text.match(MARKDOWN_REGEX)
		let code = text
		let lang = 'text'
		let file = 'untitled.txt'

		if (match && match.length === 3) {
			const parts = match[1].trim().split(' ')
			code = match[2].trim()
			lang = parts[0] || lang
			file = parts[1] || file
		}

		if (markdownHtml) {
			setCodeHtml(markdownHtml)
			setCodeError('')
		} else {
			const format = await formatCode(code, lang)
			const html = hljs.highlight(format.code, { language: hljs.getLanguage(lang) ? lang : 'text' }).value
			setCodeHtml(DOMPurify.sanitize(html))
			setCodeError(String(format.error || ''))
		}

		setCodeText(code)
		setCodeLang(lang)
		setCodeFile(file)
	}

	useEffect(() => {
		computeCode()
	}, [markdown, markdownHtml])

	return (
		<pre className={cx(fullHeight && 'flex h-full min-h-0 flex-col')}>
			<div className="ds-markdown-toolbar">
				{codeLang}

				<div className="ds-markdown-actions">
					<CopyButton variant="text-default" tooltip={t('aiChat.action.copyCode')} text={codeText} />

					{!noPreview && (
						<Button
							tooltip={t('aiChat.action.previewCode')}
							variant="text-default"
							size="xs"
							onClick={() => onPreviewCode?.(markdown)}
						>
							<PreviewSvg className="mr-xs-2 h-xs-6 w-xs-6" />
							<span className="leading-1">{t('core.action.preview')}</span>
						</Button>
					)}

					{!noDownload && (
						<Button
							linkHref={'file://' + codeFile}
							linkType="inactive"
							tooltip={t('aiChat.action.downloadCode')}
							variant="text-default"
							size="xs"
							onClick={onClickDownload}
						>
							<DownloadSvg className="mr-xs-2 h-xs-6 w-xs-6" />
							<span className="leading-1">{t('core.action.download')}</span>
						</Button>
					)}
				</div>
			</div>

			<code
				dangerouslySetInnerHTML={{ __html: codeHtml }}
				role="region"
				tabIndex={0}
				aria-label={t('core.label.code') + `/${codeLang}`}
				className={cx(
					canCollapse && '!pb-sm-2',
					canCollapse && collapsed && 'max-h-xl-0 select-none !overflow-hidden',
					fullHeight && 'min-h-0 flex-1'
				)}
			/>

			{Boolean(codeError) && (
				<div
					className={cx(
						'max-h-lg-0 overflow-y-auto border-t border-color-border-default px-xs-6 py-xs-2',
						'bg-color-danger-card-bg text-size-xs text-color-danger-card-text'
					)}
				>
					{codeError}
				</div>
			)}

			{Boolean(canCollapse) && (
				<div
					className={cx(
						'flex items-end justify-center rounded-sm',
						collapsed
							? 'absolute-overlay pb-scrollbar-h'
							: 'absolute bottom-scrollbar-h left-1/2 -translate-x-1/2',
						collapsed && 'bg-gradient-to-b from-color-transparent to-color-bg-card'
					)}
				>
					<Button variant="text-default" size="xs" onClick={() => setCollapsed((value) => !value)}>
						{collapsed ? (
							<>
								<ChevronDownSvg className="mr-xs-2 h-xs-4 w-xs-4" />
								<span className="leading-1">{t('core.action.expand')}</span>
							</>
						) : (
							<>
								<ChevronUpSvg className="mr-xs-2 h-xs-4 w-xs-4" />
								<span className="leading-1">{t('core.action.collapse')}</span>
							</>
						)}
					</Button>
				</div>
			)}
		</pre>
	)
}
