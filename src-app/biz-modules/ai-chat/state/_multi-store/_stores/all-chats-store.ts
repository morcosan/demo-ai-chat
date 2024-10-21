import { useEffect, useState } from 'react'
import { API, Chat } from '../../../api'
import { GHOST_CHAT } from './_utils'

export interface AllChatsStore {
	allChats: Chat[]
	allChatsPagination: Pagination
	allChatsLoading: ListLoading
	createNewChat(): Promise<Chat | null>
	loadMoreChats(): void
	updateChat(chatId: number, title?: string): Promise<Chat | null>
}

export const allChatsDefaults: AllChatsStore = {
	allChats: [],
	allChatsPagination: { page: 0, count: 0 },
	allChatsLoading: false,
	createNewChat: async () => null,
	loadMoreChats: () => {},
	updateChat: async () => null,
}

export const useAllChatsStore = (): AllChatsStore => {
	const [allChats, setAllChats] = useState([] as Chat[])
	const [allChatsPagination, setAllChatsPagination] = useState({ page: 0, count: 0 } as Pagination)
	const [allChatsLoading, setAllChatsLoading] = useState<ListLoading>(false)

	const canLoadAllChats = !allChats.length || allChats.length < allChatsPagination.count

	const loadMoreChats = async () => {
		if (allChatsLoading || !canLoadAllChats) return

		setAllChatsLoading(allChatsPagination.page === 0 ? 'full' : 'more')

		const listing = await API.getChats([], allChatsPagination.page + 1)

		setAllChats([...allChats, ...listing.chats])
		setAllChatsPagination({ page: allChatsPagination.page + 1, count: listing.count })
		setAllChatsLoading(false)
	}

	const createNewChat = async (): Promise<Chat | null> => {
		if (allChatsLoading) return null

		setAllChatsLoading('update')
		setAllChats([GHOST_CHAT, ...allChats])

		const listing = await API.createChat(GHOST_CHAT.title)

		setAllChats([...listing.chats, ...allChats])
		setAllChatsPagination({ ...allChatsPagination, count: allChatsPagination.count + 1 })
		setAllChatsLoading(false)

		return listing.chats[0] || null
	}

	const updateChat = async (chatId: number, title?: string): Promise<Chat | null> => {
		const listing = await API.updateChat(chatId, title)
		const chat = listing.chats[0]

		if (chat) {
			const index = allChats.findIndex((chat: Chat) => chat.id === chatId)
			if (index > -1) {
				allChats[index] = chat
				setAllChats([...allChats])
				return chat
			}
		}

		return null
	}

	useEffect(() => {
		!allChatsPagination.page && loadMoreChats()
	}, [])

	return {
		allChats,
		allChatsPagination,
		allChatsLoading,
		createNewChat,
		loadMoreChats,
		updateChat,
	}
}
