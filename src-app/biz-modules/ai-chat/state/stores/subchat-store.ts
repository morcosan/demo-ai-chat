import { useEffect, useState } from 'react'
import { Chat, Message } from '../../api/types'

export interface SubchatStore {
	activeSubchat: Chat | null
	subchatMessages: Message[]
	subchatPagination: Pagination
	subchatLoading: ListLoading
	loadSubchat(chatId: number): void
	loadMoreSubchatMessages(): void
}

export const subchatDefaults: SubchatStore = {
	activeSubchat: null,
	subchatMessages: [],
	subchatPagination: { page: 0, count: 0 },
	subchatLoading: false,
	loadSubchat: () => {},
	loadMoreSubchatMessages: () => {},
}

export const useSubchatStore = (allChats: Chat[]): SubchatStore => {
	const [activeSubchat, setActiveSubchat] = useState(null as Chat | null)
	const [subchatMessages, setSubchatMessages] = useState([] as Message[])
	const [subchatPagination, setSubchatPagination] = useState({ page: 0, count: 0 } as Pagination)
	const [subchatLoading, setSubchatLoading] = useState<ListLoading>(false)
	const [pendingChatId, setPendingChatId] = useState(0)

	const loadSubchat = async (chatId: number) => {
		if (subchatLoading) return

		setSubchatLoading('full')

		const chat = allChats.find((chat: Chat) => chat.id === chatId) || null

		setActiveSubchat(chat)
		setSubchatLoading(false)
		setPendingChatId(chat ? 0 : chatId)
	}

	const loadMoreSubchatMessages = async () => {}

	useEffect(() => {
		if (pendingChatId && !activeSubchat) {
			loadSubchat(pendingChatId)
		}
	}, [allChats])

	return {
		activeSubchat,
		subchatMessages,
		subchatPagination,
		subchatLoading,
		loadSubchat,
		loadMoreSubchatMessages,
	}
}
