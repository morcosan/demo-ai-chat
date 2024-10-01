import { ChatDTO, MessageDTO, SubchatDTO } from '@api/types'
import { Chat, Message, Subchat } from './types'

export const mapDtoToChat = (dto: ChatDTO): Chat => {
	return {
		id: dto.id || 0,
		title: dto.title || '',
		datetime: dto.datetime || '',
	}
}

export const mapDtoToSubchat = (dto: SubchatDTO): Subchat => {
	return {
		id: dto.id || 0,
		chatId: dto.chatId || 0,
		text: (dto.text || '').substring(0, 100),
		datetime: dto.datetime || '',
	}
}

export const mapDtoToMessage = (dto: MessageDTO): Message => {
	return {
		id: dto.id || 0,
		chatId: dto.chatId || 0,
		subchatId: dto.subchatId || 0,
		subchatSize: dto.subchatSize || 0,
		parentId: dto.parentId || 0,
		text: dto.text || '',
		role: dto.role || '',
		datetime: dto.datetime || '',
	}
}
