import { createContext } from 'react'
import { Agent, AgentsApiPayload, GPT } from '../../api'

export interface Store {
	allAgents: Agent[]
	allAgentsLoading: ListLoading
	allAgentsPagination: Pagination
	allGPTs: GPT[]
	allGPTsLoading: ListLoading
	canLoadAgents: boolean
	chatViewAgentId: number
	createNewAgent(payload: AgentsApiPayload): Promise<Agent | null>
	deleteAgent(agentId: number): Promise<void>
	loadMoreAgents(): void
	loadUsedAgents(ids: number[]): void
	setChatViewAgentId(id: number): void
	updateAgent(payload: AgentsApiPayload): Promise<Agent | null>
}

export const AgentsContext = createContext<Store>({
	allAgents: [],
	allAgentsLoading: false,
	allAgentsPagination: { page: 0, count: 0 },
	allGPTs: [],
	allGPTsLoading: false,
	canLoadAgents: false,
	chatViewAgentId: 0,
	createNewAgent: async () => null,
	deleteAgent: async () => {},
	loadMoreAgents: () => {},
	loadUsedAgents: () => {},
	setChatViewAgentId: () => {},
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
