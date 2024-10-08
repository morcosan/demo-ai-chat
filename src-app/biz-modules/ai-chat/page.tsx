import { AppLayout } from '@app/layouts/app-layout'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { LoadingText } from './components/loading-text'
import { AiChatView, useAiChat } from './state'
import { ChatView } from './views/chat-view'
import { SubchatView } from './views/subchat-view'
import { SubchatsView } from './views/subchats-view'

const AiChatPage = () => {
	const {
		activeChat,
		activeSubchat,
		activeView,
		allSubchats,
		allSubchatsLoading,
		chatLoading,
		subchatLoading,
		loadActiveSubchat,
		resetActiveSubchat,
		setActiveView,
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

		if (subchatId && activeView === AiChatView.MOBILE_CHAT) {
			setActiveView(AiChatView.MOBILE_SUBCHAT)
		}
	}, [activeChat, subchatId])

	const subchatSlot =
		chatLoading === 'full' || allSubchatsLoading === 'full' ? (
			<LoadingText text="Loading subchats..." className="flex-center h-full" />
		) : !activeChat ? (
			<div />
		) : !allSubchats.length && !subchatLoading && !activeSubchat ? (
			<div className="flex-center h-full w-full text-color-text-subtle">No sub-chats</div>
		) : activeSubchat ? (
			<SubchatView />
		) : (
			<SubchatsView />
		)

	return (
		<AppLayout pageClassName="flex">
			<ChatView />

			{/* DESKTOP */}
			{activeView === AiChatView.DESKTOP && (
				<div className="relative ml-xs-2 h-full w-[30%]">
					{/* DELIMITER */}
					<div className="absolute -left-xs-1 top-0 h-full w-xs-1 bg-color-border-shadow" />
					{/* VIEW */}
					{subchatSlot}
				</div>
			)}

			{/* MOBILE */}
			<div
				className={[
					'fixed bottom-0 left-0 right-0 z-popup',
					'border-t border-color-border-shadow shadow-lg',
					'transition-transform duration-300 ease-out',
					activeView === AiChatView.MOBILE_SUBCHAT ? 'translate-x-0' : 'translate-x-full',
				].join(' ')}
				style={{ top: 'var(--app-spacing-navbar-h)', background: 'var(--app-color-bg-navbar)' }}
			>
				{subchatSlot}
			</div>
		</AppLayout>
	)
}

export default AiChatPage
