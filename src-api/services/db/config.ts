import {
	COOKIE_KEY,
	randomArray,
	randomFalse,
	randomId,
	randomInt,
	randomLongText,
	randomRecentDate,
	randomText,
} from '@utils/release'
import { DbChat, DbMessage, MessageRole } from '../../types'
import { addMinutesToDate } from '../../utilities/various'

let _dbChats: DbChat[]
let _dbMessages: DbMessage[]
let _nextId = 1001

const getNextId = () => _nextId++
const getDbChats = () => _dbChats
const getDbMessages = () => _dbMessages

const setDbChats = (value: DbChat[]) => {
	_dbChats = value
	localStorage.setItem(COOKIE_KEY.DB_CHATS, JSON.stringify(value))
}
const setDbMessages = (value: DbMessage[]) => {
	_dbMessages = value
	localStorage.setItem(COOKIE_KEY.DB_MESSAGES, JSON.stringify(value))
}

const initDatabase = () => {
	try {
		const json = localStorage.getItem(COOKIE_KEY.DB_CHATS)
		_dbChats = JSON.parse(json || '')
		_dbChats.forEach((chat: DbChat) => chat.id > _nextId && (_nextId = chat.id + 1))
	} catch (_) {
		resetDbChats()
	}

	try {
		const json = localStorage.getItem(COOKIE_KEY.DB_MESSAGES)
		_dbMessages = JSON.parse(json || '')
		_dbMessages.forEach((message: DbMessage) => message.id > _nextId && (_nextId = message.id + 1))
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
	setDbChats(chats)
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

	setDbMessages(messages)
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

export {
	getDbChats,
	getDbMessages,
	getNextId,
	initDatabase,
	resetDbChats,
	resetDbMessages,
	setDbChats,
	setDbMessages,
}
