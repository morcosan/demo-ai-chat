import { uniqBy } from 'lodash'
import { useEffect, useState } from 'react'
import { API, Chat, Message } from '../../../api'
import { createGhostChat, createGhostMessage } from './_utils'
import { AllChatsStore } from './all-chats-store'

export interface ChatStore {
	activeChat: Chat | null
	chatMessages: Message[]
	chatPagination: Pagination
	chatLoading: ListLoading
	canLoadChatMessages: boolean
	loadActiveChat(chatId: number): Promise<boolean | undefined>
	loadMoreChatMessages(): void
	postChatMessage(text: string, agentId: number): void
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
	const [activeChat, setActiveChat] = useState<Chat | null>(null)
	const [chatMessages, setChatMessages] = useState<Message[]>([])
	const [chatPagination, setChatPagination] = useState<Pagination>({ page: 0, count: 0 })
	const [chatLoading, setChatLoading] = useState<ListLoading>(false)
	const [shouldRename, setShouldRename] = useState(false)

	const canLoadChatMessages = !chatPagination.page || chatMessages.length < chatPagination.count
	const isActiveLoading = chatLoading !== false && chatLoading !== 'error'

	const loadActiveChat = async (chatId: number) => {
		if (isActiveLoading || isNaN(chatId) || chatId === activeChat?.id) return

		let chat = allChats.find((chat: Chat) => chat.id === chatId) || null
		if (!chat) {
			const listing = await API.getChats([chatId])
			chat = listing.chats[0] || null
		}

		setActiveChat(chat)
		setChatMessages([])
		setChatPagination({ page: 0, count: 0 })
		setChatLoading(false)

		return Boolean(chat)
	}

	const resetActiveChat = () => {
		setActiveChat(null)
		setChatMessages([])
		setChatPagination({ page: 0, count: 0 })
		setChatLoading(false)
	}

	const loadMoreChatMessages = async () => {
		if (chatLoading || !activeChat || !canLoadChatMessages) return

		setChatLoading(chatPagination.page === 0 ? 'full' : 'more')

		const listing = await API.getMessages(activeChat.id, 0, chatPagination.page + 1)

		setChatMessages(uniqBy([...listing.messages, ...chatMessages], (msg: Message) => msg.id))
		setChatPagination({ page: chatPagination.page + 1, count: listing.count })
		setChatLoading(false)
	}

	const postChatMessage = async (text: string, agentId: number) => {
		if (isActiveLoading) return

		const ghostCount = chatMessages.filter((message: Message) => message.id < 0).length
		const messages: Message[] = chatMessages.filter((message: Message) => message.id > 0)
		const pagination: Pagination = { ...chatPagination, count: chatPagination.count - ghostCount }

		let chat = activeChat
		if (!chat) {
			chat = createGhostChat(t('aiChat.label.newChat'))
			setActiveChat(chat)
		}

		const page = activeChat ? chatPagination.page : 1

		setChatLoading('update')
		setChatMessages([
			...messages,
			createGhostMessage(chat.id, 0, 'user', text, agentId),
			createGhostMessage(chat.id, 0, 'agent', '', agentId),
		])
		setChatPagination({ page, count: pagination.count + 1 }) // Used for scrolling

		if (!activeChat) {
			chat = await createNewChat(chat)
			setActiveChat(chat)
			if (!chat) return
		}

		const listing = await API.postMessage(chat.id, text, agentId)

		if (listing.count) {
			setChatMessages([...messages, ...listing.messages]) // Old state
			setChatLoading(false)
			!activeChat && setShouldRename(true)
		} else {
			setChatMessages([
				...messages, // Old state
				createGhostMessage(chat.id, 0, 'user', text, agentId, true),
				createGhostMessage(chat.id, 0, 'agent', '', agentId, true),
			])
			setChatLoading('error')
		}

		setChatPagination({ page, count: pagination.count + 2 }) // Old state, used for scrolling
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
