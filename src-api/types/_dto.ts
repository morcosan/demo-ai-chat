import { DbAccount, DbAgent, DbBilling, DbChat, DbGPT, DbMessage } from './_db'

export type AccountDTO = DbAccount
export type BillingDTO = DbBilling
export type GptDTO = DbGPT
export type AgentDTO = DbAgent

export interface ChatDTO extends DbChat {
	size: number
}

export interface SubchatDTO {
	id: number
	chatId: number
	text: string
	size: number
	createdAt: string
}

export interface MessageDTO extends DbMessage {
	subchatSize: number
}
