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
	randomTrue,
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
let _dbAgentsDeleted: DbAgent[]
let _nextId = 1001

const createAgentId = () => _nextId++

const getDbAgents = (everywhere?: boolean) => (everywhere ? [..._dbAgents, ..._dbAgentsDeleted] : _dbAgents)

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
	const departments = ['Design', 'Frontend', 'Backend', 'Marketing', 'Business']

	setDbAgents([
		...GPTs.map((gpt: DbGPT) => ({
			id: createAgentId(),
			gptId: gpt.id,
			name: gpt.name,
			avatar: gpt.avatar,
			desc: UI_TAG__GPT_DESCRIPTION,
			setup: '',
			createdAt: randomRecentDate(),
			updatedAt: null,
		})),
		...departments.map((department: string) => ({
			id: createAgentId(),
			gptId: randomFromArray(GPTs).id,
			name: `AI ${department} Expert`,
			avatar: randomImageHD(),
			desc: `Expert in ${department}`,
			setup: `You are an expert in ${department}`,
			createdAt: randomRecentDate(),
			updatedAt: null,
		})),
		...randomArray(0, 50).map(() => ({
			id: createAgentId(),
			gptId: randomFromArray(GPTs).id,
			name: randomText(randomInt(1, randomTrue() ? 4 : 20)) + ' AI',
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

const randomFromAgentIds = () => randomFromArray(_dbAgents).id

export { createAgentId, getDbAgents, GPTs, initAgentsDB, randomFromAgentIds, resetAgentsDB, setDbAgents }
