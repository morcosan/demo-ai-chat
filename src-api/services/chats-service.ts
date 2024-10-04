import { addMinutesToDate } from '@api/utilities/various'
import { randomId, randomInt, randomLongText } from '@utils/src/random'
import {
	ApiResponse,
	Chat,
	ChatsApiData,
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
import { DB__CHATS, DB__MESSAGES } from './_db'

const DEFAULT_COUNT = 10
const DEFAULT_PAGE = 1

export const chatsService = {
	async getChats(query: ChatsApiQuery): Promise<ApiResponse<ChatsApiData>> {
		const page = extractInt(query.page, DEFAULT_PAGE, isGreaterThanZero)
		const count = extractInt(query.count, DEFAULT_COUNT, isGreaterThanZero)
		const chatIds = extractIntArray(query.chatIds, isGreaterThanZero)

		if (chatIds.length) {
			const items = DB__CHATS.filter((chat: Chat) => chatIds.includes(chat.id))
			return {
				status: STATUS__SUCCESS,
				data: { count: items.length, items },
			}
		}

		if (!isValidPagination(page, count, DB__CHATS.length)) {
			return { ...RESP__NOT_FOUND, error: `Page ${page} not found for ${DB__CHATS.length} chats` }
		}

		return {
			status: STATUS__SUCCESS,
			data: {
				count: DB__CHATS.length,
				items: DB__CHATS.slice(count * (page - 1), count * page),
			},
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
			size: db.filter((other: Message) => other.subchatId === message.id).length,
			datetime: message.datetime,
		})

		if (subchatIds.length) {
			const items = db.filter((message: Message) => subchatIds.includes(message.id)).map(dtoFn)
			return {
				status: STATUS__SUCCESS,
				data: { count: items.length, items },
			}
		}

		const subchats = db.filter((message: Message) => message.subchatId === message.id).map(dtoFn)

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

		if (!chatId) return { ...RESP__NOT_FOUND, error: `Chat ID ${query.chatId} not found` }

		const db = DB__MESSAGES.filter((message: Message) => message.chatId === chatId)
		const messages = subchatId
			? db.filter((message: Message) => message.subchatId === subchatId)
			: db.filter((message: Message) => message.parentId === chatId)

		if (!isValidPagination(page, count, messages.length)) {
			return { ...RESP__NOT_FOUND, error: `Page ${page} not found for ${messages.length} messages` }
		}

		return {
			status: STATUS__SUCCESS,
			data: {
				count: messages.length,
				items: messages.slice(-count * page, -count * (page - 1) || undefined).map((message: Message) => ({
					...message,
					subchatSize: db.filter((other: Message) => other.subchatId === message.id).length,
				})),
			},
		}
	},

	async postMessage(payload: MessagesApiPayload): Promise<ApiResponse<MessagesApiData>> {
		const { chatId, subchatId, text } = payload

		if (!chatId) return { ...RESP__NOT_FOUND, error: `Chat ID ${chatId} not found` }
		if (!text) return { ...RESP__NOT_FOUND, error: `Text ${text} is empty` }

		const userMessage: Message = {
			id: randomId(),
			chatId: chatId,
			subchatId: 0,
			parentId: chatId,
			text: text,
			role: 'user',
			datetime: new Date().toISOString(),
		}
		const agentMessage: Message = {
			id: randomId(),
			chatId: chatId,
			subchatId: 0,
			parentId: chatId,
			text: text + ' ' + randomLongText(randomInt(5, 20)),
			role: 'agent',
			datetime: addMinutesToDate(userMessage.datetime, 1).toISOString(),
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
