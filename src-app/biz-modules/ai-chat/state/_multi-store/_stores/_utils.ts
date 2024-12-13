import { MessageRole } from '@api/types'
import { Chat, Message } from '../../../api'

export const createGhostChat = (title: string): Chat => ({
	id: 0,
	title,
	createdAt: new Date().toISOString(),
	size: 0,
})

type GetNewMessageArgs = [
	chatId: number,
	subchatId: number,
	role: MessageRole,
	text: string,
	agentId: number,
	errorCode?: number,
]

export const createGhostMessage = (...args: GetNewMessageArgs): Message => {
	const [chatId, subchatId, role, text, agentId, errorCode] = args

	return {
		id: role === 'user' ? -1 : -2,
		chatId: chatId,
		parentId: subchatId || chatId,
		agentId: agentId,
		text: (role === 'user' && text) || '',
		role: role,
		createdAt: new Date().toISOString(),
		subchatSize: 0,
		loading: !errorCode,
		errorCode: errorCode,
	}
}
