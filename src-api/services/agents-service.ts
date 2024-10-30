import { AgentsApiData, AgentsApiQuery, ApiResponse, DbAgent, GptApiData, STATUS__SUCCESS } from '../types'
import { RESP__NOT_FOUND } from '../utilities/network'
import { extractInt, extractIntArray, isGreaterThanZero } from '../utilities/parsers'
import { isValidPagination } from '../utilities/validators'
import { getDbAgents, GPTs } from './db'

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
				? dbAgents.filter((agent: DbAgent) => agent.name.toLowerCase().includes(search))
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
}
