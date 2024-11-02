import { useAiChatAgents } from '@app/biz-modules/ai-chat/state'
import { ErrorSummary, FieldError, FieldLabel } from '@app/library/release'
import { Button, Modal, TextField } from '@ds/release'
import { useEffect, useState } from 'react'
import { Agent, GPT } from '../api'

interface Props {
	agent: Agent | null
	opened: boolean
	onClose(): void
	onClosed(): void
}

const AGENT_EMPTY: Agent = { id: 0, gptId: 0, name: '', avatar: '', desc: '', setup: '' }

export const AgentEditModal = ({ agent, opened, onClose, onClosed }: Props) => {
	const { gpts, updateAgent } = useAiChatAgents()
	const [payload, setPayload] = useState<Agent>(agent || AGENT_EMPTY)
	const [feedback, setFeedback] = useState<FormPayload<Agent>>(AGENT_EMPTY)

	const gpt = gpts.find((gpt: GPT) => gpt.id === agent?.gptId)

	const hasErrors = (errors: object) => Object.values(errors).some((value: string) => value)

	const onSubmit = async () => {
		const validation = {
			name: !payload.name.trim() ? t('aiChat.error.agentName') : '',
			avatar: !payload.avatar.trim() ? t('aiChat.error.agentAvatar') : '',
		}
		setFeedback(validation)

		if (!hasErrors(validation)) {
			const success = await updateAgent({
				agentId: payload.id,
				gptId: payload.gptId,
				name: payload.name,
				avatar: payload.avatar,
				desc: payload.desc,
				setup: payload.setup,
			})
			success && onClose()
		}
	}

	useEffect(() => {
		agent && setPayload(agent)
		setFeedback(AGENT_EMPTY)
	}, [agent])

	return agent && gpt ? (
		<Modal
			opened={opened}
			width="lg"
			slotTitle={t('aiChat.action.editAgent')}
			slotButtons={
				<Button variant="solid-primary" loading={agent.loading} onClick={onSubmit}>
					{t('core.action.saveChanges')}
				</Button>
			}
			onClose={onClose}
			onClosed={onClosed}
		>
			{/* ERRORS */}
			{hasErrors(feedback) && <ErrorSummary errors={feedback} />}

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
							<img src={payload.avatar} alt="" className="h-sm-8 w-sm-8 rounded-full" />
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
