import { chatsService } from './services/chats-service'
import { ApiPayload, ApiQuery, ApiResponse } from './types'
import { applyNetwork, RESP__NOT_FOUND } from './utilities/network'

export const mockAPI = {
	async get<T>(path: string, query: ApiQuery): Promise<ApiResponse<T>> {
		let resp = RESP__NOT_FOUND

		if (path === '/api/chats') resp = await chatsService.getChats(query)
		if (path === '/api/subchats') resp = await chatsService.getSubchats(query)
		if (path === '/api/messages') resp = await chatsService.getMessages(query)

		resp = await applyNetwork(resp)
		LOG_DEV('GET', path, query, resp)

		return resp
	},

	async post<T>(path: string, payload: ApiPayload): Promise<ApiResponse<T>> {
		let resp = RESP__NOT_FOUND

		if (path === '/api/chats') resp = await chatsService.postChat(payload)
		if (path === '/api/messages') resp = await chatsService.postMessage(payload)

		resp = await applyNetwork(resp)
		LOG_DEV('POST', path, payload, resp)

		return resp
	},

	async put<T>(path: string, payload: ApiPayload): Promise<ApiResponse<T>> {
		let resp = RESP__NOT_FOUND

		if (path === '/api/chats') resp = await chatsService.putChat(payload)

		resp = await applyNetwork(resp)
		LOG_DEV('PUT', path, payload, resp)

		return resp
	},

	async delete<T>(path: string, query: ApiQuery): Promise<ApiResponse<T>> {
		let resp = RESP__NOT_FOUND

		if (path === '/api/chats') resp = await chatsService.deleteChats(query)

		resp = await applyNetwork(resp)
		LOG_DEV('DELETE', path, query, resp)

		return resp
	},
}
