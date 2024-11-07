import { useEffect, useState } from 'react'
import { Agent } from '../api'
import { aiChatEmitter, EVENT__REFRESH_AGENT } from '../utils/events'

export const useRefreshableAgents = () => {
	const [agents, setAgents] = useState<Agent[]>([])

	const refreshAgent = (agent: Agent) => {
		const index = agents.findIndex((other: Agent) => other.id === agent.id)
		if (index === -1) return

		agents[index] = agent
		setAgents([...agents])
	}

	useEffect(() => {
		aiChatEmitter.on(EVENT__REFRESH_AGENT, refreshAgent)

		return () => {
			aiChatEmitter.off(EVENT__REFRESH_AGENT, refreshAgent)
		}
	}, [agents])

	return [agents, setAgents] as [Agent[], Function]
}
