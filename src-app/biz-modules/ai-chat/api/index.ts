import {
	chatsAPI,
	ChatsApiData,
	ChatsApiPayload,
	ChatsApiQuery,
	clearDataCache,
	MessagesApiData,
	MessagesApiPayload,
	MessagesApiQuery,
	STATUS__SUCCESS,
	SubchatsApiData,
	SubchatsApiQuery,
} from '@app/api'
import { mapDtoToChat, mapDtoToMessage, mapDtoToSubchat } from './_mappers'
import { ChatListing, MessageListing, SubchatListing } from './_types'

export * from './_types'

export const MIN_SEARCH_LENGTH = 3

export const API = {
	async getChats(chatIds?: number[], page?: number, search?: string): Promise<ChatListing> {
		const query: ChatsApiQuery = {
			chatIds: (chatIds || []).join(','),
			count: 20,
			page: page || 1,
			search,
		}
		const resp = await chatsAPI.get<ChatsApiData>('/api/chats', query)

		return resp.status === STATUS__SUCCESS && resp.data
			? { chats: resp.data.items.map(mapDtoToChat), count: resp.data.count }
			: { chats: [], count: 0 }
	},

	async createChat(title: string): Promise<ChatListing> {
		const payload: ChatsApiPayload = { title }
		const resp = await chatsAPI.post<ChatsApiData>('/api/chats', payload)

		clearDataCache('/api/chats')

		return resp.status === STATUS__SUCCESS && resp.data
			? { chats: resp.data.items.map(mapDtoToChat), count: resp.data.count }
			: { chats: [], count: 0 }
	},

	async updateChat(chatId: number, title?: string): Promise<ChatListing> {
		const payload: ChatsApiPayload = { chatId, title: title || '' }
		const resp = await chatsAPI.put<ChatsApiData>('/api/chats', payload)

		clearDataCache('/api/chats')

		return resp.status === STATUS__SUCCESS && resp.data
			? { chats: resp.data.items.map(mapDtoToChat), count: resp.data.count }
			: { chats: [], count: 0 }
	},

	async deleteChats(chatIds: number[]): Promise<ChatListing> {
		const query: ChatsApiQuery = { chatIds: (chatIds || []).join(',') }
		const resp = await chatsAPI.delete<ChatsApiData>('/api/chats', query)

		clearDataCache('/api/chats')

		return resp.status === STATUS__SUCCESS && resp.data
			? { chats: [], count: resp.data.count }
			: { chats: [], count: 0 }
	},

	async getSubchats(chatId?: number, subchatIds?: number[], page?: number): Promise<SubchatListing> {
		const query: SubchatsApiQuery = {
			count: 20,
			page: page || 1,
			subchatIds: (subchatIds || []).join(','),
			chatId,
		}
		const resp = await chatsAPI.get<SubchatsApiData>('/api/subchats', query)

		return resp.status === STATUS__SUCCESS && resp.data
			? { subchats: resp.data.items.map(mapDtoToSubchat), count: resp.data.count }
			: { subchats: [], count: 0 }
	},

	async getMessages(chatId?: number, subchatId?: number, page?: number, search?: string): Promise<MessageListing> {
		if (search && search.length < MIN_SEARCH_LENGTH) {
			return { messages: [], count: 0 }
		}

		const query: MessagesApiQuery = {
			count: 20,
			page: page || 1,
			chatId,
			subchatId,
			search,
		}
		const resp = await chatsAPI.get<MessagesApiData>('/api/messages', query)

		return resp.status === STATUS__SUCCESS && resp.data
			? { messages: resp.data.items.map(mapDtoToMessage), count: resp.data.count }
			: { messages: [], count: 0 }
	},

	async postMessage(chatId: number, subchatId?: number, text?: string): Promise<MessageListing> {
		const payload: MessagesApiPayload = { chatId, subchatId, text }
		const resp = await chatsAPI.post<MessagesApiData>('/api/messages', payload)

		clearDataCache('/api/messages')
		subchatId && clearDataCache('/api/subchats')

		return resp.status === STATUS__SUCCESS && resp.data
			? { messages: resp.data.items.map(mapDtoToMessage), count: resp.data.count }
			: { messages: [], count: 0 }
	},

	async rebuildDatabase(): Promise<boolean> {
		const resp = await chatsAPI.post('/api/database', {})

		return resp.status === STATUS__SUCCESS
	},
}
