import { ButtonVariant, IconButton, SendSvg, TextField, TextFieldRef } from '@ds/release'
import { withRef } from '@utils/src/various/react'
import { ChangeEvent, KeyboardEvent, Ref } from 'react'

interface Props {
	value: string
	valueText: string
	variant: ButtonVariant

	submit(): void
	onChange?(value: string, event: ChangeEvent): void
	onSubmit?(event: KeyboardEvent): void
}

export const InputField = withRef('InputField', (props: Props, ref: Ref<TextFieldRef>) => {
	return (
		<TextField
			ref={ref}
			id="new-chat-question"
			size="lg"
			value={props.value}
			placeholder="Ask a question..."
			ariaLabel="New message"
			slotRight={
				<IconButton
					tooltip="Send message"
					variant="solid-secondary"
					disabled={!props.valueText}
					size="sm"
					onClick={props.submit}
				>
					<SendSvg className="h-xs-7" />
				</IconButton>
			}
			maxLength={1000}
			maxRows={10}
			multiline
			onChange={props.onChange}
			onSubmit={props.onSubmit}
		/>
	)
})
