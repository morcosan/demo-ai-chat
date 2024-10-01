import {
	ApiResponse,
	ChatsApiData,
	ChatsApiQuery,
	Message,
	MessagesApiData,
	MessagesApiQuery,
	STATUS__SUCCESS,
	SubchatsApiData,
	SubchatsApiQuery,
} from '../types'
import { RESP__NOT_FOUND } from '../utilities/network'
import { extractInt, isGreaterThanZero } from '../utilities/parsers'
import { isValidPagination } from '../utilities/validators'
import { DB__CHATS, DB__MESSAGES } from './_db'

const DEFAULT_COUNT = 10
const DEFAULT_PAGE = 1

export const chatsService = {
	async getChats(query: ChatsApiQuery): Promise<ApiResponse<ChatsApiData>> {
		const page = extractInt(query.page, DEFAULT_PAGE, isGreaterThanZero)
		const count = extractInt(query.count, DEFAULT_COUNT, isGreaterThanZero)

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

		if (!chatId) return { ...RESP__NOT_FOUND, error: `Chat ID ${query.chatId} not found` }

		const db = DB__MESSAGES.filter((message: Message) => message.chatId === chatId)
		const subchats = db.filter((message: Message) => message.subchatId === message.id)

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
				items: messages.slice(count * (page - 1), count * page).map((message: Message) => ({
					...message,
					subchatSize: db.filter((other: Message) => other.subchatId === message.id).length,
				})),
			},
		}
	},
}
