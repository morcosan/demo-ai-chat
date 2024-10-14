import { AppLayout } from '@app/layouts/app-layout'
import { useUiViewport } from '@ds/release'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { LoadingText } from './components/loading-text'
import { AiChatView, useAiChat } from './state'
import { ChatView } from './views/chat-view'
import { SubchatView } from './views/subchat-view'
import { SubchatsView } from './views/subchats-view'

const AiChatPage = () => {
	const { isViewportMaxLG } = useUiViewport()
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

	const isSubchatView = activeView === AiChatView.MOBILE_SUBCHAT

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
		setActiveView(isViewportMaxLG ? AiChatView.MOBILE_CHAT : AiChatView.DESKTOP)

		return () => {
			setActiveView(AiChatView.NONE)
		}
	}, [isViewportMaxLG])

	useEffect(() => {
		subchatId ? loadSubchat() : resetActiveSubchat()
	}, [activeChat, subchatId])

	const subchatSlot = !activeChat ? (
		<div />
	) : activeSubchat ? (
		<SubchatView />
	) : chatLoading === 'full' || allSubchatsLoading === 'full' ? (
		<LoadingText text={t('aiChat.loadingSubchats')} className="flex-center h-full" />
	) : !allSubchats.length && !subchatLoading ? (
		<div className="flex-center h-full w-full text-color-text-subtle">No sub-chats</div>
	) : (
		<SubchatsView />
	)

	return (
		<AppLayout pageClassName="flex">
			<ChatView />

			{/* DESKTOP */}
			{activeView === AiChatView.DESKTOP && (
				<div className="relative ml-xs-2 h-full w-[30%] min-w-xl-0">
					{/* DELIMITER */}
					<div className="absolute -left-xs-1 top-0 h-full w-xs-1 bg-color-border-shadow" />
					{/* VIEW */}
					{subchatSlot}
				</div>
			)}

			{/* MOBILE OVERLAY */}
			<div
				className={cx('absolute-overlay z-popup backdrop-blur-sm', !isSubchatView && 'hidden')}
				style={{ top: 'var(--app-spacing-navbar-h)' }}
				onClick={() => setActiveView(AiChatView.MOBILE_CHAT)}
			/>
			{/* MOBILE CONTENT */}
			{activeView !== AiChatView.DESKTOP && (
				<div
					className={cx(
						'fixed bottom-0 left-0 right-0 z-popup ml-button-h-md',
						'border-l border-t border-color-border-shadow shadow-lg',
						'transition-transform duration-300 ease-out',
						isSubchatView ? 'translate-x-0' : 'translate-x-full'
					)}
					style={{ top: 'var(--app-spacing-navbar-h)', background: 'var(--app-color-bg-navbar)' }}
				>
					{subchatSlot}
				</div>
			)}
		</AppLayout>
	)
}

export default AiChatPage
