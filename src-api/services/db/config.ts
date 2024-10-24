import {
	randomArray,
	randomFalse,
	randomId,
	randomInt,
	randomLongText,
	randomRecentDate,
	randomText,
} from '@utils/release'
import { COOKIE__CHATS, COOKIE__MESSAGES, DbChat, DbMessage, MessageRole } from '../../types'
import { addMinutesToDate } from '../../utilities/various'

let _dbChats: DbChat[]
let _dbMessages: DbMessage[]

const getDbChats = () => _dbChats
const getDbMessages = () => _dbMessages

const initChats = () => {
	try {
		const json = localStorage.getItem(COOKIE__CHATS)
		_dbChats = JSON.parse(json || '')
	} catch (_) {
		resetDbChats()
	}
}

const initMessages = () => {
	try {
		const json = localStorage.getItem(COOKIE__MESSAGES)
		_dbMessages = JSON.parse(json || '')
	} catch (_) {
		resetDbMessages()
	}
}

const resetDbChats = () => {
	const date = new Date(randomRecentDate())
	const chats = randomArray(3, 100).map((_, index: number) => ({
		id: randomId(),
		title: randomText(10),
		createdAt: addMinutesToDate(date, index * -1000).toISOString(),
	}))

	localStorage.setItem(COOKIE__CHATS, JSON.stringify(chats))

	_dbChats = chats
}

const resetDbMessages = () => {
	const messages: DbMessage[] = []

	const chats = [..._dbChats].reverse()

	chats.forEach((chat: DbChat, chatIndex: number) => {
		const date = new Date(randomRecentDate())
		const isBig = chatIndex >= chats.length - 5

		randomArray(1, isBig ? 70 : 10).forEach((_, index: number) => {
			const userMessage: DbMessage = {
				id: randomId(),
				chatId: chat.id,
				parentId: chat.id,
				text: randomLongText(randomInt(1, 3)),
				role: 'user',
				createdAt: addMinutesToDate(date, index * 2 * 5).toISOString(),
			}
			const agentMessage: DbMessage = {
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

	localStorage.setItem(COOKIE__MESSAGES, JSON.stringify(messages))

	_dbMessages = messages
}

export const addSubchats = (message: DbMessage, messages: DbMessage[]) => {
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

export { getDbChats, getDbMessages, initChats, initMessages, resetDbChats, resetDbMessages }
