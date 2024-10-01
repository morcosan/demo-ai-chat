import { createContext, useMemo } from 'react'
import { allChatsDefaults, AllChatsStore, useAllChatsStore } from './stores/all-chats-store'
import { allSubchatsDefaults, AllSubchatsStore, useAllSubchatsStore } from './stores/all-subchats-store'
import { chatDefaults, ChatStore, useChatStore } from './stores/chat-store'
import { subchatDefaults, SubchatStore, useSubchatStore } from './stores/subchat-store'

export interface Store extends AllChatsStore, AllSubchatsStore, ChatStore, SubchatStore {}

export const Context = createContext<Store>({
	...allChatsDefaults,
	...chatDefaults,
	...allSubchatsDefaults,
	...subchatDefaults,
})

export const AiChatProvider = ({ children }: ReactProps) => {
	const allChatsStore = useAllChatsStore()
	const chatStore = useChatStore(allChatsStore.allChats)
	const allSubchatsStore = useAllSubchatsStore(chatStore.activeChat)
	const subchatStore = useSubchatStore(allSubchatsStore.allSubchats)

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

	return <Context.Provider value={store}>{children}</Context.Provider>
}
