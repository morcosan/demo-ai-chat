import {
	AgentsApiData,
	AgentsApiPayload,
	AgentsApiQuery,
	ApiResponse,
	DbAgent,
	GptApiData,
	STATUS__SUCCESS,
	UI_TAG__GPT_DESCRIPTION,
} from '../types'
import { RESP__INVALID_DATA, RESP__NOT_FOUND } from '../utilities/network'
import { extractInt, extractIntArray, isGreaterThanZero } from '../utilities/parsers'
import { isValidPagination } from '../utilities/validators'
import { getDbAgents, GPTs, randomAgentId, resetAgentsDB, setDbAgents } from './db'

const DEFAULT_COUNT = 10
const DEFAULT_PAGE = 1

export const agentsService = {
	async getGPTs(): Promise<ApiResponse<GptApiData>> {
		return {
			status: STATUS__SUCCESS,
			data: { count: GPTs.length, items: GPTs },
		}
	},

	async getAgents(query: AgentsApiQuery): Promise<ApiResponse<AgentsApiData>> {
		const page = extractInt(query.page, DEFAULT_PAGE, isGreaterThanZero)
		const count = extractInt(query.count, DEFAULT_COUNT, isGreaterThanZero)
		const agentIds = extractIntArray(query.agentIds, isGreaterThanZero)
		const search = query.search?.trim().toLowerCase()
		const dbAgents = getDbAgents()

		if (agentIds.length) {
			const agents = dbAgents.filter((agent: DbAgent) => agentIds.includes(agent.id))

			return {
				status: STATUS__SUCCESS,
				data: { count: agents.length, items: agents },
			}
		} else {
			const agents = search
				? dbAgents.filter((agent: DbAgent) => {
						return (
							agent.name.toLowerCase().includes(search) ||
							agent.desc.toLowerCase().includes(search) ||
							agent.desc === UI_TAG__GPT_DESCRIPTION
						)
					})
				: dbAgents

			if (!isValidPagination(page, count, dbAgents.length)) {
				return { ...RESP__NOT_FOUND, error: `Page ${page} not found for ${dbAgents.length} agents` }
			}

			return {
				status: STATUS__SUCCESS,
				data: {
					count: agents.length,
					items: agents.slice(count * (page - 1), count * page),
				},
			}
		}
	},

	async postAgent(payload: AgentsApiPayload): Promise<ApiResponse<AgentsApiData>> {
		const { avatar, name, desc, setup } = payload
		const gptId = extractInt(payload.gptId, 0, isGreaterThanZero)

		if (!name || !avatar || !gptId) return { ...RESP__INVALID_DATA, error: `Name, avatar and GPT cannot be empty` }

		const agent: DbAgent = {
			id: randomAgentId(),
			gptId: gptId,
			name: name,
			avatar: avatar,
			desc: desc || '',
			setup: setup || '',
			createdAt: new Date().toISOString(),
			updatedAt: null,
		}
		setDbAgents([agent, ...getDbAgents()])

		return {
			status: STATUS__SUCCESS,
			data: { count: 1, items: [agent] },
		}
	},

	async patchAgent(payload: AgentsApiPayload): Promise<ApiResponse<AgentsApiData>> {
		const { avatar, name, desc, setup } = payload
		const agentId = extractInt(payload.agentId, 0, isGreaterThanZero)
		const gptId = extractInt(payload.gptId, 0, isGreaterThanZero)
		const dbAgents = getDbAgents()

		if (!name || !avatar || !gptId) return { ...RESP__INVALID_DATA, error: `Name, avatar and GPT cannot be empty` }

		const agent = dbAgents.find((agent: DbAgent) => agent.id === agentId)
		if (!agent) return { ...RESP__NOT_FOUND, error: `Agent ID ${agentId} not found` }

		agent.gptId = gptId
		agent.name = name
		agent.avatar = avatar
		agent.desc = desc || ''
		agent.setup = setup || ''
		agent.updatedAt = new Date().toISOString()

		setDbAgents(dbAgents)

		return { status: STATUS__SUCCESS, data: { count: 1, items: [agent] } }
	},

	async deleteAgents(query: AgentsApiQuery): Promise<ApiResponse<AgentsApiData>> {
		const agentIds = extractIntArray(query.agentIds, isGreaterThanZero)
		const dbAgents = getDbAgents()

		agentIds.forEach((agentId: number) => {
			const index = dbAgents.findIndex((agent: DbAgent) => agent.id === agentId)
			if (index > -1) {
				dbAgents.splice(index, 1)
			}
		})

		setDbAgents(dbAgents)

		return {
			status: STATUS__SUCCESS,
			data: { count: dbAgents.length, items: [] },
		}
	},

	resetDB() {
		resetAgentsDB()
	},
}
