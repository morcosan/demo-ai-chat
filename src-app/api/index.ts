import { mockAPI } from '@api/mock'
import { ApiResponse, ChatsResponse, ChatsUrlQuery, UrlQuery } from '@api/types'
import { STATUS_SUCCESS } from '@api/types/constants'
import { mapDtoToChat } from './mappers'
import { ChatListing } from './types'

export const API = {
	async getChats(page?: number): Promise<ChatListing> {
		const query: ChatsUrlQuery = {
			count: 20,
			page: page || 1,
		}
		const resp = (await mockAPI.get('/api/chats', query as UrlQuery)) as ApiResponse<ChatsResponse | null>

		return resp.status === STATUS_SUCCESS && resp.data
			? { chats: resp.data.items.map(mapDtoToChat), count: resp.data.count }
			: { chats: [], count: 0 }
	},
}
