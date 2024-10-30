import { createContext } from 'react'
import { Agent, GPT } from '../../api'

export interface Store {
	gpts: GPT[]
	gptsLoading: ListLoading
	agents: Agent[]
	agentsPagination: Pagination
	agentsLoading: ListLoading
	canLoadAgents: boolean
	loadMoreAgents(): void
}

export const AgentsContext = createContext<Store>({
	gpts: [],
	gptsLoading: false,
	agents: [],
	agentsPagination: { page: 0, count: 0 },
	agentsLoading: false,
	canLoadAgents: false,
	loadMoreAgents: () => {},
})
