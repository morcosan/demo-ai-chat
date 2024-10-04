import { ApiPayload, ApiQuery, ApiResponse } from '@api/types'

export * from '@api/types'

export interface DefaultAPI {
	get<T>(path: string, query: ApiQuery): Promise<ApiResponse<T>>
	post<T>(path: string, payload: ApiPayload): Promise<ApiResponse<T>>
}
