import { uniq, uniqBy } from 'lodash'
import { useState } from 'react'
import {
	API,
	Chat,
	ChatListing,
	Message,
	MessageListing,
	MIN_SEARCH_LENGTH,
	Subchat,
	SubchatListing,
} from '../../api'

export interface SearchResult {
	chat?: Chat
	subchat?: Subchat
	message?: Message
}

export interface SearchStore {
	showsSearch: boolean
	searchKeyword: string
	searchResults: SearchResult[]
	searchPagination: Pagination
	searchLoading: ListLoading
	canLoadSearchResults: boolean
	loadMoreSearchResults(): void
	searchByKeyword(keyword: string): Promise<void>
	setShowsSearch(value: boolean): void
}

export const searchDefaults: SearchStore = {
	showsSearch: false,
	searchKeyword: '',
	searchResults: [],
	searchPagination: { page: 0, count: 0 },
	searchLoading: false,
	canLoadSearchResults: false,
	loadMoreSearchResults: () => {},
	searchByKeyword: async () => {},
	setShowsSearch: () => {},
}

export const useSearchStore = (): SearchStore => {
	const [showsSearch, setShowsSearch] = useState(false)
	const [searchKeyword, setSearchKeyword] = useState('')
	const [searchResults, setSearchResults] = useState<SearchResult[]>([])
	const [chatPagination, setChatPagination] = useState<Pagination>({ page: 0, count: 0 })
	const [messagePagination, setMessagePagination] = useState<Pagination>({ page: 0, count: 0 })
	const [searchLoading, setSearchLoading] = useState<ListLoading>(false)
	const [searchChats, setSearchChats] = useState<Chat[]>([])
	const [searchSubchats, setSearchSubchats] = useState<Subchat[]>([])

	const searchPagination = {
		page: chatPagination.page + messagePagination.page,
		count: chatPagination.count + messagePagination.count,
	}
	const canLoadSearchResults = !searchResults.length || searchResults.length < searchPagination.count

	const searchByKeyword = async (keyword: string) => {
		if (searchLoading) return
		if (!keyword || keyword.length < MIN_SEARCH_LENGTH) {
			clearSearch()
			return
		}

		setSearchKeyword(keyword)
		setSearchLoading('full')
		fetchResults({
			keyword,
			prevResults: [],
			prevChats: [],
			prevSubchats: [],
			pagination: { page: 0, count: 0 },
		})
	}

	const clearSearch = () => {
		setSearchKeyword('')
		setSearchChats([])
		setSearchSubchats([])
		setSearchResults([])
		setMessagePagination({ page: 0, count: 0 })
	}

	const loadMoreSearchResults = () => {
		if (searchLoading || !canLoadSearchResults || !searchKeyword) return

		setSearchLoading('more')
		fetchResults({
			keyword: searchKeyword,
			prevResults: searchResults,
			prevChats: searchChats,
			prevSubchats: searchSubchats,
			pagination: searchPagination,
		})
	}

	interface SyncedData {
		keyword: string
		prevResults: SearchResult[]
		prevChats: Chat[]
		prevSubchats: Subchat[]
		pagination: Pagination
	}

	const fetchResults = async ({ keyword, prevResults, prevChats, prevSubchats, pagination }: SyncedData) => {
		const chatResultsCount = prevResults.filter((result: SearchResult) => !result.message).length
		const needsChats = !chatPagination.page || chatPagination.count > chatResultsCount
		const needsMessages = !pagination.page || !needsChats
		const messagesPage = pagination.page - chatPagination.page

		const [chatResultsListing, messageResultsListing]: [ChatListing, MessageListing] = await Promise.all([
			needsChats ? API.getChats([], chatPagination.page + 1, keyword) : Promise.resolve({ chats: [], count: 0 }),
			needsMessages
				? API.getMessages(0, 0, messagesPage + 1, keyword)
				: Promise.resolve({ messages: [], count: 0 }),
		])

		prevChats = uniqBy([...prevChats, ...chatResultsListing.chats], (chat: Chat) => chat.id)

		const newChatIds = uniq(
			messageResultsListing.messages
				.map((message: Message) => message.chatId)
				.filter((id: number) => !prevChats.some((chat: Chat) => chat.id === id))
		)
		const newSubchatIds = uniq(
			messageResultsListing.messages
				.filter((message: Message) => message.parentId !== message.chatId)
				.map((message: Message) => message.parentId)
				.filter((id: number) => !prevSubchats.some((subchat: Subchat) => subchat.id === id))
		)

		const [chatListing, subchatListing]: [ChatListing, SubchatListing] = await Promise.all([
			newChatIds.length ? API.getChats(newChatIds) : Promise.resolve({ chats: [], count: 0 }),
			newSubchatIds.length ? API.getSubchats(0, newSubchatIds) : Promise.resolve({ subchats: [], count: 0 }),
		])

		const allChats = [...prevChats, ...chatListing.chats]
		const allSubchats = [...prevSubchats, ...subchatListing.subchats]

		const newResults: SearchResult[] = [
			...chatResultsListing.chats.map((chat: Chat) => ({ chat })),
			...messageResultsListing.messages.map((message: Message) => ({
				message,
				chat: allChats.find((chat: Chat) => chat.id === message.parentId),
				subchat: allSubchats.find((subchat: Subchat) => subchat.id === message.parentId),
			})),
		]

		setSearchChats(allChats)
		setSearchSubchats(allSubchats)
		setSearchResults([...prevResults, ...newResults])
		needsChats && setChatPagination({ page: chatPagination.page + 1, count: chatResultsListing.count })
		needsMessages && setMessagePagination({ page: messagePagination.page + 1, count: messageResultsListing.count })
		setSearchLoading(false)
	}

	return {
		showsSearch,
		searchKeyword,
		searchResults,
		searchPagination,
		searchLoading,
		canLoadSearchResults,
		loadMoreSearchResults,
		searchByKeyword,
		setShowsSearch,
	}
}
