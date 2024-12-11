import {
	AgentsApiData,
	AgentsApiPayload,
	AgentsApiQuery,
	ChatsApiData,
	ChatsApiPayload,
	ChatsApiQuery,
	clearDataCache,
	GptApiData,
	mainAPI,
	MessagesApiData,
	MessagesApiPayload,
	MessagesApiQuery,
	Status,
	SubchatsApiData,
	SubchatsApiQuery,
} from '@app/api'
import { getIntByViewport } from '@utils/release'
import { mapDtoToAgent, mapDtoToChat, mapDtoToGPT, mapDtoToMessage, mapDtoToSubchat } from './_mappers'
import { AgentListing, ChatListing, GptListing, MessageListing, SubchatListing } from './_types'

export { GPT_ID } from '@api/types'
export { UI_TAG__GPT_DESCRIPTION } from '@app/api'
export type { AgentsApiPayload, CreativityLevel } from '@app/api'
export * from './_types'

export const MIN_SEARCH_LENGTH = 3

type GetAgentsArgs = [agentIds?: number[], page?: number, search?: string, everywhere?: boolean]
type PostMessageArgs = [chatId: number, text: string, agentId: number, subchatId?: number]

export const API = {
	async getGPTs(): Promise<GptListing> {
		const resp = await mainAPI.get<GptApiData>('/api/gpts', {})

		return resp.status === Status.SUCCESS && resp.data
			? { gpts: resp.data.items.map(mapDtoToGPT), count: resp.data.count }
			: { gpts: [], count: 0 }
	},

	async getAgents(...args: GetAgentsArgs): Promise<AgentListing> {
		const [agentIds, page, search, everywhere] = args
		const query: AgentsApiQuery = {
			agentIds: (agentIds || []).join(','),
			count: getIntByViewport([20, 30, 40, 60]),
			page: page || 1,
			search,
			everywhere,
		}
		const resp = await mainAPI.get<AgentsApiData>('/api/agents', query)

		return resp.status === Status.SUCCESS && resp.data
			? { agents: resp.data.items.map(mapDtoToAgent), count: resp.data.count }
			: { agents: [], count: 0 }
	},

	async createAgent(payload: AgentsApiPayload): Promise<AgentListing> {
		const resp = await mainAPI.post<AgentsApiData>('/api/agents', payload)

		clearDataCache('/api/agents')

		return resp.status === Status.SUCCESS && resp.data
			? { agents: resp.data.items.map(mapDtoToAgent), count: resp.data.count }
			: { agents: [], count: 0 }
	},

	async updateAgent(payload: AgentsApiPayload): Promise<AgentListing> {
		const resp = await mainAPI.patch<AgentsApiData>('/api/agents', payload)

		clearDataCache('/api/agents')

		return resp.status === Status.SUCCESS && resp.data
			? { agents: resp.data.items.map(mapDtoToAgent), count: resp.data.count }
			: { agents: [], count: 0 }
	},

	async deleteAgents(agentIds: number[]): Promise<AgentListing> {
		const query: AgentsApiQuery = { agentIds: (agentIds || []).join(',') }
		const resp = await mainAPI.delete<AgentsApiData>('/api/agents', query)

		clearDataCache('/api/agents')

		return resp.status === Status.SUCCESS && resp.data
			? { agents: [], count: resp.data.count }
			: { agents: [], count: 0 }
	},

	async getChats(chatIds?: number[], page?: number, search?: string): Promise<ChatListing> {
		const query: ChatsApiQuery = {
			chatIds: (chatIds || []).join(','),
			count: getIntByViewport([20, 30, 40, 60]),
			page: page || 1,
			search,
		}
		const resp = await mainAPI.get<ChatsApiData>('/api/chats', query)

		return resp.status === Status.SUCCESS && resp.data
			? { chats: resp.data.items.map(mapDtoToChat), count: resp.data.count }
			: { chats: [], count: 0 }
	},

	async createChat(title: string): Promise<ChatListing> {
		const payload: ChatsApiPayload = { title }
		const resp = await mainAPI.post<ChatsApiData>('/api/chats', payload)

		clearDataCache('/api/chats')

		return resp.status === Status.SUCCESS && resp.data
			? { chats: resp.data.items.map(mapDtoToChat), count: resp.data.count }
			: { chats: [], count: 0 }
	},

	async updateChat(chatId: number, title?: string): Promise<ChatListing> {
		const payload: ChatsApiPayload = { chatId, title: title || '' }
		const resp = await mainAPI.patch<ChatsApiData>('/api/chats', payload)

		clearDataCache('/api/chats')

		return resp.status === Status.SUCCESS && resp.data
			? { chats: resp.data.items.map(mapDtoToChat), count: resp.data.count }
			: { chats: [], count: 0 }
	},

	async deleteChats(chatIds: number[]): Promise<ChatListing> {
		const query: ChatsApiQuery = { chatIds: (chatIds || []).join(',') }
		const resp = await mainAPI.delete<ChatsApiData>('/api/chats', query)

		clearDataCache('/api/chats')

		return resp.status === Status.SUCCESS && resp.data
			? { chats: [], count: resp.data.count }
			: { chats: [], count: 0 }
	},

	async getSubchats(chatId?: number, subchatIds?: number[], page?: number): Promise<SubchatListing> {
		const query: SubchatsApiQuery = {
			count: getIntByViewport([30, 40, 50, 70]),
			page: page || 1,
			subchatIds: (subchatIds || []).join(','),
			chatId,
		}
		const resp = await mainAPI.get<SubchatsApiData>('/api/subchats', query)

		return resp.status === Status.SUCCESS && resp.data
			? { subchats: resp.data.items.map(mapDtoToSubchat), count: resp.data.count }
			: { subchats: [], count: 0 }
	},

	async getMessages(chatId?: number, subchatId?: number, page?: number, search?: string): Promise<MessageListing> {
		if (search && search.length < MIN_SEARCH_LENGTH) {
			return { messages: [], count: 0 }
		}

		const query: MessagesApiQuery = {
			count: getIntByViewport([15, 25, 35, 50]),
			page: page || 1,
			chatId,
			subchatId,
			search,
		}
		const resp = await mainAPI.get<MessagesApiData>('/api/messages', query)

		return resp.status === Status.SUCCESS && resp.data
			? { messages: resp.data.items.map(mapDtoToMessage), count: resp.data.count }
			: { messages: [], count: 0 }
	},

	async postMessage(chatId: number, text: string, agentId: number, subchatId?: number): Promise<MessageListing> {
		const payload: MessagesApiPayload = { chatId, subchatId, text, agentId }
		const resp = await mainAPI.post<MessagesApiData>('/api/messages', payload)

		clearDataCache('/api/messages')
		subchatId && clearDataCache('/api/subchats')

		return resp.status === Status.SUCCESS && resp.data
			? { messages: resp.data.items.map(mapDtoToMessage), count: resp.data.count }
			: { messages: [], count: 0, errorCode: resp.status }
	},
}
