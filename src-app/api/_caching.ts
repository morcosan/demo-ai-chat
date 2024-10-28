import { ApiPayload, ApiQuery, ApiResponse, DefaultAPI } from './_types'

/**
 * Data Cache
 */
const _dataCache: Record<string, ApiResponse> = {}

export const getDataCache = <T>(url: string) => _dataCache[url] as ApiResponse<T> | undefined
export const setDataCache = (url: string, data: ApiResponse) => (_dataCache[url] = data)
export const clearDataCache = (path?: string) => {
	if (path) {
		Object.keys(_dataCache).forEach((url: string) => url.startsWith(path) && delete _dataCache[url])
	} else {
		Object.keys(_dataCache).forEach((url: string) => delete _dataCache[url])
	}
}

/**
 * Pending Requests
 */
const _requestCache: Record<string, Promise<ApiResponse>> = {}

export const getPendingRequest = <T>(url: string) => _requestCache[url] as Promise<ApiResponse<T>> | undefined
export const setPendingRequest = (url: string, req: Promise<ApiResponse>) => {
	_requestCache[url] = req
}
export const clearPendingRequest = (url: string) => delete _requestCache[url]

/**
 * Cached API
 */
export const createCachedAPI = (api: DefaultAPI): DefaultAPI => ({
	async get<T>(path: string, query: ApiQuery): Promise<ApiResponse<T>> {
		const url = path + JSON.stringify(query)

		// Check if data is already in cache
		const oldData = getDataCache<T>(url)
		// If in cache, return data directly
		if (oldData) return oldData

		// Check if the exact request is already pending
		const request: Promise<ApiResponse<T>> = getPendingRequest<T>(url) || api.get<T>(path, query)
		// Save the new pending request
		setPendingRequest(url, request)

		// Get data from finished request
		const newData = await request
		// Save data in cache
		setDataCache(url, newData)
		// Remove pending request
		clearPendingRequest(url)

		return newData
	},

	async post<T>(path: string, payload: ApiPayload): Promise<ApiResponse<T>> {
		return api.post<T>(path, payload)
	},

	async put<T>(path: string, payload: ApiPayload): Promise<ApiResponse<T>> {
		return api.put<T>(path, payload)
	},

	async delete<T>(path: string, query: ApiQuery): Promise<ApiResponse<T>> {
		return api.delete<T>(path, query)
	},
})
