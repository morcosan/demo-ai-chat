import { randomArray, randomId, randomRecentDate, randomText } from '@utils/release'
import { ApiResponse, Chat, ChatsResponse, ChatsUrlQuery, MessagesUrlQuery, STATUS__SUCCESS } from '../types'
import { RESP__NOT_FOUND } from '../utilities/network'
import { extractInt, isGreaterThanZero } from '../utilities/parsers'
import { isValidPagination } from '../utilities/validators'

const DEFAULT_COUNT = 10
const DEFAULT_PAGE = 1

const _chats: Chat[] = []

export const chatsService = {
	init() {
		randomArray(3, 100).forEach(() => {
			_chats.push({
				id: randomId(),
				title: randomText(),
				createDate: randomRecentDate(),
			})
		})
	},

	async getChats(query: ChatsUrlQuery): Promise<ApiResponse<ChatsResponse>> {
		const page = extractInt(query.page, DEFAULT_PAGE, isGreaterThanZero)
		const count = extractInt(query.count, DEFAULT_COUNT, isGreaterThanZero)

		if (!isValidPagination(page, count, _chats.length)) {
			return { ...RESP__NOT_FOUND, error: `Page ${page} not found for ${_chats.length} chats` }
		}

		return {
			status: STATUS__SUCCESS,
			data: {
				count: _chats.length,
				items: _chats.slice(count * (page - 1), count * page),
			},
		}
	},

	async getMessages(query: MessagesUrlQuery): Promise<ApiResponse<[]>> {
		console.log(query)
		return {
			status: STATUS__SUCCESS,
			data: [],
		}
	},
}
