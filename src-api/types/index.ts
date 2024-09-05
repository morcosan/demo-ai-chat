export * from './constants'

export interface Chat {
	id: number
	title: string
	createDate: string
}

/**
 * API
 */
export interface ApiResponse<T = any> {
	status: number
	data: T | null
	error?: string
}
export type UrlQuery = Record<string, string | number | undefined>

/**
 * Payload
 */
export interface ChatsUrlQuery extends UrlQuery {
	count?: string | number
	page?: string | number
}
export interface ChatsResponse {
	count: number
	items: ChatDTO[]
}
export interface MessagesUrlQuery {
	count?: string | number
	page?: string | number
}

/**
 * DTOs
 */
export type ChatDTO = Chat
