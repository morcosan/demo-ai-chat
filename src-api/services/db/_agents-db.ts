import { DbAgent, DbGPT, GPT_ID__LOREM_IPSUM, GPT_ID__RAMMUS, UI_TAG__GPT_DESCRIPTION } from '@api/types'
import {
	COOKIE_KEY,
	randomArray,
	randomFromArray,
	randomImageHD,
	randomInt,
	randomLongText,
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

let _agents: DbAgent[]

const getDbAgents = () => _agents

const setDbAgents = (value: DbAgent[]) => {
	_agents = value
	localStorage.setItem(COOKIE_KEY.DB_AGENTS, JSON.stringify(value))
}

const initAgentsDB = () => {
	try {
		const json = localStorage.getItem(COOKIE_KEY.DB_AGENTS)
		_agents = JSON.parse(json || '')
	} catch (_) {
		resetDbAgents()
	}
}

const resetDbAgents = () => {
	setDbAgents([
		...GPTs.map((gpt: DbGPT, index: number) => ({
			id: index,
			gptId: gpt.id,
			name: gpt.name.replace('GPT', 'AI'),
			avatar: gpt.avatar,
			desc: UI_TAG__GPT_DESCRIPTION,
			setup: '',
		})),
		...randomArray(0, 50).map((_, index: number) => ({
			id: index + GPTs.length,
			gptId: randomFromArray(GPTs).id,
			name: randomText(randomInt(1, 20)) + ' AI',
			avatar: randomImageHD(),
			desc: randomLongText(randomInt(0, 5)),
			setup: randomLongText(randomInt(0, 10)),
		})),
	])
}

export { getDbAgents, GPTs, initAgentsDB, resetDbAgents, setDbAgents }
