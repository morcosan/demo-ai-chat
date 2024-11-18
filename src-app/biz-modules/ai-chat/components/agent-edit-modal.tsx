import { ErrorSummary, FieldLabel, SelectField, SelectOption, SelectOptionProps } from '@app/library/release'
import { Button, DeleteSvg, Modal } from '@ds/release'
import { useEffect, useState } from 'react'
import { Agent, CreativityLevel, GPT } from '../api'
import { EMPTY_AGENT, useAiChatAgents } from '../state'
import { AgentEditField, Field } from './agent-edit-field'
import { GptWarning } from './gpt-warning'
import { AgentGptItem } from './items/agent-gpt-item'

interface Props {
	id: string
	agent: Agent | null
	opened: boolean
	onSubmit(payload: Agent): Promise<void>
	onClose(): void
	onClosed?(): void
	onDelete?(): void
}

const GptValue = (props: SelectOptionProps) => <AgentGptItem gpt={props.option as GPT} compact />
const GptOption = (props: SelectOptionProps) => (
	<AgentGptItem gpt={props.option as GPT} selected={props.selected} />
)

export const AgentEditModal = (props: Props) => {
	const { allGPTs, allAgents } = useAiChatAgents()
	const [initial, setInitial] = useState<Agent>(props.agent || EMPTY_AGENT)
	const [payload, setPayload] = useState<Agent>(props.agent || EMPTY_AGENT)
	const [feedback, setFeedback] = useState<FormPayload<Agent>>(EMPTY_AGENT)

	const creativityOptions: SelectOption<CreativityLevel>[] = [
		{ value: 'min', label: t('core.label.levelVeryLow') },
		{ value: 'low', label: t('core.label.levelLow') },
		{ value: 'mid', label: t('core.label.levelMedium') },
		{ value: 'high', label: t('core.label.levelHigh') },
		{ value: 'max', label: t('core.label.levelVeryHigh') },
	]

	const isEditing = Boolean(props.agent?.id)
	const canDelete = Boolean(
		props.onDelete && isEditing && allAgents.filter((agent: Agent) => agent.id && !agent.deleting).length > 1
	)

	const isGptEnabled = allGPTs.find((gpt: GPT) => gpt.id === payload.gptId)?.enabled

	const sectionClass = cx('flex flex-1 flex-col gap-y-sm-2')
	const delimiterClass = cx('mx-sm-1 hidden w-px self-stretch bg-color-border-subtle lg:block')

	const fieldMap = {
		name: { id: `${props.id}-field-name`, label: t('core.label.name') },
		avatar: { id: `${props.id}-field-avatar`, label: t('core.label.avatar') },
		gptId: { id: `${props.id}-field-gpt`, label: t('aiChat.label.gptModel') },
		creativity: { id: `${props.id}-field-creativity`, label: t('aiChat.label.creativityLevel') },
		desc: {
			id: `${props.id}-field-desc`,
			label: t('core.label.description'),
			optional: true,
			props: { minRows: 3, multiline: true },
		},
		prompt: {
			id: `${props.id}-field-prompt`,
			label: t('aiChat.label.customInstructions'),
			optional: true,
			props: { minRows: 6, multiline: true, className: 'flex-1' },
		},
	} satisfies Partial<Record<keyof Agent, Field>>

	const hasChanges =
		initial.gptId !== payload.gptId ||
		initial.name !== payload.name.trim() ||
		initial.avatar !== payload.avatar.trim() ||
		initial.desc !== payload.desc.trim() ||
		initial.prompt !== payload.prompt.trim() ||
		initial.creativity !== payload.creativity

	const hasErrors = (errors: object) => Object.values(errors).some((value: string) => value)

	const onSubmit = async () => {
		// Fake success
		if (!hasChanges && isEditing) {
			props.onClose()
			return
		}

		const validation = {
			name: !payload.name.trim() ? t('aiChat.error.agentName') : '',
			avatar: !payload.avatar.trim() ? t('aiChat.error.agentAvatar') : '',
		}
		setFeedback(validation)

		if (!hasErrors(validation)) {
			props.onSubmit(payload)
		}
	}

	useEffect(() => {
		if (props.agent && allGPTs.length) {
			const initial: Agent = {
				...props.agent,
				gptId: props.agent.gptId || allGPTs[0].id,
				avatar: props.agent.avatar || allGPTs[0].avatar,
				creativity: props.agent.creativity || 'medium',
			}
			setInitial(initial)
			setPayload(initial)
		}

		setFeedback(EMPTY_AGENT)
	}, [props.agent, props.opened, allGPTs])

	return props.agent ? (
		<Modal
			opened={props.opened}
			width="lg"
			persistent={hasChanges || props.agent.updating}
			noClose={props.agent.updating}
			slotTitle={isEditing ? t('aiChat.action.configureAgent') : t('aiChat.label.newAgent')}
			slotAction={
				<Button
					variant="solid-primary"
					loading={props.agent.updating}
					tooltip={hasChanges ? '' : t('core.error.noChanges')}
					onClick={onSubmit}
				>
					{isEditing ? t('core.action.saveChanges') : t('aiChat.action.createAgent')}
				</Button>
			}
			slotExtra={
				canDelete && !props.agent.updating ? (
					<Button variant="text-danger" loading={props.agent.updating} onClick={props.onDelete}>
						<DeleteSvg className="mr-xs-4 w-xs-5" /> {t('aiChat.action.deleteAgent')}
					</Button>
				) : null
			}
			onClose={props.onClose}
			onClosed={props.onClosed}
		>
			{/* ERRORS */}
			{hasErrors(feedback) && <ErrorSummary errors={feedback} className="mb-sm-1" />}

			{/* BODY */}
			<div className={sectionClass}>
				<div className={cx(sectionClass, 'lg:flex-row')}>
					{/* LEFT */}
					<div className={sectionClass}>
						{/* NAME */}
						<AgentEditField
							field={fieldMap.name}
							value={payload.name}
							error={feedback.name}
							disabled={props.agent.updating}
							onChange={(name: string) => setPayload({ ...payload, name })}
						/>

						{/* AVATAR */}
						<div className="flex">
							<AgentEditField
								field={fieldMap.avatar}
								value={payload.avatar}
								error={feedback.avatar}
								disabled={props.agent.updating}
								className="flex-1"
								onChange={(avatar: string) => setPayload({ ...payload, avatar })}
							/>
							<div className="ml-xs-6 mt-xs-6">
								<img src={payload.avatar} alt="" className="h-sm-8 w-sm-8 rounded-full" />
							</div>
						</div>

						{/* DESCRIPTION */}
						<AgentEditField
							field={fieldMap.desc}
							value={payload.desc}
							error={feedback.desc}
							disabled={props.agent.updating}
							onChange={(desc: string) => setPayload({ ...payload, desc })}
						/>
					</div>

					<div className={delimiterClass} />

					{/* RIGHT */}
					<div className={sectionClass}>
						{/* GPT */}
						<div className="flex flex-col">
							<FieldLabel fieldId={fieldMap.gptId.id}>{fieldMap.gptId.label}</FieldLabel>
							<SelectField
								id={fieldMap.gptId.id}
								variant="primary"
								value={payload.gptId}
								options={allGPTs}
								keyLabel="name"
								keyValue="id"
								disabled={props.agent.updating}
								compValue={GptValue}
								compOption={GptOption}
								onChange={(gptId: number) => setPayload({ ...payload, gptId })}
							/>
						</div>

						{!isGptEnabled && <GptWarning className="-mt-xs-5" />}

						{/* CREATIVITY */}
						<div className="flex flex-col">
							<FieldLabel fieldId={fieldMap.creativity.id}>{fieldMap.creativity.label}</FieldLabel>
							<SelectField
								id={fieldMap.creativity.id}
								variant="primary"
								value={payload.creativity}
								options={creativityOptions}
								disabled={props.agent.updating}
								onChange={(creativity: CreativityLevel) => setPayload({ ...payload, creativity })}
							/>
						</div>
					</div>
				</div>

				{/* PROMPT */}
				<AgentEditField
					field={fieldMap.prompt}
					value={payload.prompt}
					error={feedback.prompt}
					disabled={props.agent.updating}
					className="flex-1"
					onChange={(prompt: string) => setPayload({ ...payload, prompt })}
				/>
			</div>
		</Modal>
	) : null
}
