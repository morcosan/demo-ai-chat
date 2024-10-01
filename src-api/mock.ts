import { chatsService } from './services/chats-service'
import { ApiQuery, ApiResponse } from './types'
import { applyNetwork, RESP__NOT_FOUND } from './utilities/network'

export const mockAPI = {
	async get<T>(path: string, query: ApiQuery): Promise<ApiResponse<T>> {
		let resp = RESP__NOT_FOUND

		if (path === '/api/chats') resp = await chatsService.getChats(query)
		if (path === '/api/subchats') resp = await chatsService.getSubchats(query)
		if (path === '/api/messages') resp = await chatsService.getMessages(query)

		resp = await applyNetwork(resp)
		LOG_DEV(path, query, resp)

		return resp
	},
}
