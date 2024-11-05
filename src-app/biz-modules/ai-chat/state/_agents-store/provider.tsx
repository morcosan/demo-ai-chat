import { uniqBy } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { Agent, AgentsApiPayload, API, GPT } from '../../api'
import { AgentsContext, EMPTY_AGENT, Store } from './context'

export const AgentsProvider = ({ children }: ReactProps) => {
	const [gpts, setGpts] = useState<GPT[]>([])
	const [gptsLoading, setGptsLoading] = useState<ListLoading>(false)
	const [agents, setAgents] = useState<Agent[]>([])
	const [agentsPagination, setAgentsPagination] = useState<Pagination>({ page: 0, count: 0 })
	const [agentsLoading, setAgentsLoading] = useState<ListLoading>(false)

	const canLoadAgents = !agentsPagination.page || agents.length < agentsPagination.count

	const loadGPTs = async () => {
		if (gptsLoading || gpts.length) return

		setGptsLoading('full')
		const listing = await API.getGPTs()
		setGpts(listing.gpts)
		setGptsLoading(false)
	}

	const loadMoreAgents = async (reload?: boolean, prevAgents: Agent[] = agents) => {
		if (agentsLoading || !canLoadAgents) return

		setAgentsLoading(agentsPagination.page === 0 ? 'full' : 'more')

		const page = agentsPagination.page + (reload ? 0 : 1)
		const listing = await API.getAgents([], page)

		setAgents(uniqBy([...prevAgents, ...listing.agents], (agent: Agent) => agent.id))
		setAgentsPagination({ page, count: listing.count })
		setAgentsLoading(false)
	}

	const createNewAgent = async (payload: AgentsApiPayload): Promise<Agent | null> => {
		if (agentsLoading) return null

		const newAgent = { ...EMPTY_AGENT, ...payload, loading: true }

		setAgentsLoading('update')
		setAgents([newAgent, ...agents])

		const listing = await API.createAgent(payload)

		setAgents([...listing.agents, ...agents])
		setAgentsPagination({ ...agentsPagination, count: agentsPagination.count + 1 })
		setAgentsLoading(false)

		return listing.agents[0] || null
	}

	const updateAgent = async (payload: AgentsApiPayload): Promise<Agent | null> => {
		const index = agents.findIndex((agent: Agent) => agent.id === payload.agentId)
		if (index > -1) {
			agents[index].loading = true
		}
		setAgents([...agents])

		const listing = await API.updateAgent(payload)

		const newAgent = listing.agents[0]
		if (newAgent) {
			const index = agents.findIndex((agent: Agent) => agent.id === payload.agentId)
			if (index > -1) {
				agents[index] = newAgent
				setAgents([...agents])
				return newAgent
			}
		}

		return null
	}

	const deleteAgent = async (agentId: number): Promise<void> => {
		const index = agents.findIndex((agent: Agent) => agent.id === agentId)
		if (index > -1) {
			agents[index].deleting = true
		}
		setAgents([...agents])

		const listing = await API.deleteAgents([agentId])
		const success = listing.count === agentsPagination.count - 1

		if (success) {
			const newAgents = agents.filter((agent: Agent) => agent.id !== agentId)

			setAgents(newAgents)
			setAgentsPagination({ page: agentsPagination.page, count: listing.count })

			if (agentsPagination.page === 1) {
				// Reload first page to avoid breaking load-on-scroll
				loadMoreAgents(true, newAgents)
			}
		} else {
			agents[index].deleting = false
			setAgents([...agents])
		}
	}

	useEffect(() => {
		loadGPTs()
		!agentsPagination.page && loadMoreAgents()
	}, [])

	const store: Store = useMemo(
		() => ({
			agents,
			agentsLoading,
			agentsPagination,
			canLoadAgents,
			gpts,
			gptsLoading,
			createNewAgent,
			deleteAgent,
			loadMoreAgents,
			updateAgent,
		}),
		[gpts, gptsLoading, agents, agentsPagination, agentsLoading]
	)

	return <AgentsContext.Provider value={store}>{children}</AgentsContext.Provider>
}
