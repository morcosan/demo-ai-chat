import { createContext } from 'react'
import { allChatsDefaults, AllChatsStore } from './_stores/all-chats-store'
import { allSubchatsDefaults, AllSubchatsStore } from './_stores/all-subchats-store'
import { chatDefaults, ChatStore } from './_stores/chat-store'
import { subchatDefaults, SubchatStore } from './_stores/subchat-store'

export interface Store extends AllChatsStore, AllSubchatsStore, ChatStore, SubchatStore {}

export const MultiStoreContext = createContext<Store>({
	...allChatsDefaults,
	...chatDefaults,
	...allSubchatsDefaults,
	...subchatDefaults,
})
