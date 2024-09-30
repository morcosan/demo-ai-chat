import { TextFieldRef } from '@ds/release'
import { KeyboardEvent, useCallback, useRef, useState } from 'react'

interface Message {
	text: string
	time: number
}

export const useMessageListing = () => {
	const [input, setInput] = useState<string>('')
	const [messages, setMessages] = useState<Message[]>([])
	const inputRef = useRef<TextFieldRef>(null)
	const listingRef = useRef<HTMLDivElement>(null)

	const inputText = input.trim()

	const onChange = (value: string) => setInput(value)

	const onSubmit = useCallback(
		(event: KeyboardEvent) => {
			if (!event.shiftKey && inputText) {
				event.preventDefault()
				submit()
			}
		},
		[inputText]
	)

	const submit = () => {
		setMessages([...messages, { text: inputText, time: new Date().getTime() }])
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
		onSubmit,
		submit,
	}
}
