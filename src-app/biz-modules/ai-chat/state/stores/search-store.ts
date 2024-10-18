import { uniq, uniqBy } from 'lodash'
import { useState } from 'react'
import { API, Chat, Message, MIN_SEARCH_LENGTH, SearchResult, Subchat } from '../../api'

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
	const [searchResults, setSearchResults] = useState([] as SearchResult[])
	const [searchPagination, setSearchPagination] = useState({ page: 0, count: 0 } as Pagination)
	const [searchLoading, setSearchLoading] = useState<ListLoading>(false)
	const [searchChats, setSearchChats] = useState<Chat[]>([])
	const [searchSubchats, setSearchSubchats] = useState<Subchat[]>([])

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
		setSearchResults([])
		setSearchChats([])
		setSearchSubchats([])
		setSearchPagination({ page: 0, count: 0 })
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
		const messageListing = await API.getMessages(0, 0, keyword, pagination.page + 1)

		const newChatIds = uniq(
			messageListing.messages
				.map((message: Message) => message.chatId)
				.filter((id: number) => !prevChats.some((chat: Chat) => chat.id === id))
		)
		const chatListing = await API.getChats(newChatIds)
		const newChats = uniqBy([...prevChats, ...chatListing.chats], (chat: Chat) => chat.id)

		const newResults = messageListing.messages.map(
			(message: Message): SearchResult => ({
				...message,
				chat: newChats.find((chat) => chat.id === message.chatId) as Chat,
			})
		)

		setSearchChats(newChats)
		setSearchResults([...prevResults, ...newResults])
		setSearchPagination({ page: pagination.page + 1, count: messageListing.count })
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
