import { CopyButton } from '@app/library/release'
import { Button, IconButton, NewTabSvg, ReloadSvg } from '@ds/release'
import hljs from 'highlight.js'
import { useEffect, useMemo, useState } from 'react'
import { PanelBase } from '../../../components/panel-base'
import { AiChatPreviewSource, useAiChatPreview } from '../../../state'

interface Props extends ReactProps {
	isChatView?: boolean
}

export const PreviewView = ({ isChatView }: Props) => {
	const { previewUrl, previewCode, previewLang, previewSource } = useAiChatPreview()
	const [isVisible, setIsVisible] = useState(false)
	const [iframeKey, setIframeKey] = useState(0)
	const [showsResult, setShowsResult] = useState(false)

	const isUrl = Boolean(previewUrl)
	const isCode = Boolean(previewCode && previewLang)
	const isSourceChat = previewSource === AiChatPreviewSource.CHAT
	const isSourceSubchat = previewSource === AiChatPreviewSource.SUBCHAT
	const isValidView = Boolean(isChatView ? isSourceSubchat : isSourceChat)
	const showsPreview = Boolean(isUrl || isCode) && isValidView

	const title = (() => {
		if (isUrl) return t('aiChat.label.urlPreview')
		if (isCode) return t('aiChat.label.codePreview')
		return ''
	})()

	const codeHtml = useMemo(
		() => (previewCode && previewLang ? hljs.highlight(previewCode, { language: previewLang }).value : ''),
		[previewCode]
	)

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
				containerClass="!pb-xs-4"
				isPreview
			>
				{Boolean(isUrl) && (
					<>
						{/* URL TOOLBAR */}
						<div className="my-a11y-padding flex h-button-h-sm items-center">
							<IconButton
								tooltip={t('core.action.reload')}
								size="sm"
								onClick={() => setIframeKey((key: number) => key + 1)}
							>
								<ReloadSvg className="w-xs-6" />
							</IconButton>

							<a
								href={previewUrl || ''}
								target="_blank"
								rel="noopener noreferrer"
								className="ds-link ml-xs-0 flex max-w-full items-center truncate"
							>
								<span className="block w-full truncate break-words text-size-sm">{previewUrl}</span>
								<NewTabSvg className="ml-xs-2 mt-px h-xs-5 w-xs-5" />
							</a>
						</div>

						{/* URL CONTENT */}
						<iframe
							key={iframeKey}
							src={previewUrl || ''}
							referrerPolicy="no-referrer"
							sandbox="allow-scripts allow-same-origin allow-forms"
							className="w-full flex-1 rounded-sm border border-color-border-default bg-color-white"
						/>
					</>
				)}

				{Boolean(isCode) && (
					<>
						{/* CODE TOOLBAR */}
						<div className="my-a11y-padding flex h-button-h-sm items-center">
							<div role="group" className="flex gap-xs-0 px-xs-3">
								<Button
									variant={showsResult ? 'ghost-secondary' : 'solid-secondary'}
									size="xs"
									onClick={() => setShowsResult(false)}
								>
									{t('core.label.code')}
								</Button>
								<Button
									variant={showsResult ? 'solid-secondary' : 'ghost-secondary'}
									size="xs"
									onClick={() => setShowsResult(true)}
								>
									{t('core.label.result')}
								</Button>
							</div>

							<IconButton
								tooltip={t('core.action.reload')}
								size="sm"
								onClick={() => setIframeKey((key: number) => key + 1)}
							>
								<ReloadSvg className="w-xs-6" />
							</IconButton>
						</div>

						{/* CODE CONTENT */}
						{showsResult ? (
							<iframe
								key={iframeKey}
								src={previewUrl || ''}
								referrerPolicy="no-referrer"
								sandbox="allow-scripts allow-same-origin allow-forms"
								className="w-full flex-1 rounded-sm border border-color-border-default bg-color-white"
							/>
						) : (
							<div className="ds-markdown min-h-0 flex-1">
								<pre className="h-full">
									<div>
										{previewLang}
										<div>
											<CopyButton
												variant="text-default"
												tooltip={t('aiChat.action.copyCode')}
												text={previewCode || ''}
											/>
										</div>
									</div>
									<code dangerouslySetInnerHTML={{ __html: codeHtml }} className="h-full" />
								</pre>
							</div>
						)}
					</>
				)}
			</PanelBase>
		</div>
	)
}
