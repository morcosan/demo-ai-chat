import { SelectField, SelectOptionProps } from '@app/library/release'
import { BuildSvg, IconButton, WarningSvg } from '@ds/release'
import { COOKIE_KEY } from '@utils/release'
import { uniqBy } from 'lodash'
import { useEffect, useState } from 'react'
import { Agent, API } from '../api'
import { useRefreshableAgents } from '../hooks/refreshable-agents'
import { EMPTY_AGENT, useAiChatAgents } from '../state'
import { parseGptDescription } from '../utils'
import { aiChatEmitter, EVENT__REFRESH_AGENT } from '../utils/events'
import { AgentEditModal } from './agent-edit-modal'
import { AgentGptItem } from './items/agent-gpt-item'
import { NewMessageField } from './new-message-field'

interface Props extends ReactProps {
	listLoading: ListLoading
	isChatView?: boolean
	onPostMessage(text: string, agentId: number): void
}

const AgentValue = (props: SelectOptionProps) => <AgentGptItem agent={props.option as Agent} compact subtle />
const AgentOption = (props: SelectOptionProps) => (
	<AgentGptItem agent={props.option as Agent} selected={props.selected} />
)

export const NewMessageToolbar = (props: Props) => {
	const { listLoading, isChatView, onPostMessage } = props
	const { allGPTs, chatViewAgentId, setChatViewAgentId } = useAiChatAgents()
	const [currAgentId, setCurrAgentId] = useState(0)
	const [agents, setAgents] = useRefreshableAgents()
	const [agentPagination, setAgentPagination] = useState<Pagination>({ page: 0, count: 0 })
	const [agentLoading, setAgentLoading] = useState<ListLoading>(false)
	const [search, setSearch] = useState('')
	const [showsAgentModal, setShowsAgentModal] = useState(false)

	const agentCookieKey = isChatView ? COOKIE_KEY.APP_AGENT_FOR_CHAT : COOKIE_KEY.APP_AGENT_FOR_SUBCHAT

	const currAgent = agents.find((agent: Agent) => agent.id === currAgentId) || EMPTY_AGENT
	const currGPT = allGPTs.find((gpt) => gpt.id === currAgent.gptId)

	const canLoadMoreAgents = !agentPagination.page || agents.length < agentPagination.count

	const agentFilterFn = (option: object, keyword: string) => {
		const agent = option as Agent
		const name = agent.name.toLowerCase()
		const desc = parseGptDescription(agent.gptId, agent.desc).toLowerCase()

		return !keyword || name.includes(keyword) || desc.includes(keyword)
	}

	const fetchMoreAgents = async (agentId: number = currAgentId) => {
		if (agentLoading || !canLoadMoreAgents) return

		setAgentLoading(agentPagination.page ? 'more' : 'full')

		const listing = await API.getAgents([], agentPagination.page + 1, search)

		let newAgents = uniqBy([...agents, ...listing.agents], (agent: Agent) => agent.id)
		let hasAgentId = Boolean(agentId)

		if (hasAgentId) {
			const includesAgentId = newAgents.some((agent: Agent) => agent.id === agentId)
			if (!includesAgentId) {
				const extraListing = await API.getAgents([agentId])
				if (extraListing.count) {
					newAgents = [...newAgents, ...extraListing.agents]
				} else {
					hasAgentId = false
				}
			}
		}

		if (!hasAgentId) {
			setCurrAgentId(listing.agents[0]?.id || 0)
		}

		setAgents(newAgents)
		setAgentPagination({ page: agentPagination.page + 1, count: listing.count })
		setAgentLoading(false)
	}

	const onChangeAgent = (id: number) => setCurrAgentId(id)

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
			prompt: payload.prompt.trim(),
			creativity: payload.creativity,
		})

		const newAgent = listing.agents[0]
		if (newAgent) {
			agents[index] = newAgent
			setAgents([...agents])
			setShowsAgentModal(false)
			aiChatEmitter.emit(EVENT__REFRESH_AGENT, newAgent)
		}
	}

	const loadAgentId = () => {
		let id = 0
		if (!id || isNaN(id)) id = isChatView ? chatViewAgentId : id
		if (!id || isNaN(id)) id = parseInt(localStorage.getItem(agentCookieKey) as string)
		if (!id || isNaN(id)) return 0

		setCurrAgentId(id)
		return id
	}

	useEffect(() => {
		isChatView && setCurrAgentId(chatViewAgentId)
	}, [chatViewAgentId])

	useEffect(() => {
		if (!currAgentId) return

		localStorage.setItem(agentCookieKey, String(currAgentId))

		isChatView && setChatViewAgentId(currAgentId)
	}, [currAgentId])

	useEffect(() => {
		!agentPagination.page && fetchMoreAgents(loadAgentId())
	}, [agentPagination])

	return currAgent && currGPT ? (
		<div>
			{/* TOOLBAR */}
			<div className="mb-xs-1 flex items-center">
				<SelectField
					id={isChatView ? 'agent-chat' : 'agent-subchat'}
					variant={isChatView ? 'primary' : 'secondary'}
					value={currAgentId}
					options={agents}
					keyValue="id"
					keyLabel="name"
					filterFn={agentFilterFn}
					invalid={!currGPT?.enabled}
					loading={agentLoading === 'full'}
					loadingMore={agentLoading === 'more'}
					canLoadMore={canLoadMoreAgents}
					loadingText={t('aiChat.state.loadingAgents')}
					ariaLabel={t('aiChat.label.selectedAgent')}
					size="sm"
					popupPos="top"
					compValue={AgentValue}
					compOption={AgentOption}
					className={isChatView ? 'max-w-lg-7' : 'max-w-lg-5'}
					subtle
					onChange={onChangeAgent}
					onSearch={onSearchAgent}
					onScrollEnd={fetchMoreAgents}
				/>

				{!currGPT.enabled && (
					<div className="flex items-center text-size-xs text-color-danger-page-text">
						<WarningSvg className="ml-xs-3 mr-xs-1 w-xs-6 min-w-xs-6" />
						{t('aiChat.warning.invalidGpt')}
					</div>
				)}

				<IconButton
					tooltip={t('aiChat.action.configureAgent')}
					loading={agentLoading === 'full'}
					size="sm"
					className="ml-xs-0 text-color-text-subtle"
					onClick={() => setShowsAgentModal(true)}
				>
					<BuildSvg className="w-xs-5" />
				</IconButton>
			</div>

			{/* AGENT MODAL */}
			<AgentEditModal
				id={isChatView ? 'agent-modal-chat' : 'agent-modal-subchat'}
				agent={currAgent}
				opened={showsAgentModal}
				onSubmit={onSubmitAgent}
				onClose={() => setShowsAgentModal(false)}
			/>

			{/* TEXT FIELD */}
			<NewMessageField
				agent={currAgent}
				gpt={currGPT}
				listLoading={listLoading}
				isChatView={isChatView}
				onPostMessage={onPostMessage}
			/>
		</div>
	) : null
}
