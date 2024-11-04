import { createContext } from 'react'
import { Agent, AgentsApiPayload, GPT } from '../../api'

export interface Store {
	gpts: GPT[]
	gptsLoading: ListLoading
	agents: Agent[]
	agentsPagination: Pagination
	agentsLoading: ListLoading
	canLoadAgents: boolean
	loadMoreAgents(): void
	updateAgent(payload: AgentsApiPayload): Promise<Agent | null>
}

export const AGENT_EMPTY: Agent = { id: 0, gptId: 0, name: '', avatar: '', desc: '', setup: '' }

export const AgentsContext = createContext<Store>({
	gpts: [],
	gptsLoading: false,
	agents: [],
	agentsPagination: { page: 0, count: 0 },
	agentsLoading: false,
	canLoadAgents: false,
	loadMoreAgents: () => {},
	updateAgent: async () => null,
})
