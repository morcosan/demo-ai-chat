import { chatsAPI, ChatsResponse, ChatsUrlQuery, STATUS_SUCCESS } from '@app/api'
import { mapDtoToChat } from './mappers'
import { ChatListing } from './types'

export const API = {
	async getChats(page?: number): Promise<ChatListing> {
		const query: ChatsUrlQuery = {
			count: 20,
			page: page || 1,
		}
		const resp = await chatsAPI.get<ChatsResponse>('/api/chats', query)

		return resp.status === STATUS_SUCCESS && resp.data
			? { chats: resp.data.items.map(mapDtoToChat), count: resp.data.count }
			: { chats: [], count: 0 }
	},
}
