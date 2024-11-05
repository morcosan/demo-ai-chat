import { uniqBy } from 'lodash'
import { useEffect, useState } from 'react'
import { API, Chat } from '../../../api'
import { getNewChat } from './_utils'

export interface AllChatsStore {
	allChats: Chat[]
	allChatsPagination: Pagination
	allChatsLoading: ListLoading
	canLoadAllChats: boolean
	createNewChat(): Promise<Chat | null>
	deleteChats(chatIds: number[]): Promise<void>
	loadMoreChats(): void
	updateChat(chatId: number, title?: string): Promise<Chat | null>
}

export const allChatsDefaults: AllChatsStore = {
	allChats: [],
	allChatsPagination: { page: 0, count: 0 },
	allChatsLoading: false,
	canLoadAllChats: false,
	createNewChat: async () => null,
	deleteChats: async () => {},
	loadMoreChats: () => {},
	updateChat: async () => null,
}

export const useAllChatsStore = (): AllChatsStore => {
	const [allChats, setAllChats] = useState<Chat[]>([])
	const [allChatsPagination, setAllChatsPagination] = useState<Pagination>({ page: 0, count: 0 })
	const [allChatsLoading, setAllChatsLoading] = useState<ListLoading>(false)

	const canLoadAllChats = !allChatsPagination.page || allChats.length < allChatsPagination.count

	const loadMoreChats = async (reload?: boolean, prevChats: Chat[] = allChats) => {
		if (allChatsLoading || !canLoadAllChats) return

		setAllChatsLoading(allChatsPagination.page === 0 ? 'full' : 'more')

		const page = allChatsPagination.page + (reload ? 0 : 1)
		const listing = await API.getChats([], page)

		setAllChats(uniqBy([...prevChats, ...listing.chats], (chat: Chat) => chat.id))
		setAllChatsPagination({ page, count: listing.count })
		setAllChatsLoading(false)
	}

	const createNewChat = async (): Promise<Chat | null> => {
		if (allChatsLoading) return null

		const newChat = getNewChat()

		setAllChatsLoading('update')
		setAllChats([newChat, ...allChats])

		const listing = await API.createChat(newChat.title)

		setAllChats([...listing.chats, ...allChats])
		setAllChatsPagination({ ...allChatsPagination, count: allChatsPagination.count + 1 })
		setAllChatsLoading(false)

		return listing.chats[0] || null
	}

	const updateChat = async (chatId: number, title?: string): Promise<Chat | null> => {
		const index = allChats.findIndex((chat: Chat) => chat.id === chatId)
		if (index > -1) {
			allChats[index].title = title || '...'
			allChats[index].updating = true
		}
		setAllChats([...allChats])

		const listing = await API.updateChat(chatId, title)

		const newChat = listing.chats[0]
		if (newChat) {
			const index = allChats.findIndex((chat: Chat) => chat.id === chatId)
			if (index > -1) {
				allChats[index] = newChat
				setAllChats([...allChats])
				return newChat
			}
		}

		return null
	}

	const deleteChats = async (chatIds: number[]): Promise<void> => {
		const indexes = chatIds
			.map((chatId: number) => allChats.findIndex((chat: Chat) => chat.id === chatId))
			.filter((index: number) => index > -1)

		indexes.forEach((index: number) => (allChats[index].deleting = true))
		setAllChats([...allChats])

		const listing = await API.deleteChats(chatIds)
		const success = listing.count === allChatsPagination.count - chatIds.length

		if (success) {
			const newChats = allChats.filter((chat: Chat) => !chatIds.includes(chat.id))

			setAllChats(newChats)
			setAllChatsPagination({ page: allChatsPagination.page, count: listing.count })

			if (allChatsPagination.page === 1) {
				// Reload first page to avoid breaking load-on-scroll
				loadMoreChats(true, newChats)
			}
		} else {
			indexes.forEach((index: number) => (allChats[index].deleting = false))
			setAllChats([...allChats])
		}
	}

	useEffect(() => {
		!allChatsPagination.page && loadMoreChats()
	}, [])

	return {
		allChats,
		allChatsPagination,
		allChatsLoading,
		canLoadAllChats,
		createNewChat,
		deleteChats,
		loadMoreChats,
		updateChat,
	}
}
