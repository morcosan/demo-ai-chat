import { API } from '@app/biz-modules/ai-chat/api'
import { useEffect, useState } from 'react'
import { Message, MessageListing, Subchat } from '../../api/types'
import { AllSubchatsStore } from './all-subchats-store'
import { ChatStore } from './chat-store'

export interface SubchatStore {
	activeSubchat: Subchat | null
	subchatMessages: Message[]
	subchatPagination: Pagination
	subchatLoading: ListLoading
	canLoadSubchatMessages: boolean
	loadActiveSubchat(chatId: number): Promise<boolean | undefined>
	resetActiveSubchat(): void
	loadMoreSubchatMessages(): void
}

export const subchatDefaults: SubchatStore = {
	activeSubchat: null,
	subchatMessages: [],
	subchatPagination: { page: 0, count: 0 },
	subchatLoading: false,
	canLoadSubchatMessages: false,
	loadActiveSubchat: async () => false,
	resetActiveSubchat: () => {},
	loadMoreSubchatMessages: () => {},
}

export const useSubchatStore = (chatStore: ChatStore, allSubchatsStore: AllSubchatsStore): SubchatStore => {
	const { activeChat, chatMessages } = chatStore
	const { allSubchats } = allSubchatsStore
	const [activeSubchat, setActiveSubchat] = useState(null as Subchat | null)
	const [subchatMessages, setSubchatMessages] = useState([] as Message[])
	const [subchatPagination, setSubchatPagination] = useState({ page: 0, count: 0 } as Pagination)
	const [subchatLoading, setSubchatLoading] = useState<ListLoading>(false)

	const canLoadSubchatMessages = !subchatMessages.length || subchatMessages.length < subchatPagination.count

	const loadActiveSubchat = async (subchatId: number) => {
		if (subchatLoading || !activeChat || isNaN(subchatId) || subchatId === activeSubchat?.id) return

		setSubchatLoading('full')

		let subchat = allSubchats.find((subchat: Subchat) => subchat.id === subchatId) || null
		if (!subchat) {
			subchat = getSubchatFromChatMessages(subchatId)
			if (!subchat) {
				const listing = await API.getSubchats(activeChat.id, [subchatId])
				subchat = listing.subchats[0] || null
			}
		}

		setActiveSubchat(subchat)
		setSubchatLoading(false)
		setSubchatMessages([])
		setSubchatPagination({ page: 0, count: 0 })

		return Boolean(subchat)
	}

	const resetActiveSubchat = () => {
		setActiveSubchat(null)
		setSubchatMessages([])
		setSubchatPagination({ page: 0, count: 0 })
	}

	const getSubchatFromChatMessages = (subchatId: number): Subchat | null => {
		const message = chatStore.chatMessages.find((message: Message) => message.id === subchatId) || null

		return message
			? {
					id: message.id,
					chatId: message.chatId,
					text: message.text,
					size: message.subchatSize,
					datetime: message.datetime,
				}
			: null
	}

	const loadMoreSubchatMessages = async () => {
		if (subchatLoading || !activeSubchat || !canLoadSubchatMessages) return

		setSubchatLoading(subchatPagination.page === 0 ? 'full' : 'more')

		let listing: MessageListing = { messages: [], count: 0 }

		if (activeSubchat.size) {
			listing = await API.getMessages(activeSubchat.chatId, activeSubchat.id, subchatPagination.page + 1)
		} else {
			const message = chatMessages.find((message: Message) => message.id === activeSubchat.id)
			if (message) {
				listing = { messages: [message], count: 1 }
			}
		}

		setSubchatMessages([...listing.messages, ...subchatMessages])
		setSubchatLoading(false)
		setSubchatPagination({ page: subchatPagination.page + 1, count: listing.count })
	}

	useEffect(() => {
		!subchatPagination.page && loadMoreSubchatMessages()
	}, [activeSubchat])

	return {
		activeSubchat,
		subchatMessages,
		subchatPagination,
		subchatLoading,
		canLoadSubchatMessages,
		loadActiveSubchat,
		resetActiveSubchat,
		loadMoreSubchatMessages,
	}
}
