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
	return randomArray(3, 100).map(() => ({
		id: randomId(),
		title: randomText(),
		datetime: randomRecentDate(),
	}))
}

const createMessages = (chats: Chat[]) => {
	const messages: Message[] = []

	chats.forEach((chat: Chat) => {
		const date = new Date(randomRecentDate())

		randomArray(1, 70).forEach((_, index: number) => {
			const userMessage: Message = {
				id: randomId(),
				chatId: chat.id,
				subchatId: 0,
				parentId: chat.id,
				text: randomLongText(randomInt(1, 3)),
				role: 'user',
				datetime: addMinutesToDate(date, index * 2 * 5).toISOString(),
			}
			const agentMessage: Message = {
				id: randomId(),
				chatId: chat.id,
				subchatId: 0,
				parentId: chat.id,
				text: randomLongText(randomInt(5, 20)),
				role: 'agent',
				datetime: addMinutesToDate(date, (index * 2 + 1) * 5).toISOString(),
			}

			messages.push(userMessage, agentMessage)

			randomFalse() && addSubchats(userMessage, messages)
			randomFalse() && addSubchats(agentMessage, messages)
		})
	})

	return messages
}

const addSubchats = (message: Message, messages: Message[]) => {
	const roles: MessageRole[] = message.role === 'user' ? ['agent', 'user'] : ['user', 'agent']

	message.subchatId = message.id

	randomArray(1, 20).forEach((_, index: number) => {
		messages.push({
			id: randomId(),
			chatId: message.chatId,
			subchatId: message.id,
			parentId: message.id,
			text: randomLongText(randomInt(1, 3)),
			role: roles[index % 2],
			datetime: addMinutesToDate(message.datetime, (index + 1) * 10).toISOString(),
		})
	})
}

export const DB__CHATS: Chat[] = createChats()
export const DB__MESSAGES: Message[] = createMessages(DB__CHATS)
