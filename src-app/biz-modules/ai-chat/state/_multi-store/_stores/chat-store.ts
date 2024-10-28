import { API } from '@app/biz-modules/ai-chat/api'
import { uniqBy } from 'lodash'
import { useEffect, useState } from 'react'
import { Chat, Message } from '../../../api'
import { GHOST_CHAT, newGhostMessage } from './_utils'
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
	const { allChats, createNewChat, updateChat } = allChatsStore
	const [activeChat, setActiveChat] = useState(null as Chat | null)
	const [chatMessages, setChatMessages] = useState([] as Message[])
	const [chatPagination, setChatPagination] = useState({ page: 0, count: 0 } as Pagination)
	const [chatLoading, setChatLoading] = useState<ListLoading>(false)
	const [shouldRename, setShouldRename] = useState(false)

	const canLoadChatMessages = !chatPagination.page || chatMessages.length < chatPagination.count

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
		setChatPagination({ page: chatPagination.page + 1, count: listing.count })
		setChatLoading(false)
	}

	const postChatMessage = async (text: string) => {
		if (chatLoading) return

		let chat = activeChat
		if (!chat) {
			chat = GHOST_CHAT
			setActiveChat(GHOST_CHAT)
		}

		setChatLoading('update')
		setChatMessages([
			...chatMessages,
			newGhostMessage(chat.id, 0, 'user', text),
			newGhostMessage(chat.id, 0, 'agent', ''),
		])
		setChatPagination({ ...chatPagination, count: chatPagination.count + 1 })

		if (!activeChat) {
			chat = await createNewChat()
			setActiveChat(chat)
			if (!chat) return
		}

		const listing = await API.postMessage(chat.id, 0, text)

		setChatMessages([...chatMessages, ...listing.messages])
		setChatPagination({ ...chatPagination, count: chatPagination.count + listing.count })
		setChatLoading(false)

		if (!activeChat) {
			setShouldRename(true)
		}
	}

	const updateMessage = (message: Message) => {
		const index = chatMessages.findIndex((msg: Message) => msg.id === message.id)
		chatMessages[index] = message
		setChatMessages([...chatMessages])
	}

	const renameChat = async () => {
		if (!activeChat || chatLoading) return

		setChatLoading('update')
		const chat = await updateChat(activeChat.id)
		setActiveChat(chat)
		setChatLoading(false)
	}

	useEffect(() => {
		if (shouldRename) {
			renameChat()
			setShouldRename(false)
		}
	}, [shouldRename])

	useEffect(() => {
		activeChat?.id && !chatPagination.page && loadMoreChatMessages()
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
