import { useMemo, useState } from 'react'
import { Agent, GPT } from '../../api'
import { AgentsContext, Store } from './context'

export const AgentsProvider = ({ children }: ReactProps) => {
	const [gpts, setGpts] = useState<GPT[]>([])
	const [gptsLoading, setGptsLoading] = useState<ListLoading>(false)
	const [agents, setAgents] = useState<Agent[]>([])
	const [agentsPagination, setAgentsPagination] = useState<Pagination>({ page: 0, count: 0 })
	const [agentsLoading, setAgentsLoading] = useState<ListLoading>(false)

	const canLoadAgents = !agentsPagination.page || agents.length < agentsPagination.count

	const store: Store = useMemo(
		() => ({
			gpts,
			gptsLoading,
			agents,
			agentsPagination,
			agentsLoading,
			canLoadAgents,
		}),
		[gpts, gptsLoading, agents, agentsPagination, agentsLoading]
	)

	return <AgentsContext.Provider value={store}>{children}</AgentsContext.Provider>
}
