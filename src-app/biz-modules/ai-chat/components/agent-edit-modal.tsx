import { useAiChatAgents } from '@app/biz-modules/ai-chat/state'
import { FieldError, FieldLabel } from '@app/library/release'
import { Button, Modal, TextField } from '@ds/release'
import { useEffect, useState } from 'react'
import { Agent, GPT } from '../api'

interface Props {
	agent: Agent | null
	opened: boolean
	onClose(): void
	onClosed(): void
	onSubmit(): void
}

const AGENT_EMPTY: Agent = { id: 0, gptId: 0, name: '', avatar: '', desc: '', setup: '' }

export const AgentEditModal = ({ agent, opened, onClose, onClosed, onSubmit }: Props) => {
	const { gpts } = useAiChatAgents()
	const [payload, setPayload] = useState<FormPayload<Agent>>(agent || AGENT_EMPTY)
	const [feedback, setFeedback] = useState<FormPayload<Agent>>(AGENT_EMPTY)

	const gpt = gpts.find((gpt: GPT) => gpt.id === agent?.gptId)

	useEffect(() => {
		agent && setPayload(agent)
	}, [agent])

	return agent && gpt ? (
		<Modal
			opened={opened}
			width="lg"
			slotTitle={t('aiChat.action.editAgent')}
			slotButtons={
				<Button variant="solid-primary" onClick={onSubmit}>
					{t('core.action.saveChanges')}
				</Button>
			}
			onClose={onClose}
			onClosed={onClosed}
		>
			<div className="flex flex-wrap gap-x-sm-4 gap-y-sm-3">
				{/* LEFT */}
				<div className="flex min-w-xl-0 flex-1 flex-col gap-sm-3">
					{/* AVATAR */}
					<div className="flex">
						<div className="flex flex-1 flex-col">
							<FieldLabel fieldId="field-avatar">{t('aiChat.label.agentAvatar')}</FieldLabel>
							<TextField
								id="field-avatar"
								value={payload.avatar}
								ariaDescription={feedback.avatar ? `${t('core.label.errors')}: ${feedback.avatar}` : ''}
								disabled={agent.loading}
								invalid={Boolean(feedback.avatar)}
								onChange={(avatar: string) => setPayload({ ...payload, avatar })}
							/>
							<FieldError error={feedback.avatar} />
						</div>

						<div className="ml-xs-6 mt-xs-6">
							<img src={payload.avatar} alt="" className="h-sm-8 w-sm-8 rounded-full bg-color-bg-field" />
						</div>
					</div>

					{/* NAME */}
					<div className="flex flex-col">
						<FieldLabel fieldId="field-name">{t('aiChat.label.agentName')}</FieldLabel>
						<TextField
							id="field-name"
							value={payload.name}
							ariaDescription={feedback.name ? `${t('core.label.errors')}: ${feedback.name}` : ''}
							disabled={agent.loading}
							invalid={Boolean(feedback.name)}
							onChange={(name: string) => setPayload({ ...payload, name })}
						/>
						<FieldError error={feedback.name} />
					</div>

					{/* DESCRIPTION */}
					<div className="flex flex-col">
						<FieldLabel fieldId="field-desc" optional>
							{t('aiChat.label.agentDescription')}
						</FieldLabel>
						<TextField
							id="field-desc"
							value={payload.desc}
							ariaDescription={feedback.desc ? `${t('core.label.errors')}: ${feedback.desc}` : ''}
							disabled={agent.loading}
							invalid={Boolean(feedback.desc)}
							minRows={3}
							multiline
							onChange={(desc: string) => setPayload({ ...payload, desc })}
						/>
						<FieldError error={feedback.desc} />
					</div>
				</div>

				{/* RIGHT */}
				<div className="flex min-w-xl-0 flex-1 flex-col gap-sm-2">
					{/* GPT */}
					<div className="flex flex-col">
						<FieldLabel fieldId="field-gpt">{t('aiChat.label.agentGptModel')}</FieldLabel>
						<TextField
							id="field-gpt"
							value={payload.name}
							ariaDescription={feedback.name ? `${t('core.label.errors')}: ${feedback.name}` : ''}
							disabled={agent.loading}
							invalid={Boolean(feedback.name)}
							onChange={(name: string) => setPayload({ ...payload, name })}
						/>
						<FieldError error={feedback.name} />
					</div>

					{/* SETUP */}
					<div className="flex flex-1 flex-col">
						<FieldLabel fieldId="field-setup" optional>
							{t('aiChat.label.customInstructions')}
						</FieldLabel>
						<TextField
							id="field-setup"
							value={payload.setup}
							ariaDescription={feedback.setup ? `${t('core.label.errors')}: ${feedback.setup}` : ''}
							disabled={agent.loading}
							invalid={Boolean(feedback.setup)}
							className="flex-1"
							multiline
							onChange={(setup: string) => setPayload({ ...payload, setup })}
						/>
						<FieldError error={feedback.setup} />
					</div>
				</div>
			</div>
		</Modal>
	) : null
}
