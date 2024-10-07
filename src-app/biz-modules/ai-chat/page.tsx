import { LoadingText } from '@app/biz-modules/ai-chat/components/loading-text'
import { useAiChat } from '@app/biz-modules/ai-chat/state'
import { ChatView } from '@app/biz-modules/ai-chat/views/chat-view'
import { SubchatView } from '@app/biz-modules/ai-chat/views/subchat-view'
import { SubchatsView } from '@app/biz-modules/ai-chat/views/subchats-view'
import { AppLayout } from '@app/layouts/app-layout'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const AiChatPage = () => {
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

	const subchatId = parseInt(String(searchParams.get('subchat')))

	const loadSubchat = async () => {
		const success = await loadActiveSubchat(subchatId)
		if (success === false) {
			searchParams.delete('subchat')
			navigate({ search: searchParams.toString() }, { replace: true })
		}
	}

	useEffect(() => {
		subchatId ? loadSubchat() : resetActiveSubchat()
	}, [activeChat, subchatId])

	return (
		<AppLayout pageClassName="flex">
			<ChatView />

			<div className="relative ml-xs-2 h-full w-[30%]">
				{/* DELIMITER */}
				<div className="absolute -left-xs-1 top-0 h-full w-xs-1 bg-color-border-shadow" />

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
		</AppLayout>
	)
}

export default AiChatPage
