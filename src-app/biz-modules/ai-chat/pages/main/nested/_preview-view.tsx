import { MarkdownCode } from '@app/library/release'
import { Button, IconButton, NewTabSvg, ReloadSvg } from '@ds/release'
import { formatCode } from '@utils/release'
import hljs from 'highlight.js'
import { IframeHTMLAttributes, useEffect, useState } from 'react'
import { PanelBase } from '../../../components/panel-base'
import { AiChatPreviewSource, useAiChatPreview } from '../../../state'

const RESULT_LANGUAGES = ['html', 'xhtml', 'svg']

interface Props extends ReactProps {
	isChatView?: boolean
}

export const PreviewView = ({ isChatView }: Props) => {
	const { previewUrl, previewCode, previewLang, previewSource } = useAiChatPreview()
	const [isVisible, setIsVisible] = useState(false)
	const [iframeKey, setIframeKey] = useState(0)
	const [showsResult, setShowsResult] = useState(false)
	const [codeHtml, setCodeHtml] = useState('')
	const [codeError, setCodeError] = useState('')

	const isUrl = Boolean(previewUrl)
	const isCode = Boolean(previewCode && previewLang)
	const isSourceChat = previewSource === AiChatPreviewSource.CHAT
	const isSourceSubchat = previewSource === AiChatPreviewSource.SUBCHAT
	const isValidView = Boolean(isChatView ? isSourceSubchat : isSourceChat)

	const showsPreview = Boolean(isUrl || isCode) && isValidView
	const showsCodeResult = isCode && RESULT_LANGUAGES.includes(previewLang || '')
	const showsToolbar = isUrl || (isCode && showsCodeResult)
	const showsReload = isUrl || (isCode && showsResult)

	const title = (() => {
		if (isUrl) return t('aiChat.label.urlPreview')
		if (isCode) return t('aiChat.label.codePreview')
		return ''
	})()

	const iframeProps: IframeHTMLAttributes<HTMLIFrameElement> = {
		loading: 'lazy',
		referrerPolicy: 'no-referrer',
		className: cx('mb-xs-2 w-full flex-1 rounded-sm border border-color-border-default bg-color-white'),
	}

	const updateCodeHtml = async () => {
		if (!previewCode || !previewLang) return setCodeHtml('')

		const format = await formatCode(previewCode, previewLang)
		const lang = hljs.getLanguage(previewLang) ? previewLang : 'plaintext'
		const html = hljs.highlight(format.code, { language: lang }).value

		setCodeHtml(html)
		setCodeError(format.error ? String(format.error) : '')
	}

	useEffect(() => {
		setShowsResult(false)
		updateCodeHtml()
	}, [previewCode, previewLang])

	useEffect(() => {
		showsPreview ? setIsVisible(true) : wait(200).then(() => setIsVisible(false))
	}, [showsPreview])

	return (
		<div
			className={cx(
				'absolute-overlay z-sticky bg-color-bg-page',
				'transition-opacity duration-200 ease-in',
				!showsPreview && 'pointer-events-none opacity-0',
				!isVisible && 'invisible'
			)}
		>
			<PanelBase
				slotToolbar={<span className="px-xs-3">{title}</span>}
				isChatView={isChatView}
				containerClass=""
				isPreview
			>
				<div className="mb-xs-1 mt-a11y-padding flex min-h-0 flex-1 flex-col">
					{/* TOOLBAR */}
					{Boolean(showsToolbar) && (
						<div className="my-a11y-padding flex h-button-h-sm items-center">
							{/* CODE/RESULT  */}
							{Boolean(isCode) && (
								<div role="group" className="flex gap-xs-0 px-xs-3">
									<Button
										variant={showsResult ? 'text-default' : 'solid-secondary'}
										highlight={showsResult ? 'default' : 'selected'}
										size="xs"
										onClick={() => setShowsResult(false)}
									>
										{t('core.label.code')}
									</Button>
									<Button
										variant={showsResult ? 'solid-secondary' : 'text-default'}
										highlight={showsResult ? 'selected' : 'default'}
										size="xs"
										onClick={() => setShowsResult(true)}
									>
										{t('core.label.result')}
									</Button>
								</div>
							)}

							{/* RELOAD */}
							{Boolean(showsReload) && (
								<IconButton
									tooltip={t('core.action.reload')}
									size="sm"
									onClick={() => setIframeKey((key: number) => key + 1)}
								>
									<ReloadSvg className="w-xs-6" />
								</IconButton>
							)}

							{/* URL */}
							{Boolean(isUrl) && (
								<a
									href={previewUrl || ''}
									target="_blank"
									rel="noopener noreferrer"
									className="ds-link ml-xs-0 flex max-w-full items-center truncate"
								>
									<span className="block w-full truncate break-words text-size-sm">{previewUrl}</span>
									<NewTabSvg className="ml-xs-2 mt-px h-xs-5 w-xs-5" />
								</a>
							)}
						</div>
					)}

					{/* URL CONTENT */}
					{Boolean(isUrl) && <iframe {...iframeProps} key={iframeKey} src={previewUrl || ''} />}

					{/* CODE CONTENT */}
					{Boolean(isCode) &&
						(showsResult ? (
							<iframe
								{...iframeProps}
								key={iframeKey}
								srcDoc={previewCode || ''}
								sandbox="allow-scripts allow-same-origin allow-downloads allow-presentation"
							/>
						) : (
							<div className="ds-markdown mb-xs-2 min-h-0 flex-1">
								<MarkdownCode
									html={codeHtml}
									raw={previewCode!}
									lang={previewLang!}
									error={codeError}
									fullHeight
									noCollapse
									noPreview
								/>
							</div>
						))}
				</div>
			</PanelBase>
		</div>
	)
}
