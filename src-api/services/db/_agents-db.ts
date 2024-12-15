import {
	CreativityLevel,
	DbAgent,
	DbGPT,
	DEV_GPT_IDS,
	GPT_ID,
	GptConfig,
	GptMessage,
	GptResponse,
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
import { ChatGPT4o, ChatGPT4oMini } from '../gpt/chatgpt'
import { ChromeGPT } from '../gpt/chrome-gpt'
import { Claude35Haiku, Claude35Sonnet } from '../gpt/claude'
import { LoremIpsumGPT } from '../gpt/lorem-ipsum-gpt'
import { RammusGPT } from '../gpt/rammus-gpt'

let _GPTs: DbGPT[]
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

const getGPTs = async () => {
	const enabledMap: Record<number, boolean> = {
		[GPT_ID.CHATGPT_4O]: await ChatGPT4o.isAvailable(),
		[GPT_ID.CHATGPT_4O_MINI]: await ChatGPT4oMini.isAvailable(),
		[GPT_ID.CHROME_GPT]: await ChromeGPT.isAvailable(),
		[GPT_ID.CLAUDE_3_5_HAIKU]: await Claude35Haiku.isAvailable(),
		[GPT_ID.CLAUDE_3_5_SONNET]: await Claude35Sonnet.isAvailable(),
		[GPT_ID.LOREM_IPSUM_GPT]: await LoremIpsumGPT.isAvailable(),
		[GPT_ID.RAMMUS_GPT]: await RammusGPT.isAvailable(),
	}
	return _GPTs.map((gpt: DbGPT) => ({ ...gpt, enabled: enabledMap[gpt.id] }))
}

const initGPTs = async () => {
	_GPTs = [
		{
			id: GPT_ID.LOREM_IPSUM_GPT,
			name: 'Lorem Ipsum GPT',
			avatar: ENV__ROOT_URL_PATH + '/avatars/default.svg',
			desc: '',
			enabled: false,
		},
		{
			id: GPT_ID.RAMMUS_GPT,
			name: 'Rammus GPT',
			avatar: ENV__ROOT_URL_PATH + '/avatars/rammus.png',
			desc: '',
			enabled: false,
		},
		{
			id: GPT_ID.CHATGPT_4O_MINI,
			name: 'ChatGPT 4o Mini',
			avatar: ENV__ROOT_URL_PATH + '/avatars/openai.svg',
			desc: '',
			enabled: false,
		},
		{
			id: GPT_ID.CHATGPT_4O,
			name: 'ChatGPT 4o',
			avatar: ENV__ROOT_URL_PATH + '/avatars/openai.svg',
			desc: '',
			enabled: false,
		},
		{
			id: GPT_ID.CLAUDE_3_5_HAIKU,
			name: 'Claude 3.5 Haiku',
			avatar: ENV__ROOT_URL_PATH + '/avatars/anthropic.svg',
			desc: '',
			enabled: false,
		},
		{
			id: GPT_ID.CLAUDE_3_5_SONNET,
			name: 'Claude 3.5 Sonnet',
			avatar: ENV__ROOT_URL_PATH + '/avatars/anthropic.svg',
			desc: '',
			enabled: false,
		},
		{
			id: GPT_ID.CHROME_GPT,
			name: 'Chrome GPT',
			avatar: ENV__ROOT_URL_PATH + '/avatars/chrome.svg',
			desc: '',
			enabled: false,
		},
	]
}

const initAgentsDB = async () => {
	await initGPTs()

	try {
		const json = localStorage.getItem(COOKIE_KEY.DB_AGENTS)
		_dbActiveAgents = JSON.parse(json || '')
		_dbActiveAgents.forEach((agent: DbAgent) => agent.id >= _nextId && (_nextId = agent.id + 1))
	} catch (_) {
		createDbAgents(true)
	}

	try {
		const json = localStorage.getItem(COOKIE_KEY.DB_AGENTS_DELETED)
		_dbDeletedAgents = JSON.parse(json || '')
		_dbDeletedAgents.forEach((agent: DbAgent) => agent.id >= _nextId && (_nextId = agent.id + 1))
	} catch (_) {
		_dbDeletedAgents = []
	}
}

const createDbAgents = (random: boolean) => {
	const departments = ['Design', 'Frontend', 'Backend', 'Marketing', 'Business']
	const levels = ['high', 'mid', 'min', 'max', 'low'] satisfies CreativityLevel[]

	const agents = [
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
	]

	if (random) {
		agents.push(
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
			}))
		)
	}

	setDbActiveAgents(agents)
}

const resetAgentsDB = (random: boolean) => {
	_nextId = 1001 // Reset id
	setDbDeletedAgents([])
	createDbAgents(random)
}

const randomFromAgentIds = () => {
	const agents = _dbActiveAgents.filter((agent: DbAgent) => DEV_GPT_IDS.includes(agent.gptId))

	return randomFromArray(agents).id
}

const getGptResponse = async (agentId: number, messages: GptMessage[]): Promise<GptResponse> => {
	const agent = _dbActiveAgents.find((agent: DbAgent) => agent.id === agentId)
	if (agent) {
		const config: GptConfig = {
			prompt: agent.prompt,
			creativity: agent.creativity,
		}
		if (agent.gptId === GPT_ID.CHATGPT_4O) return ChatGPT4o.getResponse(config, messages)
		if (agent.gptId === GPT_ID.CHATGPT_4O_MINI) return ChatGPT4oMini.getResponse(config, messages)
		if (agent.gptId === GPT_ID.CHROME_GPT) return ChromeGPT.getResponse(config, messages)
		if (agent.gptId === GPT_ID.CLAUDE_3_5_HAIKU) return Claude35Haiku.getResponse(config, messages)
		if (agent.gptId === GPT_ID.CLAUDE_3_5_SONNET) return Claude35Sonnet.getResponse(config, messages)
		if (agent.gptId === GPT_ID.LOREM_IPSUM_GPT) return LoremIpsumGPT.getResponse(config, messages)
		if (agent.gptId === GPT_ID.RAMMUS_GPT) return RammusGPT.getResponse(config, messages)
	}
	return { text: '' }
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
