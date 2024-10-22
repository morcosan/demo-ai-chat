import { MessageRole } from '@api/types'
import { Message } from '../../../api'

export const GHOST_CHAT = {
	id: 0,
	title: 'New chat',
	createdAt: new Date().toISOString(),
	size: 0,
}

export const newGhostMessage = (chatId: number, subchatId: number, role: MessageRole, text: string): Message => ({
	id: role === 'user' ? -1 : -2,
	chatId: chatId,
	parentId: subchatId || chatId,
	text: (role === 'user' && text) || '',
	role: role,
	createdAt: new Date().toISOString(),
	subchatSize: 0,
	loading: true,
})
