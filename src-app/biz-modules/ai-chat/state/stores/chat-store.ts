import { API } from '@app/biz-modules/ai-chat/api'
import { useEffect, useState } from 'react'
import { Chat, Message } from '../../api/types'

export interface ChatStore {
	activeChat: Chat | null
	chatMessages: Message[]
	chatPagination: Pagination
	chatLoading: ListLoading
	canLoadChatMessages: boolean
	loadActiveChat(chatId: number): Promise<boolean | undefined>
	resetActiveChat(): void
	loadMoreChatMessages(): void
}

export const chatDefaults: ChatStore = {
	activeChat: null,
	chatMessages: [],
	chatPagination: { page: 0, count: 0 },
	chatLoading: false,
	canLoadChatMessages: false,
	loadActiveChat: async () => false,
	resetActiveChat: () => {},
	loadMoreChatMessages: () => {},
}

export const useChatStore = (allChats: Chat[]): ChatStore => {
	const [activeChat, setActiveChat] = useState(null as Chat | null)
	const [chatMessages, setChatMessages] = useState([] as Message[])
	const [chatPagination, setChatPagination] = useState({ page: 0, count: 0 } as Pagination)
	const [chatLoading, setChatLoading] = useState<ListLoading>(false)

	const canLoadChatMessages = !chatMessages.length || chatMessages.length < chatPagination.count

	const loadActiveChat = async (chatId: number) => {
		if (chatLoading || isNaN(chatId) || chatId === activeChat?.id) return

		let chat = allChats.find((chat: Chat) => chat.id === chatId) || null
		if (!chat) {
			const listing = await API.getChats([chatId])
			chat = listing.chats[0] || null
		}

		setActiveChat(chat)
		setChatMessages([])
		setChatPagination({ page: 0, count: 0 })

		return Boolean(chat)
	}

	const resetActiveChat = () => {
		setActiveChat(null)
		setChatMessages([])
		setChatPagination({ page: 0, count: 0 })
	}

	const loadMoreChatMessages = async () => {
		if (chatLoading || !activeChat || !canLoadChatMessages) return

		setChatLoading(chatPagination.page === 0 ? 'full' : 'more')

		const listing = await API.getMessages(activeChat.id, 0, chatPagination.page + 1)

		setChatMessages([...listing.messages, ...chatMessages])
		setChatLoading(false)
		setChatPagination({ page: chatPagination.page + 1, count: listing.count })
	}

	useEffect(() => {
		!chatPagination.page && loadMoreChatMessages()
	}, [activeChat])

	return {
		activeChat,
		canLoadChatMessages,
		chatLoading,
		chatMessages,
		chatPagination,
		loadActiveChat,
		resetActiveChat,
		loadMoreChatMessages,
	}
}
