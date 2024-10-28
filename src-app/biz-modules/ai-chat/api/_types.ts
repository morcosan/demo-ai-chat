import { ChatDTO, MessageDTO, SubchatDTO } from '@api/types'

export type Subchat = SubchatDTO

export interface Chat extends ChatDTO {
	deleting?: boolean
	loading?: boolean
}

export interface Message extends MessageDTO {
	loading?: boolean
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
