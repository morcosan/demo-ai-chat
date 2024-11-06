import { IconButton, SendSvg, TextField, TextFieldRef } from '@ds/release'
import { useCallback, useRef, useState } from 'react'
import { useSubmittable } from '../hooks/submittable'

interface Props {
	listLoading: ListLoading
	postMessageFn: Function
	isChatView?: boolean
}

export const NewMessageField = ({ listLoading, postMessageFn, isChatView }: Props) => {
	const [inputValue, setInputValue] = useState<string>('')
	const inputRef = useRef<TextFieldRef>(null)

	const message = inputValue.trim()
	const isLoading = listLoading === 'update'
	const isDisabled = listLoading === 'full' || listLoading === 'more'

	const onChange = (value: string) => setInputValue(value)

	const onSubmit = useCallback(() => {
		if (isDisabled) return
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

	return (
		<TextField
			ref={inputRef}
			id={isChatView ? 'field-chat' : 'field-subchat'}
			size={isChatView ? 'xl' : 'lg'}
			value={inputValue}
			placeholder={t('aiChat.placeholder.newMessage')}
			ariaLabel="New message"
			slotRight={
				<IconButton
					tooltip={isDisabled || !message ? t('aiChat.error.emptyMessage') : t('aiChat.action.sendMessage')}
					variant={isChatView ? 'solid-primary' : 'solid-secondary'}
					size={isChatView ? 'md' : 'sm'}
					loading={isLoading}
					onClick={onSubmit}
				>
					<SendSvg className={isChatView ? 'h-xs-9' : 'h-xs-7'} />
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
