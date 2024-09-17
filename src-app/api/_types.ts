import { ApiResponse, UrlQuery } from '@api/types'

export * from '@api/types'

export interface DefaultAPI {
	get<T>(path: string, query: UrlQuery): Promise<ApiResponse<T>>
}
