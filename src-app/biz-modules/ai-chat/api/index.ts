import {
	chatsAPI,
	ChatsApiData,
	ChatsApiQuery,
	MessagesApiData,
	MessagesApiQuery,
	STATUS__SUCCESS,
} from '@app/api'
import { mapDtoToChat, mapDtoToMessage } from './mappers'
import { ChatListing, MessageListing } from './types'

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

	async getMessages(chatId: number, subchatId?: number, page?: number): Promise<MessageListing> {
		const query: MessagesApiQuery = {
			count: 10,
			page: page || 1,
			chatId,
			subchatId,
		}
		const resp = await chatsAPI.get<MessagesApiData>('/api/messages', query)

		return resp.status === STATUS__SUCCESS && resp.data
			? { messages: resp.data.items.map(mapDtoToMessage), count: resp.data.count }
			: { messages: [], count: 0 }
	},
}
