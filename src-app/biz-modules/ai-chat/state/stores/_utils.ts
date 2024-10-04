import { MessageRole } from '@api/types'
import { Message } from '../../api/types'

export const newGhostMessage = (chatId: number, subchatId: number, role: MessageRole, text: string): Message => ({
	id: role === 'user' ? -1 : -2,
	chatId: chatId,
	subchatId: subchatId,
	parentId: chatId,
	text: (role === 'user' && text) || '',
	role: role,
	datetime: new Date().toISOString(),
	subchatSize: 0,
	ghost: true,
})
