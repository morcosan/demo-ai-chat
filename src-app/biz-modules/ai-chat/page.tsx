import { AppLayout } from '@app/layouts/app-layout'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { LoadingText } from './components/loading-text'
import { AiChatTab, useAiChat } from './state'
import { ChatView } from './views/chat-view'
import { SubchatView } from './views/subchat-view'
import { SubchatsView } from './views/subchats-view'

const AiChatPage = () => {
	const {
		activeChat,
		activeSubchat,
		activeTab,
		allSubchats,
		allSubchatsLoading,
		chatLoading,
		subchatLoading,
		loadActiveSubchat,
		resetActiveSubchat,
		setActiveTab,
	} = useAiChat()
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()

	const subchatId = parseInt(String(searchParams.get('subchat')))

	const hasChatView = activeTab === AiChatTab.BOTH || activeTab === AiChatTab.CHAT
	const hasSubchatView = activeTab === AiChatTab.BOTH || activeTab === AiChatTab.SUBCHAT

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

		if (subchatId && activeTab === AiChatTab.CHAT) {
			setActiveTab(AiChatTab.SUBCHAT)
		}
	}, [activeChat, subchatId])

	return (
		<AppLayout pageClassName="flex">
			{Boolean(hasChatView) && <ChatView />}

			{Boolean(hasSubchatView) && (
				<div className={`relative h-full ${activeTab === AiChatTab.BOTH ? 'ml-xs-2 w-[30%]' : 'w-full'}`}>
					{/* DELIMITER */}
					{activeTab === AiChatTab.BOTH && (
						<div className="absolute -left-xs-1 top-0 h-full w-xs-1 bg-color-border-shadow" />
					)}

					{chatLoading === 'full' || allSubchatsLoading === 'full' ? (
						<LoadingText text="Loading subchats..." className="flex-center h-full" />
					) : !activeChat ? (
						<div />
					) : !allSubchats.length && !subchatLoading && !activeSubchat ? (
						<div className="flex-center h-full w-full text-color-text-subtle">No sub-chats</div>
					) : activeSubchat ? (
						<SubchatView />
					) : (
						<SubchatsView />
					)}
				</div>
			)}
		</AppLayout>
	)
}

export default AiChatPage
