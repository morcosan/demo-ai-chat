import { ErrorSummary, FieldError, FieldLabel, SelectField, SelectOptionProps } from '@app/library/release'
import { Button, Modal, TextField } from '@ds/release'
import { useEffect, useState } from 'react'
import { Agent, GPT } from '../api'
import { AGENT_EMPTY, useAiChatAgents } from '../state'
import { OptionItem } from './items/option-item'

interface Props {
	agent: Agent | null
	opened: boolean
	onClose(): void
	onClosed(): void
}

const GptValue = (props: SelectOptionProps) => <OptionItem gpt={props.option as GPT} compact />
const GptOption = (props: SelectOptionProps) => <OptionItem gpt={props.option as GPT} selected={props.selected} />

export const AgentEditModal = ({ agent, opened, onClose, onClosed }: Props) => {
	const { gpts, updateAgent } = useAiChatAgents()
	const [initial, setInitial] = useState<Agent>(agent || AGENT_EMPTY)
	const [payload, setPayload] = useState<Agent>(agent || AGENT_EMPTY)
	const [feedback, setFeedback] = useState<FormPayload<Agent>>(AGENT_EMPTY)

	const hasChanges =
		initial.gptId !== payload.gptId ||
		initial.name !== payload.name.trim() ||
		initial.avatar !== payload.avatar.trim() ||
		initial.desc !== payload.desc.trim() ||
		initial.setup !== payload.setup.trim()

	const hasErrors = (errors: object) => Object.values(errors).some((value: string) => value)

	const onSubmit = async () => {
		// Fake success
		if (!hasChanges && agent?.id) {
			onClose()
			return
		}

		const validation = {
			name: !payload.name.trim() ? t('aiChat.error.agentName') : '',
			avatar: !payload.avatar.trim() ? t('aiChat.error.agentAvatar') : '',
		}
		setFeedback(validation)

		if (!hasErrors(validation)) {
			const success = await updateAgent({
				agentId: payload.id,
				gptId: payload.gptId,
				name: payload.name.trim(),
				avatar: payload.avatar.trim(),
				desc: payload.desc.trim(),
				setup: payload.setup.trim(),
			})
			success && onClose()
		}
	}

	useEffect(() => {
		if (agent) {
			const initial = {
				...agent,
				gptId: agent.gptId || gpts[0].id,
				avatar: agent.id ? agent.avatar : gpts[0].avatar,
			}
			setInitial(initial)
			setPayload(initial)
		}

		setFeedback(AGENT_EMPTY)
	}, [agent])

	return agent ? (
		<Modal
			opened={opened}
			width="lg"
			persistent={hasChanges}
			slotTitle={agent.id ? t('aiChat.action.editAgent') : t('aiChat.label.newAgent')}
			slotButtons={
				<Button
					variant="solid-primary"
					loading={agent.loading}
					tooltip={hasChanges ? '' : t('core.description.noChanges')}
					onClick={onSubmit}
				>
					{agent.id ? t('core.action.saveChanges') : t('aiChat.action.createAgent')}
				</Button>
			}
			onClose={onClose}
			onClosed={onClosed}
		>
			{/* ERRORS */}
			{hasErrors(feedback) && <ErrorSummary errors={feedback} className="mb-sm-1" />}

			{/* BODY */}
			<div className="flex flex-col gap-y-sm-3 lg:flex-row">
				{/* LEFT */}
				<div className="flex min-w-xl-0 flex-1 flex-col gap-sm-3">
					{/* NAME */}
					<div className="flex flex-col">
						<FieldLabel fieldId="field-name">{t('core.label.name')}</FieldLabel>
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

					{/* AVATAR */}
					<div className="flex">
						<div className="flex flex-1 flex-col">
							<FieldLabel fieldId="field-avatar">{t('core.label.avatar')}</FieldLabel>
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

					{/* DESCRIPTION */}
					<div className="flex flex-col">
						<FieldLabel fieldId="field-desc" optional>
							{t('core.label.description')}
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

				{/* DELIMITER */}
				<div className="mx-sm-1 hidden w-px self-stretch bg-color-border-subtle lg:block" />

				{/* RIGHT */}
				<div className="flex min-w-xl-0 flex-1 flex-col gap-sm-2">
					{/* GPT */}
					<div className="flex flex-col">
						<FieldLabel fieldId="field-gpt">{t('aiChat.label.gptModel')}</FieldLabel>
						<SelectField
							id="field-gpt"
							value={payload.gptId}
							options={gpts}
							keyLabel="name"
							keyValue="id"
							disabled={agent.loading}
							compValue={GptValue}
							compOption={GptOption}
							onChange={(gptId: number) => setPayload({ ...payload, gptId })}
						/>
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
