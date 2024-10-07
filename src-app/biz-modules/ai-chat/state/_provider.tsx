import { useMemo, useState } from 'react'
import { AiChatTab, Context, Store } from './_context'
import { useAllChatsStore } from './stores/all-chats-store'
import { useAllSubchatsStore } from './stores/all-subchats-store'
import { useChatStore } from './stores/chat-store'
import { useSubchatStore } from './stores/subchat-store'

export const AiChatProvider = ({ children }: ReactProps) => {
	const [activeTab, setActiveTab] = useState<AiChatTab>(AiChatTab.ALL)
	const allChatsStore = useAllChatsStore()
	const chatStore = useChatStore(allChatsStore)
	const allSubchatsStore = useAllSubchatsStore(chatStore)
	const subchatStore = useSubchatStore(chatStore, allSubchatsStore)

	const store: Store = useMemo(
		() => ({
			...allChatsStore,
			...allSubchatsStore,
			...chatStore,
			...subchatStore,
			activeTab,
			setActiveTab,
		}),
		[
			...Object.values(allChatsStore),
			...Object.values(chatStore),
			...Object.values(allSubchatsStore),
			...Object.values(subchatStore),
		]
	)

	return <Context.Provider value={store}>{children}</Context.Provider>
}
