import { uniqBy } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { Agent, AgentsApiPayload, API, GPT } from '../../api'
import { useRefreshableAgents } from '../../hooks/use-refreshable-agents'
import { AgentsContext, EMPTY_AGENT, Store } from './context'

const agentIdFn = (agent: Agent) => agent.id

export const AgentsProvider = ({ children }: ReactProps) => {
	const [allAgents, setAllAgents] = useRefreshableAgents()
	const [allAgentsForChat, setAllAgentsForChat] = useRefreshableAgents()
	const [allAgentsLoading, setAllAgentsLoading] = useState<ListLoading>(false)
	const [allAgentsPagination, setAllAgentsPagination] = useState<Pagination>({ page: 0, count: 0 })
	const [allGPTs, setAllGPTs] = useState<GPT[]>([])
	const [allGPTsLoading, setAllGPTsLoading] = useState<ListLoading>(false)
	const [chatViewAgentId, setChatViewAgentId] = useState(0)

	const canLoadAgents = !allAgentsPagination.page || allAgents.length < allAgentsPagination.count

	const loadGPTs = async () => {
		if (allGPTsLoading || allGPTs.length) return

		setAllGPTsLoading('full')
		const listing = await API.getGPTs()
		setAllGPTs(listing.gpts)
		setAllGPTsLoading(false)
	}

	const loadMoreAgents = async (reload?: boolean) => {
		if (allAgentsLoading || !canLoadAgents) return

		setAllAgentsLoading(allAgentsPagination.page === 0 ? 'full' : 'more')

		const page = allAgentsPagination.page + (reload ? 0 : 1)
		const listing = await API.getAgents([], page)

		setAllAgents((agents: Agent[]) => uniqBy([...agents, ...listing.agents], agentIdFn))
		setAllAgentsForChat((agents: Agent[]) => uniqBy([...agents, ...listing.agents], agentIdFn))
		setAllAgentsPagination({ page, count: listing.count })
		setAllAgentsLoading(false)
	}

	const loadMissingAgents = async (ids: number[]) => {
		const currentIds = allAgentsForChat.map(agentIdFn)
		const missingIds = ids.filter((id: number) => !currentIds.includes(id))

		const listing = await API.getAgents(missingIds, 0, '', true)

		setAllAgentsForChat((agents: Agent[]) => uniqBy([...agents, ...listing.agents], agentIdFn))
	}

	const createNewAgent = async (payload: AgentsApiPayload): Promise<Agent | null> => {
		if (allAgentsLoading) return null

		const newAgent: Agent = { ...EMPTY_AGENT, ...payload, updating: true }

		setAllAgentsLoading('update')
		setAllAgents([newAgent, ...allAgents])

		const listing = await API.createAgent(payload)

		setAllAgents([...listing.agents, ...allAgents])
		setAllAgentsPagination({ ...allAgentsPagination, count: allAgentsPagination.count + 1 })
		setAllAgentsLoading(false)

		return listing.agents[0] || null
	}

	const updateAgent = async (payload: AgentsApiPayload): Promise<Agent | null> => {
		const index = allAgents.findIndex((agent: Agent) => agent.id === payload.agentId)
		if (index === -1) return null

		allAgents[index].updating = true
		setAllAgents([...allAgents])

		const listing = await API.updateAgent(payload)

		const newAgent = listing.agents[0]
		if (newAgent) {
			allAgents[index] = newAgent
			setAllAgents([...allAgents])
			return newAgent
		}

		return null
	}

	const deleteAgent = async (agentId: number): Promise<void> => {
		const index = allAgents.findIndex((agent: Agent) => agent.id === agentId)
		if (index === -1) return

		allAgents[index].deleting = true
		setAllAgents([...allAgents])

		const listing = await API.deleteAgents([agentId])
		const success = listing.count === allAgentsPagination.count - 1

		if (success) {
			const newAgents = allAgents.filter((agent: Agent) => agent.id !== agentId)

			setAllAgents(newAgents)
			setAllAgentsPagination({ page: allAgentsPagination.page, count: listing.count })

			if (allAgentsPagination.page === 1) {
				loadMoreAgents(true) // Reload first page to avoid breaking load-on-scroll
			}
		} else {
			allAgents[index].deleting = false
			setAllAgents([...allAgents])
		}
	}

	useEffect(() => {
		loadGPTs()
		!allAgentsPagination.page && loadMoreAgents()
	}, [])

	const store: Store = useMemo(
		() => ({
			allAgents,
			allAgentsForChat,
			allAgentsLoading,
			allAgentsPagination,
			allGPTs,
			allGPTsLoading,
			canLoadAgents,
			chatViewAgentId,
			createNewAgent,
			deleteAgent,
			loadMissingAgents,
			loadMoreAgents,
			setChatViewAgentId,
			updateAgent,
		}),
		[allAgents, allAgentsForChat, allAgentsLoading, allAgentsPagination, allGPTs, allGPTsLoading, chatViewAgentId]
	)

	return <AgentsContext.Provider value={store}>{children}</AgentsContext.Provider>
}
