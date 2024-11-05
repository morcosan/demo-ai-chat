import { SelectField, SelectOptionProps } from '@app/library/release'
import { IconButton, SendSvg, TextField, TextFieldRef } from '@ds/release'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Agent } from '../api'
import { OptionItem } from '../components/items/option-item'
import { useSubmittable } from '../hooks/submittable'
import { useAiChatAgents } from '../state'

interface Props {
	listLoading: ListLoading
	postMessageFn: Function
	primary?: boolean
}

const AgentValue = (props: SelectOptionProps) => <OptionItem agent={props.option as Agent} compact subtle />
const AgentOption = (props: SelectOptionProps) => (
	<OptionItem agent={props.option as Agent} selected={props.selected} />
)

export const NewMessageField = ({ listLoading, postMessageFn, primary }: Props) => {
	const { agents, agentsLoading } = useAiChatAgents()
	const [inputValue, setInputValue] = useState<string>('')
	const [agentId, setAgentId] = useState(0)
	const inputRef = useRef<TextFieldRef>(null)

	const message = inputValue.trim()
	const isLoading = listLoading === 'update'
	const isDisabled = listLoading === 'full' || listLoading === 'more'

	const onChange = (value: string) => setInputValue(value)

	const onSubmit = useCallback(() => {
		if (listLoading || !message) return

		postMessageFn(message)
		setInputValue('')
		inputRef.current?.focus()
	}, [message, listLoading])

	const onPressEnter = useSubmittable(onSubmit, [message, listLoading])

	const onFocus = (event: ReactFocusEvent) => {
		// On mobile, the field is covered by the floating keyboard
		const target = event.target as HTMLElement
		// Wait for floating keyboard to appear
		wait(500).then(() => target.scrollIntoView({ behavior: 'smooth', block: 'center' }))
	}

	useEffect(() => {
		if (!agentId && agents.length) {
			setAgentId(agents[0].id)
		}
	}, [agentsLoading])

	return (
		<div>
			{/* TOOLBAR */}
			<div className="mb-xs-2">
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
			</div>

			{/* TEXT FIELD */}
			<TextField
				ref={inputRef}
				id={primary ? 'new-message-chat' : 'new-message-subchat'}
				size={primary ? 'xl' : 'lg'}
				value={inputValue}
				placeholder={t('aiChat.placeholder.newMessage')}
				ariaLabel="New message"
				slotRight={
					<IconButton
						tooltip={t('aiChat.action.sendMessage')}
						variant={primary ? 'solid-primary' : 'solid-secondary'}
						size={primary ? 'md' : 'sm'}
						loading={isLoading}
						disabled={isDisabled || (!isLoading && !message)}
						onClick={onSubmit}
					>
						<SendSvg className={primary ? 'h-xs-9' : 'h-xs-7'} />
					</IconButton>
				}
				maxLength={1000}
				maxRows={10}
				disabled={isDisabled}
				className="w-full"
				multiline
				onChange={onChange}
				onSubmit={onPressEnter}
				onFocus={onFocus}
			/>
		</div>
	)
}
