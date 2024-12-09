import { CreativityLevel, MessageRole } from './_gpt'

export interface DbAccount {
	name: string
	email: string
	avatar: string
	phone: string
	openaiApiKey: string
}

export interface DbBilling {
	name: string
	address: string
	city: string
	country: string
	postalCode: string
	vatNumber: string
}

export interface DbChat {
	id: number
	title: string
	createdAt: string
}

export interface DbMessage {
	id: number
	chatId: number
	parentId: number
	agentId: number
	text: string
	role: MessageRole
	createdAt: string
}

export interface DbGPT {
	id: number
	name: string
	avatar: string
	desc: string
	enabled: boolean
}

export interface DbAgent {
	id: number
	gptId: number
	name: string
	avatar: string
	desc: string
	prompt: string
	creativity: CreativityLevel
	createdAt: string
	updatedAt: string | null
}
