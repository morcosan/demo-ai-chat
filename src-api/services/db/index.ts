import { initAccountDB } from './_account-db'
import { initAgentsDB } from './_agents-db'
import { initBillingDB } from './_billing-db'
import { initChatsDB } from './_chats-db'

export { getDbAccount, resetDbAccount, setDbAccount } from './_account-db'
export {
	createAgentId,
	getDbActiveAgents,
	getDbDeletedAgents,
	getGptResponse,
	getGPTs,
	randomFromAgentIds,
	resetAgentsDB,
	setDbActiveAgents,
	setDbDeletedAgents,
} from './_agents-db'
export { getDbBilling, resetDbBilling, setDbBilling } from './_billing-db'
export {
	createChatId,
	createMessageId,
	getDbChats,
	getDbMessages,
	getSizeForChat,
	hasMessagesByAgent,
	resetChatsDB,
	setDbChats,
	setDbMessages,
} from './_chats-db'

let _dbReady = false

export const initDB = async () => {
	if (_dbReady) return

	await initAccountDB()
	await initBillingDB()
	await initAgentsDB()
	await initChatsDB() // Must come after agents
	_dbReady = true
}
