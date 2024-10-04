import { ChatDTO, MessageDTO, SubchatDTO } from '@api/types'

export type Chat = ChatDTO
export type Subchat = SubchatDTO

export interface Message extends MessageDTO {
	ghost?: boolean
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
