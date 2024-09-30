import { useEffect, useState } from 'react'
import { Chat, Message } from '../api/types'

export interface ActiveSubchatStore {
	activeSubchat: Chat | null
	activeSubchatMessages: Message[]
	activeSubchatPagination: Pagination
	activeSubchatLoading: ListLoading
	loadActiveSubchat(chatId: number): void
	loadMoreSubchatMessages(): void
}

export const activeSubchatDefaults: ActiveSubchatStore = {
	activeSubchat: null,
	activeSubchatMessages: [],
	activeSubchatPagination: { page: 0, count: 0 },
	activeSubchatLoading: false,
	loadActiveSubchat: () => {},
	loadMoreSubchatMessages: () => {},
}

export const useActiveSubchatStore = (allChats: Chat[]): ActiveSubchatStore => {
	const [activeSubchat, setActiveSubchat] = useState(null as Chat | null)
	const [activeSubchatMessages, setActiveSubchatMessages] = useState([] as Message[])
	const [activeSubchatPagination, setActiveSubchatPagination] = useState({ page: 0, count: 0 } as Pagination)
	const [activeSubchatLoading, setActiveSubchatLoading] = useState<ListLoading>(false)
	const [pendingChatId, setPendingChatId] = useState(0)

	const loadActiveSubchat = async (chatId: number) => {
		if (activeSubchatLoading) return

		setActiveSubchatLoading('all')

		const chat = allChats.find((chat: Chat) => chat.id === chatId) || null

		setActiveSubchat(chat)
		setActiveSubchatLoading(false)
		setPendingChatId(chat ? 0 : chatId)
	}

	const loadMoreSubchatMessages = async () => {}

	useEffect(() => {
		if (pendingChatId && !activeSubchat) {
			loadActiveSubchat(pendingChatId)
		}
	}, [allChats])

	return {
		activeSubchat,
		activeSubchatMessages,
		activeSubchatPagination,
		activeSubchatLoading,
		loadActiveSubchat,
		loadMoreSubchatMessages,
	}
}
