import { IconButton, SendSvg, TextField, TextFieldRef } from '@ds/release'
import { useCallback, useRef } from 'react'
import { Agent, GPT } from '../api'
import { useSubmittable } from '../hooks/use-submittable'

interface Props {
	agent: Agent
	gpt: GPT
	listLoading: ListLoading
	isChatView?: boolean
	onPostMessage(text: string, agentId: number): void
}

export const NewMessageField = (props: Props) => {
	const { agent, gpt, listLoading, isChatView, onPostMessage } = props
	const textFieldRef = useRef<TextFieldRef>(null)

	const isLoading = listLoading === 'update'
	const isDisabled = listLoading === 'full' || listLoading === 'more' || listLoading === 'error'

	const onSubmit = useCallback(() => {
		if (isDisabled || !gpt.enabled || listLoading) return

		const message = textFieldRef.current?.getValue().trim()
		if (message) {
			onPostMessage(message, agent.id)
			textFieldRef.current?.setValue('')
			textFieldRef.current?.focus()
		}
	}, [agent.id, listLoading])

	const onPressEnter = useSubmittable(onSubmit, [agent.id, listLoading])

	const onFocus = (event: ReactFocusEvent) => {
		// On mobile, the field is covered by the floating keyboard
		const target = event.target as HTMLElement
		// Wait for floating keyboard to appear
		wait(500).then(() => target.scrollIntoView({ behavior: 'smooth', block: 'center' }))
	}

	return (
		<TextField
			ref={textFieldRef}
			id={isChatView ? 'new-message-chat' : 'new-message-subchat'}
			variant={isChatView ? 'primary' : 'secondary'}
			size={isChatView ? 'xl' : 'lg'}
			placeholder={t('aiChat.placeholder.newMessage', { name: agent.name })}
			ariaLabel={t('aiChat.label.newMessage')}
			suffix={
				<IconButton
					tooltip={t('aiChat.action.sendMessage')}
					variant={isChatView ? 'solid-primary' : 'solid-secondary'}
					size={isChatView ? 'md' : 'sm'}
					loading={isLoading}
					disabled={!gpt.enabled || listLoading === 'error'}
					className="self-end"
					onClick={onSubmit}
				>
					<SendSvg className={isChatView ? 'h-xs-9' : 'h-xs-7'} />
				</IconButton>
			}
			maxLength={10000}
			maxRows={10}
			disabled={isDisabled}
			invalid={!gpt.enabled}
			className="w-full"
			multiline
			onSubmit={onPressEnter}
			onFocus={onFocus}
		/>
	)
}
