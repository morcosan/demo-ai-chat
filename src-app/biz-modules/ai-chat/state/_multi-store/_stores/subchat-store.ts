import { API } from '@app/biz-modules/ai-chat/api'
import { uniqBy } from 'lodash'
import { useEffect, useState } from 'react'
import { Message, MessageListing, Subchat } from '../../../api'
import { createGhostMessage } from './_utils'
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
	postSubchatMessage(text: string, agentId: number): void
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
	const [activeSubchat, setActiveSubchat] = useState<Subchat | null>(null)
	const [subchatMessages, setSubchatMessages] = useState<Message[]>([])
	const [subchatPagination, setSubchatPagination] = useState<Pagination>({ page: 0, count: 0 })
	const [subchatLoading, setSubchatLoading] = useState<ListLoading>(false)

	const canLoadSubchatMessages = !subchatPagination.page || subchatMessages.length < subchatPagination.count
	const isActiveLoading = subchatLoading !== false && subchatLoading !== 'error'

	const loadActiveSubchat = async (subchatId: number) => {
		if (isActiveLoading || !activeChat || isNaN(subchatId) || subchatId === activeSubchat?.id) return

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
		setSubchatLoading(false)
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

	const postSubchatMessage = async (text: string, agentId: number) => {
		if (isActiveLoading || !activeChat || !activeSubchat) return

		const ghostCount = subchatMessages.filter((message: Message) => message.id < 0).length
		const messages: Message[] = subchatMessages.filter((message: Message) => message.id > 0)
		const pagination: Pagination = { ...subchatPagination, count: subchatPagination.count - ghostCount }

		setSubchatLoading('update')
		setSubchatMessages([
			...messages,
			createGhostMessage(activeChat.id, activeSubchat.id, 'user', text, agentId),
			createGhostMessage(activeChat.id, activeSubchat.id, 'agent', '', agentId),
		])
		setSubchatPagination({ ...pagination, count: pagination.count + 1 }) // Used for scrolling
		updateChatAndSubchats(pagination.count + 1, false)

		const listing = await API.postMessage(activeChat.id, text, agentId, activeSubchat.id)

		if (listing.count) {
			setSubchatMessages([...messages, ...listing.messages]) // Old state
			setSubchatLoading(false)
		} else {
			setSubchatMessages([
				...messages, // Old state
				createGhostMessage(activeChat.id, activeSubchat.id, 'user', text, agentId, true),
				createGhostMessage(activeChat.id, activeSubchat.id, 'agent', '', agentId, true),
			])
			setSubchatLoading('error')
		}

		setSubchatPagination({ ...pagination, count: pagination.count + 2 }) // Old state, used for scrolling
		updateChatAndSubchats(pagination.count + 2, true)
	}

	const updateChatAndSubchats = (subchatSize: number, final: boolean) => {
		if (!activeSubchat) return

		const message = chatMessages.find((message: Message) => message.id === activeSubchat.id)
		message && updateMessage({ ...message, subchatSize })

		if (final) {
			const subchat = allSubchats.find((subchat: Subchat) => subchat.id === activeSubchat.id)
			subchat ? updateSubchat({ ...subchat, size: subchatSize }) : resetAllSubchats()
		}
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
