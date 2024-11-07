import { createContext } from 'react'
import { Agent, AgentsApiPayload, GPT } from '../../api'

export interface Store {
	agents: Agent[]
	agentsLoading: ListLoading
	agentsPagination: Pagination
	canLoadAgents: boolean
	chatAgentId: number
	gpts: GPT[]
	gptsLoading: ListLoading
	createNewAgent(payload: AgentsApiPayload): Promise<Agent | null>
	deleteAgent(agentId: number): Promise<void>
	loadMoreAgents(): void
	loadUsedAgents(ids: number[]): void
	setChatAgentId(id: number): void
	updateAgent(payload: AgentsApiPayload): Promise<Agent | null>
}

export const AgentsContext = createContext<Store>({
	agents: [],
	agentsLoading: false,
	agentsPagination: { page: 0, count: 0 },
	canLoadAgents: false,
	chatAgentId: 0,
	gpts: [],
	gptsLoading: false,
	createNewAgent: async () => null,
	deleteAgent: async () => {},
	loadMoreAgents: () => {},
	loadUsedAgents: () => {},
	setChatAgentId: () => {},
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
