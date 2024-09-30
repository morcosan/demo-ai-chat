import { addMinutesToDate } from '@api/utilities/various'
import { randomArray, randomFalse, randomId, randomLongText, randomRecentDate, randomText } from '@utils/release'
import { Chat, Message } from '../types'

const createChats = () => {
	return randomArray(3, 100).map(() => ({
		id: randomId(),
		title: randomText(),
		date: randomRecentDate(),
	}))
}

const createMessages = (chats: Chat[]) => {
	const messages: Message[] = []

	chats.forEach((chat: Chat) => {
		randomArray(1, 50).forEach(() => {
			const date = new Date(randomRecentDate())
			const userMessage: Message = {
				id: randomId(),
				chatId: chat.id,
				subchatId: 0,
				parentId: chat.id,
				text: randomLongText(1),
				role: 'user',
				date: date.toISOString(),
			}
			const agentMessage: Message = {
				id: randomId(),
				chatId: chat.id,
				subchatId: 0,
				parentId: chat.id,
				text: randomLongText(10),
				role: 'agent',
				date: addMinutesToDate(date, 5).toISOString(),
			}

			messages.push(userMessage, agentMessage)

			randomFalse() && addSubchats(userMessage, messages)
			randomFalse() && addSubchats(agentMessage, messages)
		})
	})

	return messages
}

const addSubchats = (message: Message, messages: Message[]) => {
	message.subchatId = message.id

	randomArray(1, 10).forEach((_, index: number) => {
		messages.push({
			id: randomId(),
			chatId: message.chatId,
			subchatId: message.id,
			parentId: message.id,
			text: randomLongText(1),
			role: 'user',
			date: addMinutesToDate(message.date, (index + 1) * 5).toISOString(),
		})
	})
}

export const DB__CHATS: Chat[] = createChats()
export const DB__MESSAGES: Message[] = createMessages(DB__CHATS)
