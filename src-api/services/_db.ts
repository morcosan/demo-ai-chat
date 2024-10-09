import { addMinutesToDate } from '@api/utilities/various'
import {
	randomArray,
	randomFalse,
	randomId,
	randomInt,
	randomLongText,
	randomRecentDate,
	randomText,
} from '@utils/release'
import { Chat, Message, MessageRole } from '../types'

const createChats = (): Chat[] => {
	const date = new Date(randomRecentDate())

	return randomArray(3, 100).map((_, index: number) => ({
		id: randomId(),
		title: randomText(10),
		createdAt: addMinutesToDate(date, index * 5).toISOString(),
	}))
}

const createMessages = (chats: Chat[]) => {
	const messages: Message[] = []

	chats.forEach((chat: Chat, chatIndex: number) => {
		const date = new Date(randomRecentDate())
		const isBig = chatIndex < 5

		randomArray(1, isBig ? 70 : 10).forEach((_, index: number) => {
			const userMessage: Message = {
				id: randomId(),
				chatId: chat.id,
				parentId: chat.id,
				text: randomLongText(randomInt(1, 3)),
				role: 'user',
				createdAt: addMinutesToDate(date, index * 2 * 5).toISOString(),
			}
			const agentMessage: Message = {
				id: randomId(),
				chatId: chat.id,
				parentId: chat.id,
				text: randomLongText(randomInt(5, 20)),
				role: 'agent',
				createdAt: addMinutesToDate(date, (index * 2 + 1) * 5).toISOString(),
			}

			messages.push(userMessage, agentMessage)

			isBig && randomFalse() && addSubchats(userMessage, messages)
			isBig && randomFalse() && addSubchats(agentMessage, messages)
		})
	})

	return messages
}

const addSubchats = (message: Message, messages: Message[]) => {
	const roles: MessageRole[] = message.role === 'user' ? ['agent', 'user'] : ['user', 'agent']

	randomArray(1, 30).forEach((_, index: number) => {
		messages.push({
			id: randomId(),
			chatId: message.chatId,
			parentId: message.id,
			text: randomLongText(randomInt(1, 3)),
			role: roles[index % 2],
			createdAt: addMinutesToDate(message.createdAt, (index + 1) * 10).toISOString(),
		})
	})
}

export const DB__CHATS: Chat[] = createChats()
export const DB__MESSAGES: Message[] = createMessages(DB__CHATS)
