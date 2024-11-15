import {
	DbAgent,
	DbGPT,
	GPT_ID__GEMINI_NANO,
	GPT_ID__LOREM_IPSUM,
	GPT_ID__RAMMUS,
	GptConfig,
	GptUnit,
	UI_TAG__GPT_DESCRIPTION,
} from '@api/types'
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
import { GeminiNano } from '../gpt/gemini-nano'
import { LoremIpsum } from '../gpt/lorem-ipsum'
import { Rammus } from '../gpt/rammus'

let _GPTs: DbGPT[]

const getGPTs = () => _GPTs

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

const initGPTs = () => {
	_GPTs = [
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

	if (GeminiNano.isAvailable) {
		_GPTs.push({
			id: GPT_ID__GEMINI_NANO,
			name: 'Gemini Nano',
			avatar: ENV__ROOT_URL_PATH + '/avatars/gemini.svg',
			desc: '',
		})
	}
}

const initAgentsDB = () => {
	initGPTs()

	try {
		const json = localStorage.getItem(COOKIE_KEY.DB_AGENTS)
		_dbActiveAgents = JSON.parse(json || '')
		_dbActiveAgents.forEach((agent: DbAgent) => agent.id >= _nextId && (_nextId = agent.id + 1))
	} catch (_) {
		createDbAgents()
	}

	try {
		const json = localStorage.getItem(COOKIE_KEY.DB_AGENTS_DELETED)
		_dbDeletedAgents = JSON.parse(json || '')
		_dbDeletedAgents.forEach((agent: DbAgent) => agent.id >= _nextId && (_nextId = agent.id + 1))
	} catch (_) {
		_dbDeletedAgents = []
	}
}

const createDbAgents = () => {
	const departments = ['Design', 'Frontend', 'Backend', 'Marketing', 'Business']

	setDbActiveAgents([
		..._GPTs.map((gpt: DbGPT) => ({
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
			gptId: randomFromArray(_GPTs).id,
			name: `AI ${department} Expert`,
			avatar: randomImageHD(),
			desc: `Expert in ${department}`,
			setup: `You are an expert in ${department}`,
			createdAt: randomRecentDate(),
			updatedAt: null,
		})),
		...randomArray(0, 50).map(() => ({
			id: createAgentId(),
			gptId: randomFromArray(_GPTs).id,
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
	setDbDeletedAgents([])
	createDbAgents()
}

const randomFromAgentIds = () => randomFromArray(_dbActiveAgents).id

const getGptUnit = async (agentId: number): Promise<GptUnit | null> => {
	const agent = _dbActiveAgents.find((agent: DbAgent) => agent.id === agentId)
	if (agent) {
		const config: GptConfig = {
			setup: agent.setup,
		}
		if (agent.gptId === GPT_ID__GEMINI_NANO) return GeminiNano.createUnit(config)
		if (agent.gptId === GPT_ID__LOREM_IPSUM) return LoremIpsum.createUnit(config)
		if (agent.gptId === GPT_ID__RAMMUS) return Rammus.createUnit(config)
	}
	return null
}

export {
	createAgentId,
	getDbActiveAgents,
	getDbDeletedAgents,
	getGPTs,
	getGptUnit,
	initAgentsDB,
	randomFromAgentIds,
	resetAgentsDB,
	setDbActiveAgents,
	setDbDeletedAgents,
}
