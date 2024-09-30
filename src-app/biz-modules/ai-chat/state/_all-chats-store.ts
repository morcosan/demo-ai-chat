import { useEffect, useState } from 'react'
import { API } from '../api'
import { Chat, ChatListing } from '../api/types'

export interface AllChatsStore {
	allChats: Chat[]
	allChatsPagination: Pagination
	allChatsLoading: ListLoading
	loadMoreChats(): void
}

export const allChatsDefaults: AllChatsStore = {
	allChats: [],
	allChatsPagination: { page: 0, count: 0 },
	allChatsLoading: false,
	loadMoreChats: () => {},
}

export const useAllChatsStore = (): AllChatsStore => {
	const [allChats, setAllChats] = useState([] as Chat[])
	const [allChatsPagination, setAllChatsPagination] = useState({ page: 0, count: 0 } as Pagination)
	const [allChatsLoading, setAllChatsLoading] = useState<ListLoading>(false)

	const loadMoreChats = async () => {
		if (allChatsLoading) return
		if (allChats.length && allChats.length >= allChatsPagination.count) return

		setAllChatsLoading(allChatsPagination.page === 0 ? 'all' : 'more')

		const listing: ChatListing = await API.getChats(allChatsPagination.page + 1)

		setAllChats([...allChats, ...listing.chats])
		setAllChatsLoading(false)
		setAllChatsPagination({ page: allChatsPagination.page + 1, count: listing.count })
	}

	useEffect(() => {
		if (!allChatsPagination.page) {
			loadMoreChats()
		}
	}, [])

	return {
		allChats,
		allChatsPagination,
		allChatsLoading,
		loadMoreChats,
	}
}
