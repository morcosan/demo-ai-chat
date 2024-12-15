import { MarkdownCode } from '@app/library/release'
import { Button, IconButton, NewTabSvg, ReloadSvg } from '@ds/release'
import { MARKDOWN_REGEX } from '@utils/release'
import { IframeHTMLAttributes, useEffect, useState } from 'react'
import { PanelBase } from '../../../components/panel-base'
import { AiChatPreviewSource, AiChatView, useAiChatLayout, useAiChatPreview } from '../../../state'

const RESULT_LANGUAGES = ['html', 'xhtml', 'svg']

interface Props extends ReactProps {
	isChatView?: boolean
}

export const PreviewView = ({ isChatView }: Props) => {
	const { activeView } = useAiChatLayout()
	const { previewUrl, previewMarkdown, previewSource, closePreview } = useAiChatPreview()
	const [isVisible, setIsVisible] = useState(false)
	const [iframeKey, setIframeKey] = useState(0)
	const [showsResult, setShowsResult] = useState(false)

	const codeMatch = previewMarkdown?.trim().match(MARKDOWN_REGEX) || []
	const codeLang = (codeMatch[1] || '').split(' ')[0]
	const codeSrc = codeMatch[2] || ''

	const isUrl = Boolean(previewUrl)
	const isCode = Boolean(previewMarkdown)
	const isSourceChat = previewSource === AiChatPreviewSource.CHAT
	const isSourceSubchat = previewSource === AiChatPreviewSource.SUBCHAT
	const isValidView = Boolean(
		activeView === AiChatView.DESKTOP ? (isChatView ? isSourceSubchat : isSourceChat) : isChatView
	)

	const showsPreview = Boolean(isUrl || isCode) && isValidView
	const showsCodeResult = isCode && RESULT_LANGUAGES.includes(codeLang)
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

	useEffect(() => {
		setShowsResult(false)
	}, [previewMarkdown])

	useEffect(() => {
		showsPreview ? setIsVisible(true) : wait(300).then(() => setIsVisible(false))
	}, [showsPreview])

	return (
		<div
			className={cx(
				activeView === AiChatView.DESKTOP ? 'absolute-overlay' : 'fixed-overlay',
				'z-modal overflow-hidden pt-button-h-xs',
				!isVisible && 'invisible'
			)}
		>
			{/* OVERLAY */}
			<div className={cx('absolute-overlay z-[-1] backdrop-blur-subtle')} onClick={closePreview} />

			<PanelBase
				className={cx(
					'border-t border-color-border-shadow shadow-lg',
					'transition-transform duration-300 ease-in-out',
					showsPreview ? 'translate-y-0' : 'pointer-events-none translate-y-full'
				)}
				slotToolbar={<span className="px-xs-3">{title}</span>}
				isChatView={isChatView}
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
								srcDoc={codeSrc || ''}
								sandbox="allow-scripts allow-same-origin allow-downloads allow-presentation"
							/>
						) : (
							<div className="ds-markdown mb-xs-2 min-h-0 flex-1">
								<MarkdownCode markdown={previewMarkdown!} fullHeight noCollapse noPreview />
							</div>
						))}
				</div>
			</PanelBase>
		</div>
	)
}
