import { useAiChatAgents } from '@app/biz-modules/ai-chat/state'
import { Button, Modal } from '@ds/release'
import { useState } from 'react'
import { Agent, GPT } from '../api'

interface Props {
	agent: Agent | null
	opened: boolean
	onClose(): void
	onClosed(): void
	onSubmit(): void
}

const EMPTY_AGENT: Agent = { id: 0, gptId: 0, name: '', avatar: '', desc: '', setup: '' }

export const AgentEditModal = ({ agent, opened, onClose, onClosed, onSubmit }: Props) => {
	const { gpts } = useAiChatAgents()
	const [payload, setPayload] = useState<Agent>(agent || EMPTY_AGENT)

	const gpt = gpts.find((gpt: GPT) => gpt.id === agent?.gptId)

	return agent && gpt ? (
		<Modal
			opened={opened}
			slotTitle={t('aiChat.action.editAgent')}
			slotButtons={
				<Button variant="solid-primary" onClick={onSubmit}>
					{t('core.action.saveChanges')}
				</Button>
			}
			onClose={onClose}
			onClosed={onClosed}
		>
			{gpt.name}
			<br />
			<br />
			{agent.name}
			<br />
			<br />
			{agent.desc}
		</Modal>
	) : null
}
