import { createContext } from 'react'
import { allChatsDefaults, AllChatsStore } from './stores/all-chats-store'
import { allSubchatsDefaults, AllSubchatsStore } from './stores/all-subchats-store'
import { chatDefaults, ChatStore } from './stores/chat-store'
import { searchDefaults, SearchStore } from './stores/search-store'
import { subchatDefaults, SubchatStore } from './stores/subchat-store'

export enum AiChatView {
	NONE,
	DESKTOP,
	MOBILE_CHAT,
	MOBILE_SUBCHAT,
}

export interface Store extends AllChatsStore, AllSubchatsStore, ChatStore, SubchatStore, SearchStore {
	activeView: AiChatView
	setActiveView(tab: AiChatView): void
}

export const Context = createContext<Store>({
	...allChatsDefaults,
	...chatDefaults,
	...allSubchatsDefaults,
	...subchatDefaults,
	...searchDefaults,
	activeView: AiChatView.DESKTOP,
	setActiveView: () => {},
})
