import { createContext, useEffect, useMemo, useState } from 'react'
import { API } from '../api'
import { Chat, ChatListing } from '../api/types'

export interface Store {
	allChats: Chat[]
	allChatsLoading: boolean
	moreChatsLoading: boolean
	chatPagination: Pagination
	activeChat: Chat | null
	activeChatLoading: boolean
	loadMoreChats(): void
	loadChat(chatId: number): void
}

export const Context = createContext<Store>({
	allChats: [],
	allChatsLoading: false,
	moreChatsLoading: false,
	chatPagination: { page: 0, count: 0 },
	activeChat: null,
	activeChatLoading: false,
	loadMoreChats: () => {},
	loadChat: () => {},
})

export const AiChatProvider = ({ children }: ReactProps) => {
	const [allChats, setAllChats] = useState([] as Chat[])
	const [allChatsLoading, setAllChatsLoading] = useState(false)
	const [moreChatsLoading, setMoreChatsLoading] = useState(false)
	const [chatPagination, setChatPagination] = useState({ page: 0, count: 0 } as Pagination)
	const [activeChat, setActiveChat] = useState(null as Chat | null)
	const [activeChatLoading, setActiveChatLoading] = useState(false)
	const [pendingChatId, setPendingChatId] = useState(0)

	const loadMoreChats = async () => {
		if (allChatsLoading || moreChatsLoading) return
		if (allChats.length && allChats.length >= chatPagination.count) return

		chatPagination.page === 0 ? setAllChatsLoading(true) : setMoreChatsLoading(true)

		const listing: ChatListing = await API.getChats(chatPagination.page + 1)

		setAllChats([...allChats, ...listing.chats])
		setAllChatsLoading(false)
		setMoreChatsLoading(false)
		setChatPagination({ page: chatPagination.page + 1, count: listing.count })
	}

	const loadChat = async (chatId: number) => {
		if (activeChatLoading) return

		setActiveChatLoading(true)

		const chat = allChats.find((chat: Chat) => chat.id === chatId) || null

		setActiveChat(chat)
		setActiveChatLoading(false)
		setPendingChatId(chat ? 0 : chatId)
	}

	useEffect(() => {
		if (!chatPagination.page) {
			loadMoreChats()
		}
	}, [])

	useEffect(() => {
		if (pendingChatId && !activeChat) {
			loadChat(pendingChatId)
		}
	}, [allChats])

	const store = useMemo(
		(): Store => ({
			allChats,
			allChatsLoading,
			moreChatsLoading,
			chatPagination,
			activeChat,
			activeChatLoading,
			loadMoreChats,
			loadChat,
		}),
		[allChats, allChatsLoading, moreChatsLoading, chatPagination, activeChat, activeChatLoading]
	)

	return <Context.Provider value={store}>{children}</Context.Provider>
}
