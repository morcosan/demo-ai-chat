import {
	CreativityLevel,
	DbAgent,
	DbGPT,
	GPT_ID__GEMINI_NANO,
	GPT_ID__LOREM_IPSUM,
	GPT_ID__RAMMUS,
	GptConfig,
	GptMessage,
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
import { GeminiNanoAPI } from '../gpt/gemini-nano-api'
import { LoremIpsumAPI } from '../gpt/lorem-ipsum-api'
import { RammusAPI } from '../gpt/rammus-api'

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
			enabled: LoremIpsumAPI.isAvailable(),
		},
		{
			id: GPT_ID__RAMMUS,
			name: 'Rammus GPT',
			avatar: ENV__ROOT_URL_PATH + '/avatars/rammus.png',
			desc: '',
			enabled: RammusAPI.isAvailable(),
		},
		{
			id: GPT_ID__GEMINI_NANO,
			name: 'Gemini Nano',
			avatar: ENV__ROOT_URL_PATH + '/avatars/gemini.svg',
			desc: '',
			enabled: GeminiNanoAPI.isAvailable(),
		},
	]
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
	const levels = ['high', 'mid', 'min', 'max', 'low'] satisfies CreativityLevel[]

	setDbActiveAgents([
		..._GPTs.map((gpt: DbGPT) => ({
			id: createAgentId(),
			gptId: gpt.id,
			name: gpt.name,
			avatar: gpt.avatar,
			desc: UI_TAG__GPT_DESCRIPTION,
			prompt: '',
			creativity: 'mid' as CreativityLevel,
			createdAt: randomRecentDate(),
			updatedAt: null,
		})),
		...departments.map((department: string, index: number) => ({
			id: createAgentId(),
			gptId: randomFromArray(_GPTs).id,
			name: `AI ${department} Expert`,
			avatar: randomImageHD(),
			desc: `Expert in ${department}`,
			prompt: `You are an expert in ${department}`,
			creativity: levels[index],
			createdAt: randomRecentDate(),
			updatedAt: null,
		})),
		...randomArray(0, 50).map(() => ({
			id: createAgentId(),
			gptId: randomFromArray(_GPTs).id,
			name: randomText(randomInt(1, randomTrue() ? 4 : 20)) + ' AI',
			avatar: randomImageHD(),
			desc: randomLongText(randomInt(0, 5)),
			prompt: randomLongText(randomInt(0, 10)),
			creativity: randomFromArray<CreativityLevel>(levels),
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

const randomFromAgentIds = () => {
	const gptIds = [GPT_ID__LOREM_IPSUM, GPT_ID__RAMMUS]
	const agents = _dbActiveAgents.filter((agent: DbAgent) => gptIds.includes(agent.gptId))

	return randomFromArray(agents).id
}

const getGptResponse = async (agentId: number, messages: GptMessage[]): Promise<string> => {
	const agent = _dbActiveAgents.find((agent: DbAgent) => agent.id === agentId)
	if (agent) {
		const config: GptConfig = {
			prompt: agent.prompt,
			creativity: agent.creativity,
		}
		if (agent.gptId === GPT_ID__GEMINI_NANO) return GeminiNanoAPI.getResponse(config, messages)
		if (agent.gptId === GPT_ID__LOREM_IPSUM) return LoremIpsumAPI.getResponse(config, messages)
		if (agent.gptId === GPT_ID__RAMMUS) return RammusAPI.getResponse(config, messages)
	}
	return ''
}

export {
	createAgentId,
	getDbActiveAgents,
	getDbDeletedAgents,
	getGptResponse,
	getGPTs,
	initAgentsDB,
	randomFromAgentIds,
	resetAgentsDB,
	setDbActiveAgents,
	setDbDeletedAgents,
}
