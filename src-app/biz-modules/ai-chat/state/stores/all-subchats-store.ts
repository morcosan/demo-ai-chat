import { useEffect, useState } from 'react'
import { API } from '../../api'
import { Chat, Subchat } from '../../api/types'

export interface AllSubchatsStore {
	allSubchats: Subchat[]
	allSubchatsPagination: Pagination
	allSubchatsLoading: ListLoading
	loadMoreSubchats(): void
}

export const allSubchatsDefaults: AllSubchatsStore = {
	allSubchats: [],
	allSubchatsPagination: { page: 0, count: 0 },
	allSubchatsLoading: false,
	loadMoreSubchats: () => {},
}

export const useAllSubchatsStore = (activeChat: Chat | null): AllSubchatsStore => {
	const [allSubchats, setAllSubchats] = useState([] as Subchat[])
	const [allSubchatsPagination, setAllSubchatsPagination] = useState({ page: 0, count: 0 } as Pagination)
	const [allSubchatsLoading, setAllSubchatsLoading] = useState<ListLoading>(false)

	const loadMoreSubchats = async () => {
		if (allSubchatsLoading || !activeChat) return
		if (allSubchats.length && allSubchats.length >= allSubchatsPagination.count) return

		setAllSubchatsLoading(allSubchatsPagination.page === 0 ? 'full' : 'more')

		const listing = await API.getSubchats(activeChat.id, allSubchatsPagination.page + 1)

		setAllSubchats([...allSubchats, ...listing.subchats])
		setAllSubchatsLoading(false)
		setAllSubchatsPagination({ page: allSubchatsPagination.page + 1, count: listing.count })
	}

	useEffect(() => {
		!allSubchatsPagination.page && loadMoreSubchats()
	}, [activeChat])

	return {
		allSubchats,
		allSubchatsPagination,
		allSubchatsLoading,
		loadMoreSubchats,
	}
}
