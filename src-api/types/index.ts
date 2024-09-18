export const STATUS__SUCCESS = 200
export const STATUS__NOT_FOUND = 404
export const STATUS__SERVER_ERROR = 500

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
 * Chat API
 */
export interface Chat {
	id: number
	title: string
	createDate: string
}

/**
 * DTOs
 */
export type ChatDTO = Chat
