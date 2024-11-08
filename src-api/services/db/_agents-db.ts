import { DbAgent, DbGPT, GPT_ID__LOREM_IPSUM, GPT_ID__RAMMUS, GptAPI, UI_TAG__GPT_DESCRIPTION } from '@api/types'
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
import { LoremIpsum } from '../gpt/lorem-ipsum'
import { Rammus } from '../gpt/rammus'

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

let _dbActiveAgents: DbAgent[]
let _dbDeletedAgents: DbAgent[]
let _nextId = 1001

const createAgentId = () => _nextId++
const getDbActiveAgents = () => _dbActiveAgents
const getDbDeletedAgents = () => _dbDeletedAgents

const setDbActiveAgents = (value: DbAgent[]) => {
	_dbActiveAgents = value
	localStorage.setItem(COOKIE_KEY.DB_AGENTS, JSON.stringify(value))
}

const setDbDeletedAgents = (value: DbAgent[]) => {
	_dbDeletedAgents = value
	localStorage.setItem(COOKIE_KEY.DB_AGENTS_DELETED, JSON.stringify(value))
}

const initAgentsDB = () => {
	try {
		const json = localStorage.getItem(COOKIE_KEY.DB_AGENTS)
		_dbActiveAgents = JSON.parse(json || '')
		_dbActiveAgents.forEach((agent: DbAgent) => agent.id > _nextId && (_nextId = agent.id + 1))
	} catch (_) {
		createDbAgents()
	}

	try {
		const json = localStorage.getItem(COOKIE_KEY.DB_AGENTS_DELETED)
		_dbDeletedAgents = JSON.parse(json || '')
		_dbDeletedAgents.forEach((agent: DbAgent) => agent.id > _nextId && (_nextId = agent.id + 1))
	} catch (_) {
		_dbDeletedAgents = []
	}
}

const createDbAgents = () => {
	const departments = ['Design', 'Frontend', 'Backend', 'Marketing', 'Business']

	setDbActiveAgents([
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
	_dbDeletedAgents = []
	createDbAgents()
}

const randomFromAgentIds = () => randomFromArray(_dbActiveAgents).id

const getGptAPI = (agentId: number): GptAPI | null => {
	const agent = _dbActiveAgents.find((agent: DbAgent) => agent.id === agentId)
	if (!agent) return null
	if (agent.gptId === GPT_ID__LOREM_IPSUM) return LoremIpsum
	if (agent.gptId === GPT_ID__RAMMUS) return Rammus
	return null
}

export {
	createAgentId,
	getDbActiveAgents,
	getDbDeletedAgents,
	getGptAPI,
	GPTs,
	initAgentsDB,
	randomFromAgentIds,
	resetAgentsDB,
	setDbActiveAgents,
	setDbDeletedAgents,
}
