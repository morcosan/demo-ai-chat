import { useMemo, useState } from 'react'
import { AiChatView, Context, Store } from './_context'
import { useAllChatsStore } from './stores/all-chats-store'
import { useAllSubchatsStore } from './stores/all-subchats-store'
import { useChatStore } from './stores/chat-store'
import { useSubchatStore } from './stores/subchat-store'

export const AiChatProvider = ({ children }: ReactProps) => {
	const [activeView, setActiveView] = useState<AiChatView>(AiChatView.NONE)
	const allChatsStore = useAllChatsStore()
	const chatStore = useChatStore(allChatsStore)
	const allSubchatsStore = useAllSubchatsStore(chatStore)
	const subchatStore = useSubchatStore(chatStore, allSubchatsStore)
	const [showsSearch, setShowsSearch] = useState(false)

	const store: Store = useMemo(
		() => ({
			...allChatsStore,
			...allSubchatsStore,
			...chatStore,
			...subchatStore,
			activeView,
			showsSearch,
			setActiveView,
			setShowsSearch,
		}),
		[
			...Object.values(allChatsStore),
			...Object.values(chatStore),
			...Object.values(allSubchatsStore),
			...Object.values(subchatStore),
			activeView,
			showsSearch,
		]
	)

	return <Context.Provider value={store}>{children}</Context.Provider>
}
