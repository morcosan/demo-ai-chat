import {
	chatsAPI,
	ChatsApiData,
	ChatsApiQuery,
	MessagesApiData,
	MessagesApiQuery,
	STATUS__SUCCESS,
	SubchatsApiData,
	SubchatsApiQuery,
} from '@app/api'
import { mapDtoToChat, mapDtoToMessage, mapDtoToSubchat } from './mappers'
import { ChatListing, MessageListing, SubchatListing } from './types'

export const API = {
	async getChats(chatIds?: number[], page?: number): Promise<ChatListing> {
		const query: ChatsApiQuery = {
			chatIds: (chatIds || []).join(','),
			count: 20,
			page: page || 1,
		}
		const resp = await chatsAPI.get<ChatsApiData>('/api/chats', query)

		return resp.status === STATUS__SUCCESS && resp.data
			? { chats: resp.data.items.map(mapDtoToChat), count: resp.data.count }
			: { chats: [], count: 0 }
	},

	async getSubchats(chatId: number, page?: number): Promise<SubchatListing> {
		const query: SubchatsApiQuery = {
			count: 30,
			page: page || 1,
			chatId,
		}
		const resp = await chatsAPI.get<SubchatsApiData>('/api/subchats', query)

		return resp.status === STATUS__SUCCESS && resp.data
			? { subchats: resp.data.items.map(mapDtoToSubchat), count: resp.data.count }
			: { subchats: [], count: 0 }
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
