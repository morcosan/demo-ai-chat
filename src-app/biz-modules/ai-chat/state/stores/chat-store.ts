import { API } from '@app/biz-modules/ai-chat/api'
import { useEffect, useState } from 'react'
import { Chat, Message } from '../../api/types'

export interface ChatStore {
	activeChat: Chat | null
	chatMessages: Message[]
	chatPagination: Pagination
	chatLoading: ListLoading
	canLoadChatMessages: boolean
	loadChat(chatId: number): void
	loadMoreChatMessages(): void
}

export const chatDefaults: ChatStore = {
	activeChat: null,
	chatMessages: [],
	chatPagination: { page: 0, count: 0 },
	chatLoading: false,
	canLoadChatMessages: false,
	loadChat: () => {},
	loadMoreChatMessages: () => {},
}

export const useChatStore = (allChats: Chat[]): ChatStore => {
	const [activeChat, setActiveChat] = useState(null as Chat | null)
	const [chatMessages, setChatMessages] = useState([] as Message[])
	const [chatPagination, setChatPagination] = useState({ page: 0, count: 0 } as Pagination)
	const [chatLoading, setChatLoading] = useState<ListLoading>(false)
	const [pendingChatId, setPendingChatId] = useState(0)

	const canLoadChatMessages = !chatMessages.length || chatMessages.length < chatPagination.count

	const loadChat = async (chatId: number) => {
		if (chatLoading || chatId === activeChat?.id) return

		const chat = allChats.find((chat: Chat) => chat.id === chatId) || null

		setActiveChat(chat)
		setPendingChatId(chat ? 0 : chatId)
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

	useEffect(() => {
		if (pendingChatId && !activeChat) {
			loadChat(pendingChatId)
		}
	}, [allChats])

	return {
		activeChat,
		canLoadChatMessages,
		chatLoading,
		chatMessages,
		chatPagination,
		loadChat,
		loadMoreChatMessages,
	}
}