import { useMemo } from 'react'
import { useAllChatsStore } from './_stores/all-chats-store'
import { useAllSubchatsStore } from './_stores/all-subchats-store'
import { useChatStore } from './_stores/chat-store'
import { useSubchatStore } from './_stores/subchat-store'
import { MultiStoreContext, Store } from './context'

export const MultiStoreProvider = ({ children }: ReactProps) => {
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
		}),
		[
			...Object.values(allChatsStore),
			...Object.values(chatStore),
			...Object.values(allSubchatsStore),
			...Object.values(subchatStore),
		]
	)

	return <MultiStoreContext.Provider value={store}>{children}</MultiStoreContext.Provider>
}
