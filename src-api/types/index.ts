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
export type ApiQuery = Record<string, string | number | undefined>

/**
 * Payload
 */
export interface ChatsApiQuery extends ApiQuery {
	count?: string | number
	page?: string | number
}
export interface ChatsApiData {
	count: number
	items: ChatDTO[]
}
export interface MessagesApiQuery extends ApiQuery {
	chatId?: string | number
	subchatId?: string | number
	count?: string | number
	page?: string | number
}
export interface MessagesApiData {
	count: number
	items: MessageDTO[]
}

/**
 * Chat API
 */
export interface Chat {
	id: number
	title: string
	date: string
}

export interface Message {
	id: number
	chatId: number
	subchatId: number
	parentId: number
	text: string
	role: MessageRole
	datetime: string
}

export type MessageRole = 'user' | 'agent' | 'system'

/**
 * DTOs
 */
export type ChatDTO = Chat
export type MessageDTO = Message
