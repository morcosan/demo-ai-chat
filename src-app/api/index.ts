import { mockAPI } from '@api/mock'
import { ApiResponse, ChatsResponse, ChatsUrlQuery, UrlQuery } from '@api/types'
import { STATUS_SUCCESS } from '@api/types/constants'
import { mapDtoToChat } from './mappers'
import { Chat } from './types'

export const API = {
	async getChats(page?: number): Promise<Chat[]> {
		const query: ChatsUrlQuery = {
			count: 10,
			page: page || 1,
		}
		const resp = (await mockAPI.get('/api/chats', query as UrlQuery)) as ApiResponse<ChatsResponse | null>

		return resp.status === STATUS_SUCCESS && resp.data ? resp.data.items.map(mapDtoToChat) : []
	},
}
