export interface DbAccount {
	name: string
	email: string
	phone: string
	avatar: string
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
	text: string
	role: MessageRole
	createdAt: string
}

export type MessageRole = 'user' | 'agent' | 'system'

export interface DbGPT {
	id: number
	name: string
	desc: string
}

export interface DbAgent {
	id: number
	gptId: number
	name: string
	desc: string
	setup: string
}
