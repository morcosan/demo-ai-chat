import { useEffect, useState } from 'react'
import { API } from '../../api'
import { Subchat } from '../../api/types'
import { ChatStore } from './chat-store'

export interface AllSubchatsStore {
	allSubchats: Subchat[]
	allSubchatsPagination: Pagination
	allSubchatsLoading: ListLoading
	loadMoreSubchats(): void
	resetAllSubchats(): void
	updateSubchat(subchat: Subchat): void
}

export const allSubchatsDefaults: AllSubchatsStore = {
	allSubchats: [],
	allSubchatsPagination: { page: 0, count: 0 },
	allSubchatsLoading: false,
	loadMoreSubchats: () => {},
	resetAllSubchats: () => {},
	updateSubchat: () => {},
}

export const useAllSubchatsStore = (chatStore: ChatStore): AllSubchatsStore => {
	const { activeChat } = chatStore
	const [allSubchats, setAllSubchats] = useState([] as Subchat[])
	const [allSubchatsPagination, setAllSubchatsPagination] = useState({ page: 0, count: 0 } as Pagination)
	const [allSubchatsLoading, setAllSubchatsLoading] = useState<ListLoading>(false)

	const canLoadAllSubchats = !allSubchats.length || allSubchats.length < allSubchatsPagination.count

	const loadMoreSubchats = async () => {
		if (allSubchatsLoading || !activeChat || !activeChat.id || !canLoadAllSubchats) return

		setAllSubchatsLoading(allSubchatsPagination.page === 0 ? 'full' : 'more')

		const listing = await API.getSubchats(activeChat.id, [], allSubchatsPagination.page + 1)

		setAllSubchats([...allSubchats, ...listing.subchats])
		setAllSubchatsLoading(false)
		setAllSubchatsPagination({ page: allSubchatsPagination.page + 1, count: listing.count })
	}

	const updateSubchat = (subchat: Subchat) => {
		const index = allSubchats.findIndex((other: Subchat) => other.id === subchat.id)
		allSubchats[index] = subchat
		setAllSubchats([...allSubchats])
	}

	const resetAllSubchats = () => {
		setAllSubchats([])
		setAllSubchatsPagination({ page: 0, count: 0 })
	}

	useEffect(() => {
		resetAllSubchats()
	}, [activeChat])

	useEffect(() => {
		!allSubchatsPagination.page && loadMoreSubchats()
	}, [allSubchatsPagination])

	return {
		allSubchats,
		allSubchatsPagination,
		allSubchatsLoading,
		resetAllSubchats,
		loadMoreSubchats,
		updateSubchat,
	}
}
