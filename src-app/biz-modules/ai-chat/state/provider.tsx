import { createContext, useMemo } from 'react'
import { activeChatDefaults, ActiveChatStore, useActiveChatStore } from './_active-chat-store'
import { activeSubchatDefaults, ActiveSubchatStore, useActiveSubchatStore } from './_active-subchat-store'
import { allChatsDefaults, AllChatsStore, useAllChatsStore } from './_all-chats-store'

export interface Store extends AllChatsStore, ActiveChatStore, ActiveSubchatStore {}

export const Context = createContext<Store>({
	...allChatsDefaults,
	...activeChatDefaults,
	...activeSubchatDefaults,
})

export const AiChatProvider = ({ children }: ReactProps) => {
	const allChatsStore = useAllChatsStore()
	const activeChatStore = useActiveChatStore(allChatsStore.allChats)
	const activeSubchatStore = useActiveSubchatStore(allChatsStore.allChats)

	const store: Store = useMemo(
		() => ({
			...allChatsStore,
			...activeChatStore,
			...activeSubchatStore,
		}),
		[...Object.values(allChatsStore), ...Object.values(activeChatStore), ...Object.values(activeSubchatStore)]
	)

	return <Context.Provider value={store}>{children}</Context.Provider>
}
