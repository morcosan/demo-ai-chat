import { useState } from 'react'
import { SearchResult } from '../../api/types'

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

	const canLoadSearchResults = !searchResults.length || searchResults.length < searchPagination.count

	const searchByKeyword = async (keyword: string) => {
		console.log(keyword, searchLoading)

		if (searchLoading) return
		if (!keyword) {
			clearSearch()
			return
		}

		setSearchKeyword(keyword)
		setSearchLoading('full')

		await wait(2000)

		setSearchLoading(false)
	}

	const clearSearch = () => {
		setSearchKeyword('')
		setSearchResults([])
		setSearchPagination({ page: 0, count: 0 })
	}

	const loadMoreSearchResults = () => {
		if (searchLoading || !canLoadSearchResults) return
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
