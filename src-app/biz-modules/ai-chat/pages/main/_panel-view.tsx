import { LoadingText } from '@app/library/release'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { PanelBase } from '../../components/panel-base'
import { AiChatPreviewSource, useAiChat, useAiChatPreview } from '../../state'
import { PreviewView } from './nested/_preview-view'
import { SubchatView } from './nested/_subchat-view'
import { SubchatsView } from './nested/_subchats-view'

interface Props {
	onShowPanel(): void
	onHidePanel(): void
}

export const PanelView = (props: Props) => {
	const { onShowPanel, onHidePanel } = props
	const {
		activeChat,
		activeSubchat,
		allSubchats,
		allSubchatsLoading,
		allSubchatsPagination,
		chatLoading,
		subchatLoading,
		loadActiveSubchat,
		resetActiveSubchat,
	} = useAiChat()
	const { hasPreview, previewSource, openCodePreview, openUrlPreview } = useAiChatPreview()
	const [isViewVisible, setIsViewVisible] = useState(true)
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()

	const subchatId = parseInt(String(searchParams.get('subchat')))

	const resetSubchatUrl = () => {
		searchParams.delete('subchat')
		navigate({ search: searchParams.toString() }, { replace: true })
	}

	const loadSubchat = async () => {
		const success = await loadActiveSubchat(subchatId)
		if (success === false) {
			resetSubchatUrl()
		}
	}

	const hidePanel = () => !hasPreview && onHidePanel()

	const onPreviewCode = (markdown: string) => openCodePreview(markdown, AiChatPreviewSource.SUBCHAT)
	const onPreviewUrl = (url: string) => openUrlPreview(url, AiChatPreviewSource.SUBCHAT)

	useEffect(() => {
		subchatId ? loadSubchat() : resetActiveSubchat()
	}, [activeChat, subchatId])

	useEffect(() => {
		if (allSubchatsPagination.page && subchatLoading !== 'error') {
			allSubchats.length ? onShowPanel() : hidePanel()
		} else {
			!activeChat && hidePanel()
		}
	}, [allSubchats, allSubchatsPagination])

	useEffect(() => {
		if (previewSource === AiChatPreviewSource.NONE) {
			!allSubchats.length && !activeSubchat && !subchatId && hidePanel()
		} else {
			onShowPanel()
		}

		previewSource === AiChatPreviewSource.CHAT
			? wait(300).then(() => setIsViewVisible(false))
			: setIsViewVisible(true)
	}, [previewSource])

	return (
		<div className="relative h-full">
			<div className="relative h-full">
				{!activeChat ? null : activeSubchat ? (
					<SubchatView noContent={!isViewVisible} onPreviewCode={onPreviewCode} onPreviewUrl={onPreviewUrl} />
				) : chatLoading === 'full' || allSubchatsLoading === 'full' ? (
					<PanelBase noContent={!isViewVisible}>
						<LoadingText text={t('aiChat.state.loadingSubchats')} className="flex-center h-full" />
					</PanelBase>
				) : !allSubchats.length && !subchatLoading ? (
					<PanelBase noContent={!isViewVisible}>
						<div className="flex-center h-full w-full text-color-text-subtle">{t('aiChat.label.noSubchats')}</div>
					</PanelBase>
				) : (
					<SubchatsView noContent={!isViewVisible} />
				)}
			</div>

			<PreviewView />
		</div>
	)
}
