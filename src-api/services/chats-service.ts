import { addMinutesToDate } from '@api/utilities/various'
import { randomId, randomInt, randomLongText, randomText } from '@utils/release'
import {
	ApiResponse,
	Chat,
	ChatsApiData,
	ChatsApiPayload,
	ChatsApiQuery,
	Message,
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

		if (chatIds.length) {
			const chats = DB__CHATS.filter((chat: Chat) => chatIds.includes(chat.id))
			return {
				status: STATUS__SUCCESS,
				data: {
					count: chats.length,
					items: chats.map((chat: Chat) => ({ ...chat, size: getChatSize(chat) })),
				},
			}
		}

		if (!isValidPagination(page, count, DB__CHATS.length)) {
			return { ...RESP__NOT_FOUND, error: `Page ${page} not found for ${DB__CHATS.length} chats` }
		}

		const chats = DB__CHATS.slice(count * (page - 1), count * page)

		return {
			status: STATUS__SUCCESS,
			data: {
				count: DB__CHATS.length,
				items: chats.map((chat: Chat) => ({ ...chat, size: getChatSize(chat) })),
			},
		}
	},

	async postChat(payload: ChatsApiPayload): Promise<ApiResponse<ChatsApiData>> {
		const { title } = payload

		if (!title) return { ...RESP__NOT_FOUND, error: `Title is empty` }

		const chat: Chat = {
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

		const chat = DB__CHATS.find((chat: Chat) => chat.id === chatId)
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

		if (!chatId) return { ...RESP__NOT_FOUND, error: `Chat ID ${query.chatId} not found` }

		const db = DB__MESSAGES.filter((message: Message) => message.chatId === chatId)
		const dtoFn = (message: Message): SubchatDTO => ({
			id: message.id,
			chatId: message.chatId,
			text: message.text,
			size: (db.filter((other: Message) => other.parentId === message.id).length || -1) + 1,
			createdAt: message.createdAt,
		})

		if (subchatIds.length) {
			const items = db.filter((message: Message) => subchatIds.includes(message.id)).map(dtoFn)
			return {
				status: STATUS__SUCCESS,
				data: { count: items.length, items },
			}
		}

		const dbSubchatIds = db.filter((msg: Message) => msg.parentId !== chatId).map((msg: Message) => msg.parentId)
		const subchats = db.filter((message: Message) => dbSubchatIds.includes(message.id)).map(dtoFn)

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
	},

	async getMessages(query: MessagesApiQuery): Promise<ApiResponse<MessagesApiData>> {
		const page = extractInt(query.page, DEFAULT_PAGE, isGreaterThanZero)
		const count = extractInt(query.count, DEFAULT_COUNT, isGreaterThanZero)
		const chatId = extractInt(query.chatId, 0, isGreaterThanZero)
		const subchatId = extractInt(query.subchatId, 0, isGreaterThanZero)
		const search = query.search?.toLowerCase()
		let messages

		if (search) {
			messages = DB__MESSAGES.filter((message: Message) => message.text.toLowerCase().includes(search))
		} else {
			if (!chatId) return { ...RESP__NOT_FOUND, error: `Chat ID ${query.chatId} not found` }

			const db = DB__MESSAGES.filter((message: Message) => message.chatId === chatId)
			messages = subchatId
				? db.filter((message: Message) => message.id === subchatId || message.parentId === subchatId)
				: db.filter((message: Message) => message.parentId === chatId)
		}

		if (!isValidPagination(page, count, messages.length)) {
			return { ...RESP__NOT_FOUND, error: `Page ${page} not found for ${messages.length} messages` }
		}

		return {
			status: STATUS__SUCCESS,
			data: {
				count: messages.length,
				items: messages.slice(-count * page, -count * (page - 1) || undefined).map((message: Message) => ({
					...message,
					subchatSize: (DB__MESSAGES.filter((other: Message) => other.parentId === message.id).length || -1) + 1,
				})),
			},
		}
	},

	async postMessage(payload: MessagesApiPayload): Promise<ApiResponse<MessagesApiData>> {
		const { chatId, subchatId, text } = payload

		if (!chatId) return { ...RESP__NOT_FOUND, error: `Chat ID ${chatId} not found` }
		if (!text) return { ...RESP__NOT_FOUND, error: `Text is empty` }

		if (subchatId) {
			const exists = DB__MESSAGES.some((msg: Message) => msg.chatId === chatId && msg.id === subchatId)
			if (!exists) return { ...RESP__NOT_FOUND, error: `Subchat ID ${subchatId} not found` }
		}

		const userMessage: Message = {
			id: randomId(),
			chatId: chatId,
			parentId: subchatId || chatId,
			text: text,
			role: 'user',
			createdAt: new Date().toISOString(),
		}
		const agentMessage: Message = {
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
				items: [userMessage, agentMessage].map((message: Message) => ({ ...message, subchatSize: 0 })),
			},
		}
	},
}
