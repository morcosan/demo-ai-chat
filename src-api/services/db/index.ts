import { DbChat, DbMessage } from '@api/types'
import { getDbChats, getDbMessages, initChats, initMessages } from './config'

initChats()
initMessages()

export const DB__CHATS: DbChat[] = getDbChats()
export const DB__MESSAGES: DbMessage[] = getDbMessages()

export const getSizeForChat = (chat: DbChat) => {
	return DB__MESSAGES.filter((message: DbMessage) => message.parentId === chat.id).length
}

export { resetDbChats, resetDbMessages } from './config'
