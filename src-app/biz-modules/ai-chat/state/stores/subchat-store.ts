import { API } from '@app/biz-modules/ai-chat/api'
import { useEffect, useState } from 'react'
import { Message, Subchat } from '../../api/types'

export interface SubchatStore {
	activeSubchat: Subchat | null
	subchatMessages: Message[]
	subchatPagination: Pagination
	subchatLoading: ListLoading
	canLoadSubchatMessages: boolean
	loadActiveSubchat(chatId: number): Promise<boolean | undefined>
	loadMoreSubchatMessages(): void
}

export const subchatDefaults: SubchatStore = {
	activeSubchat: null,
	subchatMessages: [],
	subchatPagination: { page: 0, count: 0 },
	subchatLoading: false,
	canLoadSubchatMessages: false,
	loadActiveSubchat: async () => false,
	loadMoreSubchatMessages: () => {},
}

export const useSubchatStore = (allSubchats: Subchat[]): SubchatStore => {
	const [activeSubchat, setActiveSubchat] = useState(null as Subchat | null)
	const [subchatMessages, setSubchatMessages] = useState([] as Message[])
	const [subchatPagination, setSubchatPagination] = useState({ page: 0, count: 0 } as Pagination)
	const [subchatLoading, setSubchatLoading] = useState<ListLoading>(false)
	const [pendingSubchatId, setPendingSubchatId] = useState(0)

	const canLoadSubchatMessages = !subchatMessages.length || subchatMessages.length < subchatPagination.count

	const loadActiveSubchat = async (subchatId: number) => {
		if (subchatLoading || isNaN(subchatId) || subchatId === activeSubchat?.id) return

		const subchat = allSubchats.find((subchat: Subchat) => subchat.id === subchatId) || null

		setActiveSubchat(subchat)
		setPendingSubchatId(subchat ? 0 : subchatId)
		setSubchatMessages([])
		setSubchatPagination({ page: 0, count: 0 })

		return Boolean(subchat)
	}

	const loadMoreSubchatMessages = async () => {
		if (subchatLoading || !activeSubchat || !canLoadSubchatMessages) return

		setSubchatLoading(subchatPagination.page === 0 ? 'full' : 'more')

		const listing = await API.getMessages(activeSubchat.chatId, activeSubchat.id, subchatPagination.page + 1)

		setSubchatMessages([...listing.messages, ...subchatMessages])
		setSubchatLoading(false)
		setSubchatPagination({ page: subchatPagination.page + 1, count: listing.count })
	}

	useEffect(() => {
		!subchatPagination.page && loadMoreSubchatMessages()
	}, [activeSubchat])

	useEffect(() => {
		if (pendingSubchatId && !activeSubchat) {
			loadActiveSubchat(pendingSubchatId)
		}
	}, [allSubchats])

	return {
		activeSubchat,
		subchatMessages,
		subchatPagination,
		subchatLoading,
		canLoadSubchatMessages,
		loadActiveSubchat,
		loadMoreSubchatMessages,
	}
}
