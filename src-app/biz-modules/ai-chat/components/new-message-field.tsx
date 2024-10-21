import { IconButton, SendSvg, TextField, TextFieldRef, useUiViewport } from '@ds/release'
import { useCallback, useRef, useState } from 'react'

interface Props {
	listLoading: ListLoading
	postMessageFn: Function
	primary?: boolean
}

export const NewMessageField = ({ listLoading, postMessageFn, primary }: Props) => {
	const { isViewportMaxLG } = useUiViewport()
	const [inputValue, setInputValue] = useState<string>('')
	const inputRef = useRef<TextFieldRef>(null)

	const message = inputValue.trim()
	const isLoading = listLoading === 'update'
	const isDisabled = listLoading === 'full' || listLoading === 'more'

	const onChange = (value: string) => setInputValue(value)

	const onPressEnter = useCallback(
		(event: ReactKeyboardEvent) => {
			if (isViewportMaxLG) return // Disable submit when pressing Enter on mobile
			if (event.shiftKey) return // Allow new lines only with Shift+Enter on desktop

			event.preventDefault()
			onSubmit()
		},
		[message, listLoading]
	)

	const onSubmit = useCallback(() => {
		if (listLoading || !message) return

		postMessageFn(message)
		setInputValue('')
		inputRef.current?.focus()
	}, [message, listLoading])

	const onFocus = (event: ReactFocusEvent) => {
		// On mobile, the field is covered by the floating keyboard
		const target = event.target as HTMLElement
		// Wait for floating keyboard to appear
		wait(500).then(() => target.scrollIntoView({ behavior: 'smooth', block: 'center' }))
	}

	return (
		<TextField
			ref={inputRef}
			id={primary ? 'field-chat' : 'field-subchat'}
			size={primary ? 'xl' : 'lg'}
			value={inputValue}
			placeholder={t('aiChat.inputPlaceholder')}
			ariaLabel="New message"
			slotRight={
				<IconButton
					tooltip={t('aiChat.sendMessage')}
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
	)
}
