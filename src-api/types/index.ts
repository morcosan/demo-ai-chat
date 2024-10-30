import { DbAccount, DbBilling } from './_db'
import { AgentDTO, ChatDTO, GptDTO, MessageDTO, SubchatDTO } from './_dto'

export * from './_db'
export * from './_dto'
export * from './_status'

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
 * Query
 */
export interface AgentsApiQuery extends ApiQuery {
	agentIds?: string
	count?: string | number
	page?: string | number
	search?: string
}
export interface ChatsApiQuery extends ApiQuery {
	chatIds?: string
	count?: string | number
	page?: string | number
	search?: string
}
export interface SubchatsApiQuery extends ApiQuery {
	chatId?: string | number
	subchatIds?: string
	count?: string | number
	page?: string | number
}
export interface MessagesApiQuery extends ApiQuery {
	chatId?: string | number
	subchatId?: string | number
	count?: string | number
	page?: string | number
	search?: string
}

/**
 * Response
 */
export interface GptApiData {
	count: number
	items: GptDTO[]
}
export interface AgentsApiData {
	count: number
	items: AgentDTO[]
}
export interface ChatsApiData {
	count: number
	items: ChatDTO[]
}
export interface SubchatsApiData {
	count: number
	items: SubchatDTO[]
}
export interface MessagesApiData {
	count: number
	items: MessageDTO[]
}

/**
 * Payload
 */
export interface AccountApiPayload extends ApiPayload, Partial<DbAccount> {}
export interface BillingApiPayload extends ApiPayload, Partial<DbBilling> {}
export interface ChatsApiPayload extends ApiPayload {
	chatId?: number
	title?: string
}
export interface MessagesApiPayload extends ApiPayload {
	chatId?: number
	subchatId?: number
	text?: string
}
