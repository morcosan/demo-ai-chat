import { AgentDTO, ChatDTO, GptDTO, MessageDTO, SubchatDTO } from '@api/types'

export type Subchat = SubchatDTO
export type GPT = GptDTO

export interface Chat extends ChatDTO {
	deleting?: boolean
	updating?: boolean
}

export interface Message extends MessageDTO {
	loading?: boolean
}

export interface Agent extends AgentDTO {
	deleting?: boolean
	updating?: boolean
}

export interface GptListing {
	gpts: GPT[]
	count: number
}
export interface AgentListing {
	agents: Agent[]
	count: number
}
export interface ChatListing {
	chats: Chat[]
	count: number
}
export interface SubchatListing {
	subchats: Subchat[]
	count: number
}
export interface MessageListing {
	messages: Message[]
	count: number
}
