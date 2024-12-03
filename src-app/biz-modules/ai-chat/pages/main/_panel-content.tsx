import { LoadingText } from '@app/library/release'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { PanelBase } from '../../components/panel-base'
import { useAiChat } from '../../state'
import { PreviewView } from './_preview-view'
import { SubchatView } from './_subchat-view'
import { SubchatsView } from './_subchats-view'

interface Props {
	onShowPanel(): void
	onHidePanel(): void
}

export const PanelContent = (props: Props) => {
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

	return (
		<>
			{!activeChat ? null : activeSubchat ? (
				<SubchatView />
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

			<PreviewView />
		</>
	)
}
