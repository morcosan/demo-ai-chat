import { allChatsDefaults, AllChatsStore } from '@app/biz-modules/ai-chat/state/stores/all-chats-store'
import { allSubchatsDefaults, AllSubchatsStore } from '@app/biz-modules/ai-chat/state/stores/all-subchats-store'
import { chatDefaults, ChatStore } from '@app/biz-modules/ai-chat/state/stores/chat-store'
import { subchatDefaults, SubchatStore } from '@app/biz-modules/ai-chat/state/stores/subchat-store'
import { createContext } from 'react'

export enum AiChatTab {
	BOTH,
	CHAT,
	SUBCHAT,
}

export interface Store extends AllChatsStore, AllSubchatsStore, ChatStore, SubchatStore {
	activeTab: AiChatTab
	setActiveTab(tab: AiChatTab): void
}

export const Context = createContext<Store>({
	...allChatsDefaults,
	...chatDefaults,
	...allSubchatsDefaults,
	...subchatDefaults,
	activeTab: AiChatTab.BOTH,
	setActiveTab: () => {},
})
