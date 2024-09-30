import { ApiQuery, ApiResponse } from '@api/types'

export * from '@api/types'

export interface DefaultAPI {
	get<T>(path: string, query: ApiQuery): Promise<ApiResponse<T>>
}
