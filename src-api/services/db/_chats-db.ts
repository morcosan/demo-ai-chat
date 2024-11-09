import {
	COOKIE_KEY,
	randomArray,
	randomFalse,
	randomInt,
	randomLongText,
	randomRecentDate,
	randomText,
} from '@utils/release'
import { DbChat, DbMessage, MessageRole } from '../../types'
import { addMinutesToDate } from '../../utilities/various'
import { getGptAPI, randomFromAgentIds } from './_agents-db'

let _dbChats: DbChat[]
let _dbMessages: DbMessage[]
let _nextId = 1001

const createChatId = () => _nextId++
const createMessageId = () => _nextId++

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

const initChatsDB = () => {
	try {
		const json = localStorage.getItem(COOKIE_KEY.DB_CHATS)
		_dbChats = JSON.parse(json || '')
		_dbChats.forEach((chat: DbChat) => chat.id >= _nextId && (_nextId = chat.id + 1))
	} catch (_) {
		createDbChats()
	}

	try {
		const json = localStorage.getItem(COOKIE_KEY.DB_MESSAGES)
		_dbMessages = JSON.parse(json || '')
		_dbMessages.forEach((message: DbMessage) => message.id >= _nextId && (_nextId = message.id + 1))
	} catch (_) {
		createDbMessages()
	}
}

const createDbChats = () => {
	const date = new Date(randomRecentDate())
	const chats = randomArray(3, 100).map((_, index: number) => ({
		id: createMessageId(),
		title: randomText(10),
		createdAt: addMinutesToDate(date, index * -1000).toISOString(),
	}))
	setDbChats(chats)
}

const createDbMessages = async () => {
	const messages: DbMessage[] = []
	const chats = [..._dbChats].reverse()

	for (let chatIndex = 0; chatIndex < chats.length; chatIndex++) {
		const chat = chats[chatIndex]
		const date = new Date(randomRecentDate())
		const isBig = chatIndex >= chats.length - 5
		const total = randomInt(1, isBig ? 70 : 10)

		for (let index = 0; index < total; index++) {
			const agentId = randomFromAgentIds()
			const response = await getGptAPI(agentId)!.getResponse([])

			const userMessage: DbMessage = {
				id: createMessageId(),
				chatId: chat.id,
				parentId: chat.id,
				agentId: 0,
				text: randomLongText(randomInt(1, 3)),
				role: 'user',
				createdAt: addMinutesToDate(date, index * 2 * 5).toISOString(),
			}
			const agentMessage: DbMessage = {
				id: createMessageId(),
				chatId: chat.id,
				parentId: chat.id,
				agentId: agentId,
				text: response,
				role: 'agent',
				createdAt: addMinutesToDate(date, (index * 2 + 1) * 5).toISOString(),
			}

			messages.push(userMessage, agentMessage)

			isBig && randomFalse() && (await addSubchats(userMessage, messages))
			isBig && randomFalse() && (await addSubchats(agentMessage, messages))
		}
	}

	setDbMessages(messages)
}

const addSubchats = async (message: DbMessage, messages: DbMessage[]) => {
	const roles: MessageRole[] = message.role === 'user' ? ['agent', 'user'] : ['user', 'agent']
	const total = randomInt(1, 30)

	for (let index = 0; index < total; index++) {
		const role = roles[index % 2]
		const userResponse = randomLongText(randomInt(1, 3))
		const agentId = role === 'agent' ? randomFromAgentIds() : 0
		const response = role === 'agent' ? await getGptAPI(agentId)!.getResponse([]) : userResponse

		messages.push({
			id: createMessageId(),
			chatId: message.chatId,
			parentId: message.id,
			agentId: agentId,
			text: response,
			role: role,
			createdAt: addMinutesToDate(message.createdAt, (index + 1) * 10).toISOString(),
		})
	}
}

const getSizeForChat = (chat: DbChat) => {
	return getDbMessages().filter((message: DbMessage) => message.parentId === chat.id).length
}

const hasMessagesByAgent = (agentId: number) => {
	return _dbMessages.some((message: DbMessage) => message.agentId === agentId)
}

const resetChatsDB = async () => {
	_nextId = 1001 // Reset id
	createDbChats()
	await createDbMessages()
}

export {
	createChatId,
	createMessageId,
	getDbChats,
	getDbMessages,
	getSizeForChat,
	hasMessagesByAgent,
	initChatsDB,
	resetChatsDB,
	setDbChats,
	setDbMessages,
}
