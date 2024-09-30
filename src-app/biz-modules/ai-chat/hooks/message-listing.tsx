import { TextFieldRef } from '@ds/release'
import { KeyboardEvent, useCallback, useRef, useState } from 'react'
import { Message } from '../api/types'

export const useMessageListing = () => {
	const [input, setInput] = useState<string>('')
	const [messages, setMessages] = useState<Message[]>([])
	const inputRef = useRef<TextFieldRef>(null)
	const listingRef = useRef<HTMLDivElement>(null)

	const inputText = input.trim()

	const onChange = (value: string) => setInput(value)

	const onPressEnter = useCallback(
		(event: KeyboardEvent) => {
			if (!event.shiftKey && inputText) {
				event.preventDefault()
				onSubmit()
			}
		},
		[inputText]
	)

	const onSubmit = () => {
		// setMessages([...messages, { text: inputText, datetime: new Date().toISOString() }])
		setInput('')
		inputRef.current?.focus()

		wait(100).then(() => listingRef.current?.scrollTo(0, listingRef.current.scrollHeight))
	}

	return {
		input,
		inputRef,
		inputText,
		listingRef,
		messages,

		onChange,
		onPressEnter,
		onSubmit,
	}
}
