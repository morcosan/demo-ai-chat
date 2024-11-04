import { DbChat, DbMessage } from '@api/types'
import { initAccountDB } from './_account-db'
import { initAgentsDB } from './_agents-db'
import { initBillingDB } from './_billing-db'
import { getDbMessages, initChatsDB } from './_chats-db'

export { getDbAccount, resetDbAccount, setDbAccount } from './_account-db'
export { getDbAgents, GPTs, randomAgentId, resetAgentsDB, setDbAgents } from './_agents-db'
export { getDbBilling, resetDbBilling, setDbBilling } from './_billing-db'
export {
	getDbChats,
	getDbMessages,
	randomChatId,
	randomMessageId,
	resetChatsDB,
	setDbChats,
	setDbMessages,
} from './_chats-db'

export const getSizeForChat = (chat: DbChat) => {
	return getDbMessages().filter((message: DbMessage) => message.parentId === chat.id).length
}

initAccountDB()
initAgentsDB()
initBillingDB()
initChatsDB()
