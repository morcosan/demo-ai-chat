import { IconButton, NewTabSvg, ReloadSvg } from '@ds/release'
import { PanelBase } from '../../components/panel-base'
import { AiChatPreviewSource, AiChatPreviewType, useAiChatPreview } from '../../state'

interface Props extends ReactProps {
	isChatView?: boolean
}

export const PreviewView = ({ isChatView, className }: Props) => {
	const { previewContent, previewSource, previewType } = useAiChatPreview()

	const isSourceChat = previewSource === AiChatPreviewSource.CHAT
	const isSourceSubchat = previewSource === AiChatPreviewSource.SUBCHAT
	const isVisible = Boolean(previewContent && (isChatView ? isSourceSubchat : isSourceChat))

	const isUrl = previewType === AiChatPreviewType.URL
	const isCode = previewType === AiChatPreviewType.CODE

	const title = (() => {
		if (isUrl) return t('aiChat.label.urlPreview')
		if (isCode) return t('aiChat.label.codePreview')
		return ''
	})()

	return (
		<div
			className={cx(
				'absolute-overlay z-sticky bg-color-bg-page',
				'transition-opacity duration-200 ease-in',
				!isVisible && 'pointer-events-none opacity-0',
				className
			)}
		>
			<PanelBase slotToolbar={<span className="px-xs-3">{title}</span>} isChatView={isChatView} isPreview>
				{isUrl ? (
					<div className="flex h-full flex-col pb-xs-2">
						{/* URL TOOLBAR */}
						<div className="my-xs-0 flex h-button-h-sm items-center">
							<IconButton tooltip={t('aiChat.action.reloadPreview')} size="sm">
								<ReloadSvg className="w-xs-6" />
							</IconButton>

							<a
								href={previewContent || ''}
								target="_blank"
								rel="noopener noreferrer"
								className="ds-link ml-xs-0 flex max-w-full items-center truncate"
							>
								<span className="block w-full truncate break-words text-size-sm">{previewContent}</span>
								<NewTabSvg className="ml-xs-2 mt-px h-xs-5 w-xs-5" />
							</a>
						</div>

						<iframe
							src={previewContent || ''}
							referrerPolicy="no-referrer"
							sandbox="allow-scripts allow-same-origin allow-forms"
							className="w-full flex-1 rounded-sm border border-color-border-default bg-color-white"
						/>
					</div>
				) : (
					''
				)}
			</PanelBase>
		</div>
	)
}
