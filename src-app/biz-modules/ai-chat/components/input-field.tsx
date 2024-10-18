import { IconButton, SendSvg, TextField, TextFieldRef, useUiViewport } from '@ds/release'
import { useCallback, useRef, useState } from 'react'

interface Props extends ReactProps {
	primary?: boolean
	loading?: boolean
	chatLoading?: ListLoading
	disabled?: boolean
	postMessageFn: Function
}

export const InputField = (props: Props) => {
	const { isViewportMaxLG } = useUiViewport()
	const [input, setInput] = useState<string>('')
	const inputRef = useRef<TextFieldRef>(null)

	const inputText = input.trim()

	const onChange = (value: string) => setInput(value)

	const onPressEnter = useCallback(
		(event: ReactKeyboardEvent) => {
			if (isViewportMaxLG) return // Disable submit when pressing Enter on mobile
			if (event.shiftKey) return // Allow new lines only with Shift+Enter on desktop

			event.preventDefault()
			onSubmit()
		},
		[inputText, props.chatLoading]
	)

	const onSubmit = useCallback(() => {
		if (props.chatLoading || !inputText) return

		props.postMessageFn(inputText)
		setInput('')
		inputRef.current?.focus()
	}, [inputText, props.chatLoading])

	const onFocus = (event: ReactFocusEvent) => {
		// On mobile, the field is covered by the floating keyboard
		const target = event.target as HTMLElement
		// Wait for floating keyboard to appear
		wait(500).then(() => target.scrollIntoView({ behavior: 'smooth', block: 'center' }))
	}

	return (
		<TextField
			ref={inputRef}
			id={props.primary ? 'input-chat' : 'input-subchat'}
			size={props.primary ? 'xl' : 'lg'}
			value={input}
			placeholder={t('aiChat.inputPlaceholder')}
			ariaLabel="New message"
			slotRight={
				<IconButton
					tooltip={t('aiChat.sendMessage')}
					variant={props.primary ? 'solid-primary' : 'solid-secondary'}
					size={props.primary ? 'md' : 'sm'}
					loading={props.loading}
					disabled={props.disabled || (!props.loading && !inputText)}
					onClick={onSubmit}
				>
					<SendSvg className={props.primary ? 'h-xs-9' : 'h-xs-7'} />
				</IconButton>
			}
			maxLength={1000}
			maxRows={10}
			disabled={props.disabled}
			className={props.className}
			multiline
			onChange={onChange}
			onSubmit={onPressEnter}
			onFocus={onFocus}
		/>
	)
}
