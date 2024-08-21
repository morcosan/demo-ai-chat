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
	data: T
	error?: string
}
export type UrlQuery = Record<string, string | number>

/**
 * Payload
 */
export interface ChatsUrlQuery {
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
