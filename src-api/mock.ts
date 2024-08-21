import { chatsService } from './services/chats-service'
import { ApiResponse, UrlQuery } from './types'
import { applyNetwork, RESP_NOT_FOUND } from './utilities/network'

chatsService.init()

export const mockAPI = {
	async get(path: string, query: UrlQuery): Promise<ApiResponse> {
		let resp = RESP_NOT_FOUND

		if (path === '/api/chats') resp = await chatsService.getChats(query)
		if (path === '/api/messages') resp = await chatsService.getMessages(query)

		resp = await applyNetwork(resp)
		LOG_DEV(path, query, resp)

		return resp
	},
}
