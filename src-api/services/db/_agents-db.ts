import { DbAgent, DbGPT } from '@api/types'
import { COOKIE_KEY } from '@utils/release'

const GPTs: DbGPT[] = [
	{ id: 0, name: 'Lorem Ipsum GPT', desc: '' },
	{ id: 1, name: 'Rammus GPT', desc: '' },
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
		{ id: 0, gptId: 0, name: 'Lorem Ipsum AI', desc: '', setup: '' },
		{ id: 1, gptId: 1, name: 'Rammus AI', desc: '', setup: '' },
	])
}

export { getDbAgents, GPTs, initAgentsDB, resetDbAgents, setDbAgents }
