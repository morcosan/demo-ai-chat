import { DbChat, DbMessage } from '@api/types'
import { getDbMessages, initDatabase } from './config'

export {
	getDbChats,
	getDbMessages,
	getNextId,
	resetDbChats,
	resetDbMessages,
	setDbChats,
	setDbMessages,
} from './config'

export const getSizeForChat = (chat: DbChat) => {
	return getDbMessages().filter((message: DbMessage) => message.parentId === chat.id).length
}

initDatabase()
