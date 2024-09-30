import { chatsAPI, ChatsApiData, ChatsApiQuery, STATUS__SUCCESS } from '@app/api'
import { mapDtoToChat } from './mappers'
import { ChatListing } from './types'

export const API = {
	async getChats(page?: number): Promise<ChatListing> {
		const query: ChatsApiQuery = {
			count: 20,
			page: page || 1,
		}
		const resp = await chatsAPI.get<ChatsApiData>('/api/chats', query)

		return resp.status === STATUS__SUCCESS && resp.data
			? { chats: resp.data.items.map(mapDtoToChat), count: resp.data.count }
			: { chats: [], count: 0 }
	},
}
