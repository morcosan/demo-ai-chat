import { useEffect, useState } from 'react'
import { Chat, Message } from '../api/types'

export interface ActiveChatStore {
	activeChat: Chat | null
	activeChatMessages: Message[]
	activeChatPagination: Pagination
	activeChatLoading: ListLoading
	loadActiveChat(chatId: number): void
	loadMoreChatMessages(): void
}

export const activeChatDefaults: ActiveChatStore = {
	activeChat: null,
	activeChatMessages: [],
	activeChatPagination: { page: 0, count: 0 },
	activeChatLoading: false,
	loadActiveChat: () => {},
	loadMoreChatMessages: () => {},
}

export const useActiveChatStore = (allChats: Chat[]): ActiveChatStore => {
	const [activeChat, setActiveChat] = useState(null as Chat | null)
	const [activeChatMessages, setActiveChatMessages] = useState([] as Message[])
	const [activeChatPagination, setActiveChatPagination] = useState({ page: 0, count: 0 } as Pagination)
	const [activeChatLoading, setActiveChatLoading] = useState<ListLoading>(false)
	const [pendingChatId, setPendingChatId] = useState(0)

	const loadActiveChat = async (chatId: number) => {
		if (activeChatLoading) return

		setActiveChatLoading('all')

		const chat = allChats.find((chat: Chat) => chat.id === chatId) || null

		setActiveChat(chat)
		setActiveChatLoading(false)
		setPendingChatId(chat ? 0 : chatId)
	}

	const loadMoreChatMessages = async () => {}

	useEffect(() => {
		if (pendingChatId && !activeChat) {
			loadActiveChat(pendingChatId)
		}
	}, [allChats])

	return {
		activeChat,
		activeChatMessages,
		activeChatPagination,
		activeChatLoading,
		loadActiveChat,
		loadMoreChatMessages,
	}
}
