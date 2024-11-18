import { addMinutesToDate } from '@api/utilities/various'
import { randomText } from '@utils/release'
import {
	ApiResponse,
	ChatsApiData,
	ChatsApiPayload,
	ChatsApiQuery,
	DbChat,
	DbMessage,
	GptMessage,
	MessagesApiData,
	MessagesApiPayload,
	MessagesApiQuery,
	STATUS__SUCCESS,
	SubchatDTO,
	SubchatsApiData,
	SubchatsApiQuery,
} from '../types'
import { RESP__NOT_FOUND } from '../utilities/network'
import { extractInt, extractIntArray, isGreaterThanZero } from '../utilities/parsers'
import { isValidPagination } from '../utilities/validators'
import {
	createChatId,
	createMessageId,
	getDbChats,
	getDbMessages,
	getGptResponse,
	getSizeForChat,
	resetChatsDB,
	setDbChats,
	setDbMessages,
} from './db'

const DEFAULT_COUNT = 10
const DEFAULT_PAGE = 1

export const chatsService = {
	async getChats(query: ChatsApiQuery): Promise<ApiResponse<ChatsApiData>> {
		const page = extractInt(query.page, DEFAULT_PAGE, isGreaterThanZero)
		const count = extractInt(query.count, DEFAULT_COUNT, isGreaterThanZero)
		const chatIds = extractIntArray(query.chatIds, isGreaterThanZero)
		const search = query.search?.trim().toLowerCase()
		const dbChats = getDbChats()

		if (chatIds.length) {
			const chats = dbChats.filter((chat: DbChat) => chatIds.includes(chat.id))

			return {
				status: STATUS__SUCCESS,
				data: {
					count: chats.length,
					items: chats.map((chat: DbChat) => ({ ...chat, size: getSizeForChat(chat) })),
				},
			}
		} else {
			const chats = search ? dbChats.filter((chat: DbChat) => chat.title.toLowerCase().includes(search)) : dbChats

			if (!isValidPagination(page, count, dbChats.length)) {
				return { ...RESP__NOT_FOUND, error: `Page ${page} not found for ${dbChats.length} chats` }
			}

			const pageChats = chats.slice(count * (page - 1), count * page)

			return {
				status: STATUS__SUCCESS,
				data: {
					count: chats.length,
					items: pageChats.map((chat: DbChat) => ({ ...chat, size: getSizeForChat(chat) })),
				},
			}
		}
	},

	async postChat(payload: ChatsApiPayload): Promise<ApiResponse<ChatsApiData>> {
		const title = payload.title

		if (!title) return { ...RESP__NOT_FOUND, error: `Title is empty` }

		const chat: DbChat = {
			id: createChatId(),
			title: title,
			createdAt: new Date().toISOString(),
		}
		setDbChats([chat, ...getDbChats()])

		return {
			status: STATUS__SUCCESS,
			data: { count: 1, items: [{ ...chat, size: getSizeForChat(chat) }] },
		}
	},

	async patchChat(payload: ChatsApiPayload): Promise<ApiResponse<ChatsApiData>> {
		const title = payload.title
		const chatId = extractInt(payload.chatId, 0, isGreaterThanZero)
		const dbChats = getDbChats()

		const chat = dbChats.find((chat: DbChat) => chat.id === chatId)
		if (!chat) return { ...RESP__NOT_FOUND, error: `Chat ID ${chatId} not found` }

		chat.title = title || randomText()

		setDbChats(dbChats)

		return {
			status: STATUS__SUCCESS,
			data: { count: 1, items: [{ ...chat, size: getSizeForChat(chat) }] },
		}
	},

	async deleteChats(query: ChatsApiQuery): Promise<ApiResponse<ChatsApiData>> {
		const chatIds = extractIntArray(query.chatIds, isGreaterThanZero)
		const dbChats = getDbChats()

		chatIds.forEach((chatId: number) => {
			const index = dbChats.findIndex((chat: DbChat) => chat.id === chatId)
			if (index > -1) {
				dbChats.splice(index, 1)
			}
		})

		setDbChats(dbChats)

		return {
			status: STATUS__SUCCESS,
			data: { count: dbChats.length, items: [] },
		}
	},

	async getSubchats(query: SubchatsApiQuery): Promise<ApiResponse<SubchatsApiData>> {
		const page = extractInt(query.page, DEFAULT_PAGE, isGreaterThanZero)
		const count = extractInt(query.count, DEFAULT_COUNT, isGreaterThanZero)
		const chatId = extractInt(query.chatId, 0, isGreaterThanZero)
		const subchatIds = extractIntArray(query.subchatIds, isGreaterThanZero)
		const dbMessages = getDbMessages()

		const dtoFn = (message: DbMessage): SubchatDTO => ({
			id: message.id,
			chatId: message.chatId,
			text: message.text,
			size: (dbMessages.filter((other: DbMessage) => other.parentId === message.id).length || -1) + 1,
			createdAt: message.createdAt,
		})

		if (subchatIds.length) {
			const items = dbMessages.filter((message: DbMessage) => subchatIds.includes(message.id)).map(dtoFn)

			return {
				status: STATUS__SUCCESS,
				data: { count: items.length, items },
			}
		} else {
			if (!chatId) return { ...RESP__NOT_FOUND, error: `Chat ID ${query.chatId} not found` }

			const db = dbMessages.filter((message: DbMessage) => message.chatId === chatId)
			const dbSubchatIds = db
				.filter((msg: DbMessage) => msg.parentId !== chatId)
				.map((msg: DbMessage) => msg.parentId)
			const subchats = db.filter((message: DbMessage) => dbSubchatIds.includes(message.id)).map(dtoFn)

			if (!isValidPagination(page, count, subchats.length)) {
				return { ...RESP__NOT_FOUND, error: `Page ${page} not found for ${subchats.length} subchats` }
			}

			return {
				status: STATUS__SUCCESS,
				data: {
					count: subchats.length,
					items: subchats.slice(count * (page - 1), count * page),
				},
			}
		}
	},

	async getMessages(query: MessagesApiQuery): Promise<ApiResponse<MessagesApiData>> {
		const page = extractInt(query.page, DEFAULT_PAGE, isGreaterThanZero)
		const count = extractInt(query.count, DEFAULT_COUNT, isGreaterThanZero)
		const chatId = extractInt(query.chatId, 0, isGreaterThanZero)
		const subchatId = extractInt(query.subchatId, 0, isGreaterThanZero)
		const search = query.search?.trim().toLowerCase()
		const dbMessages = getDbMessages()
		let allMessages
		let pageMessages

		if (search) {
			allMessages = dbMessages.filter((message: DbMessage) => message.text.toLowerCase().includes(search))

			if (!isValidPagination(page, count, allMessages.length)) {
				return { ...RESP__NOT_FOUND, error: `Page ${page} not found for ${allMessages.length} messages` }
			}

			pageMessages = [...allMessages].reverse().slice(count * (page - 1), count * page)
		} else {
			if (!chatId) return { ...RESP__NOT_FOUND, error: `Chat ID ${query.chatId} not found` }

			const db = dbMessages.filter((message: DbMessage) => message.chatId === chatId)
			allMessages = subchatId
				? db.filter((message: DbMessage) => message.id === subchatId || message.parentId === subchatId)
				: db.filter((message: DbMessage) => message.parentId === chatId)

			if (!isValidPagination(page, count, allMessages.length)) {
				return { ...RESP__NOT_FOUND, error: `Page ${page} not found for ${allMessages.length} messages` }
			}

			pageMessages = allMessages.slice(-count * page, -count * (page - 1) || undefined)
		}

		return {
			status: STATUS__SUCCESS,
			data: {
				count: allMessages.length,
				items: pageMessages.map((message: DbMessage) => ({
					...message,
					subchatSize: (dbMessages.filter((other: DbMessage) => other.parentId === message.id).length || -1) + 1,
				})),
			},
		}
	},

	async postMessage(payload: MessagesApiPayload): Promise<ApiResponse<MessagesApiData>> {
		const text = payload.text
		const chatId = extractInt(payload.chatId, 0, isGreaterThanZero)
		const subchatId = extractInt(payload.subchatId, 0, isGreaterThanZero)
		const agentId = extractInt(payload.agentId, 0, isGreaterThanZero)
		const parentId = subchatId || chatId
		const dbMessages = getDbMessages()

		if (!chatId) return { ...RESP__NOT_FOUND, error: `Chat ID ${chatId} not found` }
		if (!agentId) return { ...RESP__NOT_FOUND, error: `Agent ID ${agentId} not found` }
		if (!text) return { ...RESP__NOT_FOUND, error: `Text is empty` }

		if (subchatId) {
			const exists = dbMessages.some((msg: DbMessage) => msg.chatId === chatId && msg.id === subchatId)
			if (!exists) return { ...RESP__NOT_FOUND, error: `Subchat ID ${subchatId} not found` }
		}

		const gptMessages = dbMessages
			.filter((message: DbMessage) => message.parentId === parentId)
			.map(
				(message: DbMessage): GptMessage => ({
					text: message.text,
					role: message.role,
				})
			)
		const agentResponse = await getGptResponse(agentId, [...gptMessages, { text, role: 'user' }])

		if (!agentResponse) return { ...RESP__NOT_FOUND, error: `GPT for agent ${agentId} not found` }

		const userMessage: DbMessage = {
			id: createMessageId(),
			chatId: chatId,
			parentId: parentId,
			agentId: agentId,
			text: text,
			role: 'user',
			createdAt: new Date().toISOString(),
		}
		const agentMessage: DbMessage = {
			id: createMessageId(),
			chatId: chatId,
			parentId: parentId,
			agentId: agentId,
			text: agentResponse,
			role: 'agent',
			createdAt: addMinutesToDate(userMessage.createdAt, 1).toISOString(),
		}

		setDbMessages([...dbMessages, userMessage, agentMessage])

		return {
			status: STATUS__SUCCESS,
			data: {
				count: 2,
				items: [userMessage, agentMessage].map((message: DbMessage) => ({ ...message, subchatSize: 0 })),
			},
		}
	},

	async resetDB() {
		await resetChatsDB()
	},
}
