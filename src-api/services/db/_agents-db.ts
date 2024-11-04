import { DbAgent, DbGPT, GPT_ID__LOREM_IPSUM, GPT_ID__RAMMUS, UI_TAG__GPT_DESCRIPTION } from '@api/types'
import {
	COOKIE_KEY,
	randomArray,
	randomFromArray,
	randomImageHD,
	randomInt,
	randomLongText,
	randomRecentDate,
	randomText,
} from '@utils/release'

const GPTs: DbGPT[] = [
	{
		id: GPT_ID__LOREM_IPSUM,
		name: 'Lorem Ipsum GPT',
		avatar: ENV__ROOT_URL_PATH + '/avatars/default.svg',
		desc: '',
	},
	{
		id: GPT_ID__RAMMUS,
		name: 'Rammus GPT',
		avatar: ENV__ROOT_URL_PATH + '/avatars/rammus.png',
		desc: '',
	},
]

let _dbAgents: DbAgent[]
let _nextId = 1001

const randomAgentId = () => _nextId++

const getDbAgents = () => _dbAgents

const setDbAgents = (value: DbAgent[]) => {
	_dbAgents = value
	localStorage.setItem(COOKIE_KEY.DB_AGENTS, JSON.stringify(value))
}

const initAgentsDB = () => {
	try {
		const json = localStorage.getItem(COOKIE_KEY.DB_AGENTS)
		_dbAgents = JSON.parse(json || '')
		_dbAgents.forEach((agent: DbAgent) => agent.id > _nextId && (_nextId = agent.id + 1))
	} catch (_) {
		createDbAgents()
	}
}

const createDbAgents = () => {
	setDbAgents([
		...GPTs.map((gpt: DbGPT) => ({
			id: randomAgentId(),
			gptId: gpt.id,
			name: gpt.name.replace('GPT', 'AI'),
			avatar: gpt.avatar,
			desc: UI_TAG__GPT_DESCRIPTION,
			setup: '',
			createdAt: randomRecentDate(),
			updatedAt: null,
		})),
		...randomArray(0, 50).map(() => ({
			id: randomAgentId(),
			gptId: randomFromArray(GPTs).id,
			name: randomText(randomInt(1, 20)) + ' AI',
			avatar: randomImageHD(),
			desc: randomLongText(randomInt(0, 5)),
			setup: randomLongText(randomInt(0, 10)),
			createdAt: randomRecentDate(),
			updatedAt: null,
		})),
	])
}

const resetAgentsDB = () => {
	_nextId = 1001 // Reset id
	createDbAgents()
}

export { getDbAgents, GPTs, initAgentsDB, randomAgentId, resetAgentsDB, setDbAgents }
