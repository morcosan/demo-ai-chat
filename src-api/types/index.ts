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
export type ApiPayload = Record<string, unknown>

/**
 * Payload
 */
export interface ChatsApiQuery extends ApiQuery {
	chatIds?: string
	count?: string | number
	page?: string | number
}
export interface ChatsApiData {
	count: number
	items: ChatDTO[]
}
export interface SubchatsApiQuery extends ApiQuery {
	chatId?: string | number
	subchatIds?: string
	count?: string | number
	page?: string | number
}
export interface SubchatsApiData {
	count: number
	items: SubchatDTO[]
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
export interface MessagesApiPayload extends ApiPayload {
	chatId?: number
	subchatId?: number
	text?: string
}

/**
 * Chat API
 */
export interface Chat {
	id: number
	title: string
	datetime: string
}

export interface Message {
	id: number
	chatId: number
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

export interface SubchatDTO {
	id: number
	chatId: number
	text: string
	size: number
	datetime: string
}

export interface MessageDTO extends Message {
	subchatSize: number
}
