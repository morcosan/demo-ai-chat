import { API } from '@app/biz-modules/ai-chat/api'
import { uniqBy } from 'lodash'
import { useEffect, useState } from 'react'
import { Chat, Message } from '../../api/types'
import { newGhostMessage } from './_utils'
import { AllChatsStore } from './all-chats-store'

export interface ChatStore {
	activeChat: Chat | null
	chatMessages: Message[]
	chatPagination: Pagination
	chatLoading: ListLoading
	canLoadChatMessages: boolean
	loadActiveChat(chatId: number): Promise<boolean | undefined>
	loadMoreChatMessages(): void
	postChatMessage(text: string): void
	resetActiveChat(): void
	updateMessage(message: Message): void
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
	updateMessage: () => {},
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
		setChatMessages([
			...chatMessages,
			newGhostMessage(activeChat.id, 0, 'user', text),
			newGhostMessage(activeChat.id, 0, 'agent', ''),
		])
		setChatPagination({ ...chatPagination, count: chatPagination.count + 1 })

		const listing = await API.postMessage(activeChat.id, 0, text)

		setChatMessages([...chatMessages, ...listing.messages])
		setChatLoading(false)
		setChatPagination({ ...chatPagination, count: chatPagination.count + listing.count })
	}

	const updateMessage = (message: Message) => {
		const index = chatMessages.findIndex((msg: Message) => msg.id === message.id)
		chatMessages[index] = message
		setChatMessages([...chatMessages])
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
		loadMoreChatMessages,
		postChatMessage,
		resetActiveChat,
		updateMessage,
	}
}
