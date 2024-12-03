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
	const { previewSource, openCodePreview, openUrlPreview } = useAiChatPreview()
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

	useEffect(() => {
		subchatId ? loadSubchat() : resetActiveSubchat()
	}, [activeChat, subchatId])

	useEffect(() => {
		if (allSubchatsPagination.page) {
			allSubchats.length ? onShowPanel() : onHidePanel()
		} else {
			!activeChat && onHidePanel()
		}
	}, [allSubchats, allSubchatsPagination])

	useEffect(() => {
		if (previewSource === AiChatPreviewSource.NONE) {
			!allSubchats.length && !activeSubchat && !subchatId && onHidePanel()
		} else {
			onShowPanel()
		}

		previewSource === AiChatPreviewSource.CHAT
			? wait(300).then(() => setIsViewVisible(false))
			: setIsViewVisible(true)
	}, [previewSource])

	return (
		<div className="relative h-full">
			<div className={cx('relative h-full', !isViewVisible && 'invisible')}>
				{!activeChat ? null : activeSubchat ? (
					<SubchatView openCodePreview={openCodePreview} openUrlPreview={openUrlPreview} />
				) : chatLoading === 'full' || allSubchatsLoading === 'full' ? (
					<PanelBase>
						<LoadingText text={t('aiChat.state.loadingSubchats')} className="flex-center h-full" />
					</PanelBase>
				) : !allSubchats.length && !subchatLoading ? (
					<PanelBase>
						<div className="flex-center h-full w-full text-color-text-subtle">{t('aiChat.label.noSubchats')}</div>
					</PanelBase>
				) : (
					<SubchatsView />
				)}
			</div>

			<PreviewView />
		</div>
	)
}
