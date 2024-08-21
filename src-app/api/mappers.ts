import { ChatDTO } from '@api/types'
import { Chat } from './types'

export const mapDtoToChat = (dto: ChatDTO): Chat => {
	return {
		id: dto.id || 0,
		title: dto.title || '',
	}
}
