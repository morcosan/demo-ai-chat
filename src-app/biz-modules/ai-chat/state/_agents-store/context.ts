import { createContext } from 'react'
import { Agent, AgentsApiPayload, GPT } from '../../api'

export interface Store {
	allAgents: Agent[]
	allAgentsForChat: Agent[]
	allAgentsLoading: ListLoading
	allAgentsPagination: Pagination
	allGPTs: GPT[]
	allGPTsLoading: ListLoading
	canLoadAgents: boolean
	chatViewAgentId: number
	createNewAgent(payload: AgentsApiPayload): Promise<Agent | null>
	deleteAgent(agentId: number): Promise<void>
	loadMissingAgents(ids: number[]): void
	loadMoreAgents(): void
	setChatViewAgentId(id: number): void
	updateAgent(payload: AgentsApiPayload): Promise<Agent | null>
}

export const AgentsContext = createContext<Store>({
	allAgents: [],
	allAgentsForChat: [],
	allAgentsLoading: false,
	allAgentsPagination: { page: 0, count: 0 },
	allGPTs: [],
	allGPTsLoading: false,
	canLoadAgents: false,
	chatViewAgentId: 0,
	createNewAgent: async () => null,
	deleteAgent: async () => {},
	loadMissingAgents: () => {},
	loadMoreAgents: () => {},
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
