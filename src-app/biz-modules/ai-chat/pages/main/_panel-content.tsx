import { LoadingText } from '@app/library/release'
import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { SubchatToolbar } from '../../components/subchat-toolbar'
import { useAiChat } from '../../state'
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
		chatLoading,
		subchatLoading,
		loadActiveSubchat,
		resetActiveSubchat,
	} = useAiChat()
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()
	const prevChatLoadingRef = useRef<ListLoading>(false)

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
		if (chatLoading || (prevChatLoadingRef.current !== 'full' && prevChatLoadingRef.current !== false)) {
			prevChatLoadingRef.current = chatLoading
			return
		}
		if (!allSubchatsLoading) {
			allSubchats.length ? onShowPanel() : onHidePanel()
		}
	}, [allSubchats, chatLoading, allSubchatsLoading])

	return !activeChat ? (
		<div />
	) : activeSubchat ? (
		<SubchatView onHidePanel={onHidePanel} />
	) : chatLoading === 'full' || allSubchatsLoading === 'full' ? (
		<div className="ds-scrollable flex h-full flex-col">
			<SubchatToolbar onHidePanel={onHidePanel} />
			<LoadingText text={t('aiChat.state.loadingSubchats')} className="flex-center h-full" />
		</div>
	) : !allSubchats.length && !subchatLoading ? (
		<div className="ds-scrollable flex h-full flex-col">
			<SubchatToolbar onHidePanel={onHidePanel} />
			<div className="flex-center h-full w-full text-color-text-subtle">{t('aiChat.label.noSubchats')}</div>
		</div>
	) : (
		<SubchatsView onHidePanel={onHidePanel} />
	)
}
