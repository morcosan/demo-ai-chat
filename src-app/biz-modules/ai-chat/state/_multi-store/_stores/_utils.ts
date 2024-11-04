import { MessageRole } from '@api/types'
import { Chat, Message } from '../../../api'

export const getNewChat = (): Chat => ({
	id: 0,
	title: t('aiChat.label.newChat'),
	createdAt: new Date().toISOString(),
	size: 0,
})

export const getNewMessage = (chatId: number, subchatId: number, role: MessageRole, text: string): Message => ({
	id: role === 'user' ? -1 : -2,
	chatId: chatId,
	parentId: subchatId || chatId,
	text: (role === 'user' && text) || '',
	role: role,
	createdAt: new Date().toISOString(),
	subchatSize: 0,
	loading: true,
})
