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
	createNewAgent(payload: AgentsApiPayload): Promise<Agent | null>
	updateAgent(payload: AgentsApiPayload): Promise<Agent | null>
}

export const AgentsContext = createContext<Store>({
	gpts: [],
	gptsLoading: false,
	agents: [],
	agentsPagination: { page: 0, count: 0 },
	agentsLoading: false,
	canLoadAgents: false,
	loadMoreAgents: () => {},
	createNewAgent: async () => null,
	updateAgent: async () => null,
})

export const EMPTY_AGENT: Agent = {
	id: 0,
	gptId: 0,
	name: '',
	avatar: '',
	desc: '',
	setup: '',
	createdAt: '',
	updatedAt: '',
}
