import { useEffect, useState } from 'react'
import { API } from '../../api'
import { Chat } from '../../api/types'

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

	const canLoadAllChats = !allChats.length || allChats.length < allChatsPagination.count

	const loadMoreChats = async () => {
		if (allChatsLoading || !canLoadAllChats) return

		setAllChatsLoading(allChatsPagination.page === 0 ? 'full' : 'more')

		const listing = await API.getChats([], allChatsPagination.page + 1)

		setAllChats([...allChats, ...listing.chats])
		setAllChatsLoading(false)
		setAllChatsPagination({ page: allChatsPagination.page + 1, count: listing.count })
	}

	useEffect(() => {
		!allChatsPagination.page && loadMoreChats()
	}, [])

	return {
		allChats,
		allChatsPagination,
		allChatsLoading,
		loadMoreChats,
	}
}
