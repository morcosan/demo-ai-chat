import { ChatDTO, MessageDTO } from '@api/types'

export type Chat = ChatDTO
export type Message = MessageDTO

export interface ChatListing {
	chats: Chat[]
	count: number
}
export interface MessageListing {
	messages: Message[]
	count: number
}
