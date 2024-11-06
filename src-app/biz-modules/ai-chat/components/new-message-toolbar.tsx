import { SelectField, SelectOptionProps } from '@app/library/release'
import { BuildSvg, IconButton } from '@ds/release'
import { uniqBy } from 'lodash'
import { useEffect, useState } from 'react'
import { Agent, API } from '../api'
import { AgentEditModal } from '../components/agent-edit-modal'
import { OptionItem } from '../components/items/option-item'
import { EMPTY_AGENT } from '../state'
import { parseGptDescription } from '../utils'

interface Props extends ReactProps {
	primary?: boolean
}

const AgentValue = (props: SelectOptionProps) => <OptionItem agent={props.option as Agent} compact subtle />
const AgentOption = (props: SelectOptionProps) => (
	<OptionItem agent={props.option as Agent} selected={props.selected} />
)

export const NewMessageToolbar = ({ primary, children }: Props) => {
	const [agentId, setAgentId] = useState(0)
	const [agents, setAgents] = useState<Agent[]>([])
	const [agentPagination, setAgentPagination] = useState<Pagination>({ page: 0, count: 0 })
	const [agentLoading, setAgentLoading] = useState<ListLoading>(false)
	const [search, setSearch] = useState('')
	const [showsAgentModal, setShowsAgentModal] = useState(false)

	const agentToEdit = agents.find((agent: Agent) => agent.id === agentId) || EMPTY_AGENT

	const canLoadMoreAgents = !agentPagination.page || agents.length < agentPagination.count

	const agentFilterFn = (option: object, keyword: string) => {
		const agent = option as Agent
		const name = agent.name.toLowerCase()
		const desc = parseGptDescription(agent.gptId, agent.desc).toLowerCase()

		return !keyword || name.includes(keyword) || desc.includes(keyword)
	}

	const fetchMoreAgents = async () => {
		if (agentLoading || !canLoadMoreAgents) return

		setAgentLoading(agentPagination.page ? 'more' : 'full')

		const listing = await API.getAgents([], agentPagination.page + 1, search)
		let newAgents = uniqBy([...agents, ...listing.agents], (agent: Agent) => agent.id)

		if (agentId) {
			const hasAgentId = newAgents.some((agent: Agent) => agent.id === agentId)
			if (!hasAgentId) {
				const extraListing = await API.getAgents([agentId])
				newAgents = [...newAgents, ...extraListing.agents]
			}
		} else {
			listing.agents.length && setAgentId(listing.agents[0].id)
		}

		setAgents(newAgents)
		setAgentPagination({ page: agentPagination.page + 1, count: listing.count })
		setAgentLoading(false)
	}

	const onSearchAgent = (value: string) => {
		setSearch(value)
		setAgents([])
		setAgentPagination({ page: 0, count: 0 })
	}

	const onSubmitAgent = async (payload: Agent) => {
		const index = agents.findIndex((agent: Agent) => agent.id === payload.id)
		if (index === -1) return

		agents[index].updating = true
		setAgents([...agents])

		const listing = await API.updateAgent({
			agentId: payload.id,
			gptId: payload.gptId,
			name: payload.name.trim(),
			avatar: payload.avatar.trim(),
			desc: payload.desc.trim(),
			setup: payload.setup.trim(),
		})

		const newAgent = listing.agents[0]
		if (newAgent) {
			agents[index] = newAgent
			setAgents([...agents])
			setShowsAgentModal(false)
		}
	}

	useEffect(() => {
		!agentPagination.page && fetchMoreAgents()
	}, [agentPagination])

	return (
		<div>
			{/* TOOLBAR */}
			<div className="mb-xs-1">
				<SelectField
					id={primary ? 'agent-chat' : 'agent-subchat'}
					value={agentId}
					options={agents}
					filterFn={agentFilterFn}
					loading={agentLoading === 'full'}
					loadingMore={agentLoading === 'more'}
					canLoadMore={canLoadMoreAgents}
					loadingText={t('aiChat.state.loadingAgents')}
					keyValue="id"
					keyLabel="name"
					size="sm"
					popupPos="top"
					compValue={AgentValue}
					compOption={AgentOption}
					className={primary ? 'max-w-lg-7' : 'max-w-lg-5'}
					subtle
					onChange={(id: number) => setAgentId(id)}
					onSearch={onSearchAgent}
					onScrollEnd={fetchMoreAgents}
				/>

				<IconButton
					tooltip={t('aiChat.action.configureAgent')}
					loading={agentLoading === 'full'}
					size="sm"
					className="text-color-text-subtle"
					onClick={() => setShowsAgentModal(true)}
				>
					<BuildSvg className="w-xs-5" />
				</IconButton>
			</div>

			{/* AGENT MODAL */}
			<AgentEditModal
				agent={agentToEdit}
				opened={showsAgentModal}
				onSubmit={onSubmitAgent}
				onClose={() => setShowsAgentModal(false)}
			/>

			{/* TEXT FIELD */}
			{children}
		</div>
	)
}
