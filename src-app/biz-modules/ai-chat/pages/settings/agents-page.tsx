import { AgentEditModal } from '@app/biz-modules/ai-chat/components/agent-edit-modal'
import { AppLayout } from '@app/layouts/app-layout'
import { LoadingText, PageHeader } from '@app/library/release'
import { Button, Modal, WarningSvg } from '@ds/release'
import { useEffect, useMemo, useState } from 'react'
import { Agent } from '../../api'
import { AgentConfigItem } from '../../components/items/agent-config-item'
import { EMPTY_AGENT, useAiChatAgents } from '../../state'

const AgentsPage = () => {
	const {
		agents,
		agentsLoading,
		agentsPagination,
		canLoadAgents,
		gpts,
		gptsLoading,
		deleteAgent,
		loadMoreAgents,
	} = useAiChatAgents()
	const [agentToEdit, setAgentToEdit] = useState<Agent | null>(null)
	const [showsEditModal, setShowsEditModal] = useState(false)
	const [showsDeleteModal, setShowsDeleteModal] = useState(false)

	const onClickEdit = (agent?: Agent) => {
		setAgentToEdit(agent || EMPTY_AGENT)
		setShowsEditModal(true)
	}

	const onConfirmDelete = () => {
		if (!agentToEdit) return

		deleteAgent(agentToEdit.id)
		setShowsDeleteModal(false)
		setShowsEditModal(false)
	}

	useEffect(() => {
		// Update object when creating new agent
		if (agentToEdit && !agentToEdit.id) {
			setAgentToEdit(agents.find((agent: Agent) => agent.id === agentToEdit.id) || null)
		}
	}, [agents])

	const slotAgents = useMemo(
		() => (
			<ul className="mt-xs-5 flex flex-col gap-xs-4">
				{agents.map((agent: Agent) => (
					<AgentConfigItem key={agent.id} agent={agent} onClickEdit={() => onClickEdit(agent)} />
				))}
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

			{/* LISTING */}
			{agentsLoading !== 'full' && agents.length > 0 && (
				<>
					{/* TOOLBAR */}
					<div className="mb-xs-3 flex items-center border-b border-color-border-subtle pb-xs-5 sm:-mt-xs-9">
						<Button
							loading={Boolean(gptsLoading)}
							variant="solid-primary"
							size="sm"
							className="ml-auto"
							onClick={() => onClickEdit()}
						>
							{t('aiChat.label.newAgent')}
						</Button>
					</div>

					{slotAgents}
				</>
			)}

			{/* LOADING */}
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
				opened={showsEditModal}
				onClose={() => setShowsEditModal(false)}
				onClosed={() => setAgentToEdit(null)}
				onDelete={() => setShowsDeleteModal(true)}
			/>

			{/* DELETE MODAL */}
			<Modal
				opened={Boolean(agentToEdit && showsDeleteModal)}
				slotTitle={t('aiChat.action.confirmDeleteAgent')}
				slotAction={
					<Button variant="solid-danger" onClick={onConfirmDelete}>
						{t('core.action.delete')}
					</Button>
				}
				onClose={() => setShowsDeleteModal(false)}
			>
				<div className="mb-xs-8 flex items-center text-color-danger">
					<WarningSvg className="mr-xs-4 w-xs-8" />
					{t('aiChat.warning.deletingAgent')}
				</div>

				{Boolean(agentToEdit) && <AgentConfigItem agent={agentToEdit!} />}
			</Modal>
		</AppLayout>
	)
}

export default AgentsPage
