import { AgentEditModal } from '@app/biz-modules/ai-chat/components/agent-edit-modal'
import { AppLayout } from '@app/layouts/app-layout'
import { LoadingText, PageHeader } from '@app/library/release'
import { Button } from '@ds/release'
import { useMemo, useState } from 'react'
import { Agent, GPT } from '../../api'
import { AgentConfigItem } from '../../components/items/agent-config-item'
import { useAiChatAgents } from '../../state'

const AgentsPage = () => {
	const { gpts, agents, agentsPagination, agentsLoading, canLoadAgents, loadMoreAgents } = useAiChatAgents()
	const [agentToEdit, setAgentToEdit] = useState<Agent | null>(null)
	const [showsEdit, setShowsEdit] = useState(false)

	const getGPT = (agent: Agent) => gpts.find((gpt: GPT) => gpt.id === agent.gptId)

	const onClickEdit = (agent: Agent) => {
		setAgentToEdit(agent)
		setShowsEdit(true)
	}

	const onSubmitEdit = () => {}

	const slotAgents = useMemo(
		() => (
			<ul className="mt-xs-5 flex flex-col gap-xs-4">
				{agents.map((agent: Agent) => {
					const gpt = getGPT(agent)
					if (!gpt) return null

					return <AgentConfigItem key={agent.id} agent={agent} gpt={gpt} onClickEdit={() => onClickEdit(agent)} />
				})}
			</ul>
		),
		[agents, gpts]
	)

	return (
		<AppLayout blank>
			<PageHeader
				breadcrumb={{ href: '/settings', title: t('core.label.settings') }}
				slotTitle={
					<>
						{t('aiChat.label.agents')}
						{agentsPagination.count > 0 && (
							<span className="ml-xs-4 mt-xs-1 text-size-md font-weight-md text-color-text-subtle lg:text-size-lg">
								({agentsPagination.count})
							</span>
						)}
					</>
				}
			/>

			{agentsLoading !== 'full' && agents.length > 0 && slotAgents}

			{Boolean(agentsLoading || canLoadAgents) && (
				<div className="mx-auto mt-sm-2">
					{agentsLoading ? (
						<div className="flex-center h-button-h-md text-size-sm">
							<LoadingText text={t('aiChat.state.loadingAgents')} />
						</div>
					) : (
						Boolean(canLoadAgents) && (
							<Button variant="text-default" onClick={() => loadMoreAgents()}>
								{t('aiChat.action.showMoreAgents')}
							</Button>
						)
					)}
				</div>
			)}

			{/* EDIT MODAL */}
			<AgentEditModal
				agent={agentToEdit}
				opened={showsEdit}
				onClose={() => setShowsEdit(false)}
				onClosed={() => setAgentToEdit(null)}
				onSubmit={onSubmitEdit}
			/>
		</AppLayout>
	)
}

export default AgentsPage
