import { MessageRole } from '@api/types'
import { API } from '@app/biz-modules/ai-chat/api'
import { uniqBy } from 'lodash'
import { useEffect, useState } from 'react'
import { Chat, Message } from '../../api/types'
import { AllChatsStore } from './all-chats-store'

export interface ChatStore {
	activeChat: Chat | null
	chatMessages: Message[]
	chatPagination: Pagination
	chatLoading: ListLoading
	canLoadChatMessages: boolean
	postChatMessage(text: string): void
	loadActiveChat(chatId: number): Promise<boolean | undefined>
	loadMoreChatMessages(): void
	resetActiveChat(): void
}

export const chatDefaults: ChatStore = {
	activeChat: null,
	chatMessages: [],
	chatPagination: { page: 0, count: 0 },
	chatLoading: false,
	canLoadChatMessages: false,
	postChatMessage: () => {},
	loadActiveChat: async () => false,
	loadMoreChatMessages: () => {},
	resetActiveChat: () => {},
}

export const useChatStore = (allChatsStore: AllChatsStore): ChatStore => {
	const { allChats } = allChatsStore
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

		setChatMessages(uniqBy([...listing.messages, ...chatMessages], (msg: Message) => msg.id))
		setChatLoading(false)
		setChatPagination({ page: chatPagination.page + 1, count: listing.count })
	}

	const postChatMessage = async (text: string) => {
		if (chatLoading || !activeChat) return

		setChatLoading('post')
		setChatMessages([...chatMessages, newGhostMessage('user', text), newGhostMessage('agent')])

		const listing = await API.postMessage(activeChat.id, 0, text)

		// setChatMessages([...chatMessages.slice(0, -2), ...listing.messages])
		// setChatLoading(false)
		// setChatPagination({ ...chatPagination, count: chatPagination.count + listing.count })
	}

	const newGhostMessage = (role: MessageRole, text?: string): Message => ({
		id: role === 'user' ? -1 : -2,
		chatId: activeChat!.id,
		subchatId: 0,
		parentId: activeChat!.id,
		text: (role === 'user' && text) || '',
		role: role,
		datetime: role === 'user' ? new Date().toISOString() : new Date(new Date().getTime() + 1000).toISOString(),
		subchatSize: 0,
		ghost: true,
	})

	useEffect(() => {
		!chatPagination.page && loadMoreChatMessages()
	}, [activeChat])

	return {
		activeChat,
		canLoadChatMessages,
		chatLoading,
		chatMessages,
		chatPagination,
		postChatMessage,
		loadActiveChat,
		loadMoreChatMessages,
		resetActiveChat,
	}
}
