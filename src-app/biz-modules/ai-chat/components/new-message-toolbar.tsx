import { LoadingText, SelectField, SelectOptionProps } from '@app/library/release'
import { BuildSvg, IconButton } from '@ds/release'
import { debounce, uniqBy } from 'lodash'
import { useEffect, useState } from 'react'
import { Agent, API } from '../api'
import { AgentEditModal } from '../components/agent-edit-modal'
import { OptionItem } from '../components/items/option-item'
import { EMPTY_AGENT } from '../state'

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

	const callFetchAgents = debounce(fetchMoreAgents, 300)

	const onSearchAgent = (search: string) => {
		setSearch(search)
		callFetchAgents()
	}

	useEffect(() => {
		fetchMoreAgents()
	}, [])

	return (
		<div>
			{/* TOOLBAR */}
			<div className="mb-xs-1">
				<SelectField
					id={primary ? 'agent-chat' : 'agent-subchat'}
					value={agentId}
					options={agents}
					loading={Boolean(agentLoading)}
					keyValue="id"
					keyLabel="name"
					size="sm"
					popupPos="top"
					compValue={AgentValue}
					compOption={AgentOption}
					className={primary ? 'max-w-lg-7' : 'max-w-lg-5'}
					slotLoadingMore={
						Boolean(canLoadMoreAgents) && (
							<LoadingText
								text={t('aiChat.state.loadingAgents')}
								className="relative -top-xs-2 ml-xs-3 min-h-sm-4 px-button-px-item text-size-sm"
								style={{ visibility: agentLoading === 'more' ? 'visible' : 'hidden' }}
							/>
						)
					}
					subtle
					onChange={(id: number) => setAgentId(id)}
					onSearch={onSearchAgent}
					onScrollEnd={fetchMoreAgents}
				/>

				<IconButton
					tooltip={t('aiChat.action.configureAgent')}
					loading={agentLoading === 'full'}
					size="sm"
					className="-ml-xs-1 text-color-text-subtle"
					onClick={() => setShowsAgentModal(true)}
				>
					<BuildSvg className="w-xs-5" />
				</IconButton>
			</div>

			{/* AGENT MODAL */}
			<AgentEditModal agent={agentToEdit} opened={showsAgentModal} onClose={() => setShowsAgentModal(false)} />

			{/* TEXT FIELD */}
			{children}
		</div>
	)
}
