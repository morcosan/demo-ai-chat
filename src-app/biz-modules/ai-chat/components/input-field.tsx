import { IconButton, SendSvg, TextField, TextFieldRef } from '@ds/release'
import { withRef } from '@utils/release'
import { KeyboardEvent, Ref } from 'react'

interface Props {
	input: string
	inputText: string
	primary?: boolean

	onChange(value: string): void
	onPressEnter(event: KeyboardEvent): void
	onSubmit(): void
}

export const InputField = withRef('InputField', (props: Props, ref: Ref<TextFieldRef>) => {
	return (
		<TextField
			ref={ref}
			id={props.primary ? 'input-chat' : 'input-subchat'}
			size={props.primary ? 'xl' : 'lg'}
			value={props.input}
			placeholder="Ask a question..."
			ariaLabel="New message"
			slotRight={
				<IconButton
					tooltip="Send message"
					variant={props.primary ? 'solid-primary' : 'solid-secondary'}
					size={props.primary ? 'md' : 'sm'}
					disabled={!props.inputText}
					onClick={props.onSubmit}
				>
					<SendSvg className={props.primary ? 'h-xs-9' : 'h-xs-7'} />
				</IconButton>
			}
			maxLength={1000}
			maxRows={10}
			multiline
			onChange={props.onChange}
			onSubmit={props.onPressEnter}
		/>
	)
})
