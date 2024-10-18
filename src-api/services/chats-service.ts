import { addMinutesToDate } from '@api/utilities/various'
import { randomId, randomInt, randomLongText, randomText } from '@utils/release'
import {
	ApiResponse,
	ChatsApiData,
	ChatsApiPayload,
	ChatsApiQuery,
	DbChat,
	DbMessage,
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
import { DB__CHATS, DB__MESSAGES, getChatSize } from './_db'

const DEFAULT_COUNT = 10
const DEFAULT_PAGE = 1

export const chatsService = {
	async getChats(query: ChatsApiQuery): Promise<ApiResponse<ChatsApiData>> {
		const page = extractInt(query.page, DEFAULT_PAGE, isGreaterThanZero)
		const count = extractInt(query.count, DEFAULT_COUNT, isGreaterThanZero)
		const chatIds = extractIntArray(query.chatIds, isGreaterThanZero)
		const search = query.search?.toLowerCase()

		if (chatIds.length) {
			const chats = DB__CHATS.filter((chat: DbChat) => chatIds.includes(chat.id))

			return {
				status: STATUS__SUCCESS,
				data: {
					count: chats.length,
					items: chats.map((chat: DbChat) => ({ ...chat, size: getChatSize(chat) })),
				},
			}
		} else {
			const chats = search
				? DB__CHATS.filter((chat: DbChat) => chat.title.toLowerCase().includes(search))
				: DB__CHATS

			if (!isValidPagination(page, count, DB__CHATS.length)) {
				return { ...RESP__NOT_FOUND, error: `Page ${page} not found for ${DB__CHATS.length} chats` }
			}

			const pageChats = chats.slice(count * (page - 1), count * page)

			return {
				status: STATUS__SUCCESS,
				data: {
					count: chats.length,
					items: pageChats.map((chat: DbChat) => ({ ...chat, size: getChatSize(chat) })),
				},
			}
		}
	},

	async postChat(payload: ChatsApiPayload): Promise<ApiResponse<ChatsApiData>> {
		const { title } = payload

		if (!title) return { ...RESP__NOT_FOUND, error: `Title is empty` }

		const chat: DbChat = {
			id: randomId(),
			title: title,
			createdAt: new Date().toISOString(),
		}
		DB__CHATS.unshift(chat)

		return {
			status: STATUS__SUCCESS,
			data: { count: 1, items: [{ ...chat, size: getChatSize(chat) }] },
		}
	},

	async putChat(payload: ChatsApiPayload): Promise<ApiResponse<ChatsApiData>> {
		const { chatId, title } = payload

		const chat = DB__CHATS.find((chat: DbChat) => chat.id === chatId)
		if (!chat) return { ...RESP__NOT_FOUND, error: `Chat ID ${chatId} not found` }

		chat.title = title || randomText()

		return {
			status: STATUS__SUCCESS,
			data: { count: 1, items: [{ ...chat, size: getChatSize(chat) }] },
		}
	},

	async getSubchats(query: SubchatsApiQuery): Promise<ApiResponse<SubchatsApiData>> {
		const page = extractInt(query.page, DEFAULT_PAGE, isGreaterThanZero)
		const count = extractInt(query.count, DEFAULT_COUNT, isGreaterThanZero)
		const chatId = extractInt(query.chatId, 0, isGreaterThanZero)
		const subchatIds = extractIntArray(query.subchatIds, isGreaterThanZero)

		const dtoFn = (message: DbMessage): SubchatDTO => ({
			id: message.id,
			chatId: message.chatId,
			text: message.text,
			size: (DB__MESSAGES.filter((other: DbMessage) => other.parentId === message.id).length || -1) + 1,
			createdAt: message.createdAt,
		})

		if (subchatIds.length) {
			const items = DB__MESSAGES.filter((message: DbMessage) => subchatIds.includes(message.id)).map(dtoFn)

			return {
				status: STATUS__SUCCESS,
				data: { count: items.length, items },
			}
		} else {
			if (!chatId) return { ...RESP__NOT_FOUND, error: `Chat ID ${query.chatId} not found` }

			const db = DB__MESSAGES.filter((message: DbMessage) => message.chatId === chatId)
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
		const search = query.search?.toLowerCase()
		let allMessages
		let pageMessages

		if (search) {
			allMessages = DB__MESSAGES.filter((message: DbMessage) => message.text.toLowerCase().includes(search))

			if (!isValidPagination(page, count, allMessages.length)) {
				return { ...RESP__NOT_FOUND, error: `Page ${page} not found for ${allMessages.length} messages` }
			}

			pageMessages = [...allMessages].reverse().slice(count * (page - 1), count * page)
		} else {
			if (!chatId) return { ...RESP__NOT_FOUND, error: `Chat ID ${query.chatId} not found` }

			const db = DB__MESSAGES.filter((message: DbMessage) => message.chatId === chatId)
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
					subchatSize: (DB__MESSAGES.filter((other: DbMessage) => other.parentId === message.id).length || -1) + 1,
				})),
			},
		}
	},

	async postMessage(payload: MessagesApiPayload): Promise<ApiResponse<MessagesApiData>> {
		const { chatId, subchatId, text } = payload

		if (!chatId) return { ...RESP__NOT_FOUND, error: `Chat ID ${chatId} not found` }
		if (!text) return { ...RESP__NOT_FOUND, error: `Text is empty` }

		if (subchatId) {
			const exists = DB__MESSAGES.some((msg: DbMessage) => msg.chatId === chatId && msg.id === subchatId)
			if (!exists) return { ...RESP__NOT_FOUND, error: `Subchat ID ${subchatId} not found` }
		}

		const userMessage: DbMessage = {
			id: randomId(),
			chatId: chatId,
			parentId: subchatId || chatId,
			text: text,
			role: 'user',
			createdAt: new Date().toISOString(),
		}
		const agentMessage: DbMessage = {
			id: randomId(),
			chatId: chatId,
			parentId: subchatId || chatId,
			text: `"${text}": ` + randomLongText(randomInt(1, 40)),
			role: 'agent',
			createdAt: addMinutesToDate(userMessage.createdAt, 1).toISOString(),
		}

		DB__MESSAGES.push(userMessage, agentMessage)

		return {
			status: STATUS__SUCCESS,
			data: {
				count: 2,
				items: [userMessage, agentMessage].map((message: DbMessage) => ({ ...message, subchatSize: 0 })),
			},
		}
	},
}
