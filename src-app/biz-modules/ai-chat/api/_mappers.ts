import { AgentDTO, ChatDTO, GptDTO, MessageDTO, SubchatDTO } from '@api/types'
import { Agent, Chat, GPT, Message, Subchat } from './_types'

export const mapDtoToGPT = (dto: GptDTO): GPT => {
	return {
		id: dto.id || 0,
		name: dto.name || '',
		avatar: dto.avatar || '',
		desc: dto.desc || '',
		usable: dto.usable || false,
	}
}

export const mapDtoToAgent = (dto: AgentDTO): Agent => {
	return {
		id: dto.id || 0,
		gptId: dto.gptId || 0,
		name: dto.name || '',
		avatar: dto.avatar || '',
		desc: dto.desc || '',
		prompt: dto.prompt || '',
		createdAt: dto.createdAt || '',
		updatedAt: dto.updatedAt || null,
	}
}

export const mapDtoToChat = (dto: ChatDTO): Chat => {
	return {
		id: dto.id || 0,
		title: dto.title || '',
		createdAt: dto.createdAt || '',
		size: dto.size || 0,
	}
}

export const mapDtoToSubchat = (dto: SubchatDTO): Subchat => {
	return {
		id: dto.id || 0,
		chatId: dto.chatId || 0,
		text: (dto.text || '').substring(0, 100),
		size: dto.size || 0,
		createdAt: dto.createdAt || '',
	}
}

export const mapDtoToMessage = (dto: MessageDTO): Message => {
	return {
		id: dto.id || 0,
		chatId: dto.chatId || 0,
		subchatSize: dto.subchatSize || 0,
		parentId: dto.parentId || 0,
		agentId: dto.agentId || 0,
		text: dto.text || '',
		role: dto.role || '',
		createdAt: dto.createdAt || '',
	}
}
