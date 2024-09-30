import { createContext, useEffect, useMemo, useState } from 'react'
import { API } from '../api'
import { Chat, ChatListing, Message } from '../api/types'

export interface Store {
	allChats: Chat[]
	allChatsPagination: Pagination
	allChatsLoading: ListLoading

	activeChat: Chat | null
	activeChatMessages: Message[]
	activeChatPagination: Pagination
	activeChatLoading: boolean

	activeSubchat: Chat | null
	activeSubchatMessages: Message[]
	activeSubchatPagination: Pagination
	activeSubchatLoading: boolean

	loadMoreChats(): void
	loadActiveChat(chatId: number): void
	loadActiveSubchat(subchatId: number): void
	loadMoreMessages(chatId: number, subchatId?: number): void
}

export const Context = createContext<Store>({
	allChats: [],
	allChatsPagination: { page: 0, count: 0 },
	allChatsLoading: false,

	activeChat: null,
	activeChatMessages: [],
	activeChatPagination: { page: 0, count: 0 },
	activeChatLoading: false,

	activeSubchat: null,
	activeSubchatMessages: [],
	activeSubchatPagination: { page: 0, count: 0 },
	activeSubchatLoading: false,

	loadMoreChats: () => {},
	loadActiveChat: () => {},
	loadActiveSubchat: () => {},
	loadMoreMessages: () => {},
})

export const AiChatProvider = ({ children }: ReactProps) => {
	const [allChats, setAllChats] = useState([] as Chat[])
	const [allChatsPagination, setAllChatsPagination] = useState({ page: 0, count: 0 } as Pagination)
	const [allChatsLoading, setAllChatsLoading] = useState<ListLoading>(false)

	const [activeChat, setActiveChat] = useState(null as Chat | null)
	const [activeChatMessages, setActiveChatMessages] = useState([] as Message[])
	const [activeChatPagination, setActiveChatPagination] = useState({ page: 0, count: 0 } as Pagination)
	const [activeChatLoading, setActiveChatLoading] = useState(false)

	const [activeSubchat, setActiveSubchat] = useState(null as Chat | null)
	const [activeSubchatMessages, setActiveSubchatMessages] = useState([] as Message[])
	const [activeSubchatPagination, setActiveSubchatPagination] = useState({ page: 0, count: 0 } as Pagination)
	const [activeSubchatLoading, setActiveSubchatLoading] = useState(false)

	const [pendingChatId, setPendingChatId] = useState(0)

	const loadMoreChats = async () => {
		if (allChatsLoading) return
		if (allChats.length && allChats.length >= allChatsPagination.count) return

		setAllChatsLoading(allChatsPagination.page === 0 ? 'all' : 'more')

		const listing: ChatListing = await API.getChats(allChatsPagination.page + 1)

		setAllChats([...allChats, ...listing.chats])
		setAllChatsLoading(false)
		setAllChatsPagination({ page: allChatsPagination.page + 1, count: listing.count })
	}

	const loadMoreMessages = async (chatId: number, subchatId?: number) => {}

	const loadActiveChat = async (chatId: number) => {
		if (activeChatLoading) return

		setActiveChatLoading(true)

		const chat = allChats.find((chat: Chat) => chat.id === chatId) || null

		setActiveChat(chat)
		setActiveChatLoading(false)
		setPendingChatId(chat ? 0 : chatId)
	}

	const loadActiveSubchat = async (subchatId: number) => {}

	useEffect(() => {
		if (!allChatsPagination.page) {
			loadMoreChats()
		}
	}, [])

	useEffect(() => {
		if (pendingChatId && !activeChat) {
			loadActiveChat(pendingChatId)
		}
	}, [allChats])

	const store: Store = useMemo(
		() => ({
			allChats,
			allChatsPagination,
			allChatsLoading,

			activeChat,
			activeChatMessages,
			activeChatPagination,
			activeChatLoading,

			activeSubchat,
			activeSubchatMessages,
			activeSubchatPagination,
			activeSubchatLoading,

			loadMoreChats,
			loadActiveChat,
			loadActiveSubchat,
			loadMoreMessages,
		}),
		[allChats, allChatsLoading, allChatsPagination, activeChat, activeChatLoading]
	)

	return <Context.Provider value={store}>{children}</Context.Provider>
}
