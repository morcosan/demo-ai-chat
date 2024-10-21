import { uniq, uniqBy } from 'lodash'
import { useMemo, useState } from 'react'
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
import { SearchContext, SearchResult, Store } from './context'

interface StateData {
	keyword: string
	prevResults: SearchResult[]
	prevChats: Chat[]
	prevSubchats: Subchat[]
	pagination: Pagination
}

interface ReferenceData {
	messageListing: MessageListing
	prevChats: Chat[]
	prevSubchats: Subchat[]
}

const PROMISE_CHAT_LISTING: Promise<ChatListing> = Promise.resolve({ chats: [], count: 0 })
const PROMISE_SUBCHAT_LISTING: Promise<SubchatListing> = Promise.resolve({ subchats: [], count: 0 })
const PROMISE_MESSAGE_LISTING: Promise<MessageListing> = Promise.resolve({ messages: [], count: 0 })

export const SearchProvider = ({ children }: ReactProps) => {
	const [showsSearch, setShowsSearch] = useState(false)
	const [searchKeyword, setSearchKeyword] = useState('')
	const [searchResults, setSearchResults] = useState<SearchResult[]>([])
	const [chatPagination, setChatPagination] = useState<Pagination>({ page: 0, count: 0 })
	const [messagePagination, setMessagePagination] = useState<Pagination>({ page: 0, count: 0 })
	const [searchLoading, setSearchLoading] = useState<ListLoading>(false)
	const [refChats, setRefChats] = useState<Chat[]>([])
	const [refSubchats, setRefSubchats] = useState<Subchat[]>([])

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
		setRefChats([])
		setRefSubchats([])
		setSearchResults([])
		setMessagePagination({ page: 0, count: 0 })
	}

	const loadMoreSearchResults = () => {
		if (searchLoading || !canLoadSearchResults || !searchKeyword) return

		setSearchLoading('more')
		fetchResults({
			keyword: searchKeyword,
			prevResults: searchResults,
			prevChats: refChats,
			prevSubchats: refSubchats,
			pagination: searchPagination,
		})
	}

	const fetchResults = async ({ keyword, prevResults, prevChats, prevSubchats, pagination }: StateData) => {
		const chatResults = prevResults.filter((result: SearchResult) => !result.message)
		const loadingChats = !chatPagination.page || chatPagination.count > chatResults.length
		const loadingMessages = !pagination.page || !loadingChats

		const [chatListing, messageListing] = await Promise.all([
			loadingChats //
				? API.getChats([], chatPagination.page + 1, keyword)
				: PROMISE_CHAT_LISTING,
			loadingMessages
				? API.getMessages(0, 0, pagination.page - chatPagination.page + 1, keyword)
				: PROMISE_MESSAGE_LISTING,
		])

		prevChats = uniqBy([...prevChats, ...chatListing.chats], (chat: Chat) => chat.id)

		const { refChats, refSubchats } = await fetchReferences({ messageListing, prevChats, prevSubchats })

		const results: SearchResult[] = [
			...prevResults,
			...chatListing.chats.map((chat: Chat) => ({ chat })),
			...messageListing.messages.map((message: Message) => ({
				message,
				chat: refChats.find((chat: Chat) => chat.id === message.parentId),
				subchat: refSubchats.find((subchat: Subchat) => subchat.id === message.parentId),
			})),
		]

		setRefChats(refChats)
		setRefSubchats(refSubchats)
		setSearchResults(results)
		loadingChats && setChatPagination({ page: chatPagination.page + 1, count: chatListing.count })
		loadingMessages && setMessagePagination({ page: messagePagination.page + 1, count: messageListing.count })
		setSearchLoading(false)
	}

	const fetchReferences = async ({ messageListing, prevChats, prevSubchats }: ReferenceData) => {
		const newChatIds = uniq(
			messageListing.messages
				.map((message: Message) => message.chatId)
				.filter((id: number) => !prevChats.some((chat: Chat) => chat.id === id))
		)
		const newSubchatIds = uniq(
			messageListing.messages
				.filter((message: Message) => message.parentId !== message.chatId)
				.map((message: Message) => message.parentId)
				.filter((id: number) => !prevSubchats.some((subchat: Subchat) => subchat.id === id))
		)

		const [chatListing, subchatListing] = await Promise.all([
			newChatIds.length ? API.getChats(newChatIds) : PROMISE_CHAT_LISTING,
			newSubchatIds.length ? API.getSubchats(0, newSubchatIds) : PROMISE_SUBCHAT_LISTING,
		])

		return {
			refChats: [...prevChats, ...chatListing.chats],
			refSubchats: [...prevSubchats, ...subchatListing.subchats],
		}
	}

	const store: Store = useMemo(
		() => ({
			showsSearch,
			searchKeyword,
			searchResults,
			searchPagination,
			searchLoading,
			canLoadSearchResults,
			loadMoreSearchResults,
			searchByKeyword,
			setShowsSearch,
		}),
		[showsSearch, searchKeyword, searchResults, searchPagination, searchLoading, canLoadSearchResults]
	)

	return <SearchContext.Provider value={store}>{children}</SearchContext.Provider>
}
