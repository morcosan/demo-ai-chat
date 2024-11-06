import { SelectField, SelectOptionProps } from '@app/library/release'
import { BuildSvg, IconButton } from '@ds/release'
import { useEffect, useState } from 'react'
import { Agent } from '../api'
import { AgentEditModal } from '../components/agent-edit-modal'
import { OptionItem } from '../components/items/option-item'
import { EMPTY_AGENT, useAiChatAgents } from '../state'

interface Props extends ReactProps {
	primary?: boolean
}

const AgentValue = (props: SelectOptionProps) => <OptionItem agent={props.option as Agent} compact subtle />
const AgentOption = (props: SelectOptionProps) => (
	<OptionItem agent={props.option as Agent} selected={props.selected} />
)

export const NewMessageToolbar = ({ primary, children }: Props) => {
	const { agents, agentsLoading } = useAiChatAgents()
	const [agentId, setAgentId] = useState(0)
	const [showsAgentModal, setShowsAgentModal] = useState(false)

	const agentToEdit = agents.find((agent: Agent) => agent.id === agentId) || EMPTY_AGENT

	useEffect(() => {
		if (!agentId && agents.length) {
			setAgentId(agents[0].id)
		}
	}, [agentsLoading])

	return (
		<div>
			{/* TOOLBAR */}
			<div className="mb-xs-1">
				<SelectField
					id={primary ? 'agent-chat' : 'agent-subchat'}
					value={agentId}
					options={agents}
					keyValue="id"
					keyLabel="name"
					size="sm"
					popupPos="top"
					compValue={AgentValue}
					compOption={AgentOption}
					className={primary ? 'max-w-lg-7' : 'max-w-lg-5'}
					subtle
					onChange={(id: number) => setAgentId(id)}
				/>

				<IconButton
					tooltip={t('aiChat.action.configureAgent')}
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
