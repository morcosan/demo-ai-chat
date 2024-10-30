import { uniqBy } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { Agent, API, GPT } from '../../api'
import { AgentsContext, Store } from './context'

export const AgentsProvider = ({ children }: ReactProps) => {
	const [gpts, setGpts] = useState<GPT[]>([])
	const [gptsLoading, setGptsLoading] = useState<ListLoading>(false)
	const [agents, setAgents] = useState<Agent[]>([])
	const [agentsPagination, setAgentsPagination] = useState<Pagination>({ page: 0, count: 0 })
	const [agentsLoading, setAgentsLoading] = useState<ListLoading>(false)

	const canLoadAgents = !agentsPagination.page || agents.length < agentsPagination.count

	const loadMoreAgents = async (reload?: boolean, prevAgents: Agent[] = agents) => {
		if (agentsLoading || !canLoadAgents) return

		setAgentsLoading(agentsPagination.page === 0 ? 'full' : 'more')

		const page = agentsPagination.page + (reload ? 0 : 1)
		const listing = await API.getAgents([], page)

		setAgents(uniqBy([...prevAgents, ...listing.agents], (agent: Agent) => agent.id))
		setAgentsPagination({ page, count: listing.count })
		setAgentsLoading(false)
	}

	useEffect(() => {
		!agentsPagination.page && loadMoreAgents()
	}, [])

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
