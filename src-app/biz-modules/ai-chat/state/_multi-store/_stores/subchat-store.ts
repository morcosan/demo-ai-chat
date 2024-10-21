import { API } from '@app/biz-modules/ai-chat/api'
import { uniqBy } from 'lodash'
import { useEffect, useState } from 'react'
import { Message, MessageListing, Subchat } from '../../../api'
import { newGhostMessage } from './_utils'
import { AllSubchatsStore } from './all-subchats-store'
import { ChatStore } from './chat-store'

export interface SubchatStore {
	activeSubchat: Subchat | null
	subchatMessages: Message[]
	subchatPagination: Pagination
	subchatLoading: ListLoading
	canLoadSubchatMessages: boolean
	loadActiveSubchat(chatId: number): Promise<boolean | undefined>
	loadMoreSubchatMessages(): void
	postSubchatMessage(text: string): void
	resetActiveSubchat(): void
}

export const subchatDefaults: SubchatStore = {
	activeSubchat: null,
	subchatMessages: [],
	subchatPagination: { page: 0, count: 0 },
	subchatLoading: false,
	canLoadSubchatMessages: false,
	loadActiveSubchat: async () => false,
	loadMoreSubchatMessages: () => {},
	postSubchatMessage: () => {},
	resetActiveSubchat: () => {},
}

export const useSubchatStore = (chatStore: ChatStore, allSubchatsStore: AllSubchatsStore): SubchatStore => {
	const { activeChat, chatMessages, updateMessage } = chatStore
	const { allSubchats, resetAllSubchats, updateSubchat } = allSubchatsStore
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
		setSubchatMessages([])
		setSubchatPagination({ page: 0, count: 0 })
		setSubchatLoading(false)

		return Boolean(subchat)
	}

	const resetActiveSubchat = () => {
		setActiveSubchat(null)
		setSubchatMessages([])
		setSubchatPagination({ page: 0, count: 0 })
	}

	const getSubchatFromChatMessages = (subchatId: number): Subchat | null => {
		const message = chatStore.chatMessages.find((message: Message) => message.id === subchatId) || null
		if (!message) return null

		return {
			id: message.id,
			chatId: message.chatId,
			text: message.text,
			size: message.subchatSize,
			createdAt: message.createdAt,
		}
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

		setSubchatMessages(uniqBy([...listing.messages, ...subchatMessages], (msg: Message) => msg.id))
		setSubchatPagination({ page: subchatPagination.page + 1, count: listing.count })
		setSubchatLoading(false)
	}

	const postSubchatMessage = async (text: string) => {
		if (subchatLoading || !activeChat || !activeSubchat) return

		setSubchatLoading('update')
		setSubchatMessages([
			...subchatMessages,
			newGhostMessage(activeChat.id, activeSubchat.id, 'user', text),
			newGhostMessage(activeChat.id, activeSubchat.id, 'agent', ''),
		])
		setSubchatPagination({ ...subchatPagination, count: subchatPagination.count + 1 })
		updateChatAndSubchats(subchatPagination.count + 1)

		const listing = await API.postMessage(activeChat.id, activeSubchat.id, text)

		setSubchatMessages([...subchatMessages, ...listing.messages])
		setSubchatPagination({ ...subchatPagination, count: subchatPagination.count + listing.count })
		setSubchatLoading(false)
		updateChatAndSubchats(subchatPagination.count + listing.count)
	}

	const updateChatAndSubchats = (subchatSize: number) => {
		if (!activeSubchat) return

		const message = chatMessages.find((message: Message) => message.id === activeSubchat.id)
		message && updateMessage({ ...message, subchatSize })

		const subchat = allSubchats.find((subchat: Subchat) => subchat.id === activeSubchat.id)
		subchat ? updateSubchat({ ...subchat, size: subchatSize }) : resetAllSubchats()
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
		loadMoreSubchatMessages,
		postSubchatMessage,
		resetActiveSubchat,
	}
}
