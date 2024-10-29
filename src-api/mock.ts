import { billingService } from '@api/services/billing-service'
import { accountService } from './services/account-service'
import { chatsService } from './services/chats-service'
import { resetDbAccount, resetDbBilling, resetDbChats, resetDbMessages } from './services/db'
import { ApiPayload, ApiQuery, ApiResponse, STATUS__SUCCESS } from './types'
import { applyNetwork, RESP__NOT_FOUND } from './utilities/network'

export const mockAPI = {
	async get<T>(path: string, query: ApiQuery): Promise<ApiResponse<T>> {
		let resp = RESP__NOT_FOUND

		if (path === '/api/account') resp = await accountService.getAccount()
		if (path === '/api/billing') resp = await billingService.getBilling()
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

	async patch<T>(path: string, payload: ApiPayload): Promise<ApiResponse<T>> {
		let resp = RESP__NOT_FOUND

		if (path === '/api/account') resp = await accountService.patchAccount(payload)
		if (path === '/api/billing') resp = await billingService.patchBilling(payload)
		if (path === '/api/chats') resp = await chatsService.patchChat(payload)

		resp = await applyNetwork(resp)
		LOG_DEV('PATCH', path, payload, resp)

		return resp
	},

	async delete<T>(path: string, query: ApiQuery): Promise<ApiResponse<T>> {
		let resp = RESP__NOT_FOUND

		if (path === '/api/chats') resp = await chatsService.deleteChats(query)
		if (path === '/api/database') {
			resetDbAccount()
			resetDbBilling()
			resetDbChats()
			resetDbMessages()
			resp = { status: STATUS__SUCCESS, data: null }
		}

		resp = await applyNetwork(resp)
		LOG_DEV('DELETE', path, query, resp)

		return resp
	},
}
