import { TextFieldRef } from '@ds/release'
import { KeyboardEvent, useCallback, useRef, useState } from 'react'

export const useMessageListing = (createMessageFn: Function) => {
	const [input, setInput] = useState<string>('')
	const [scrollHeight, setScrollHeight] = useState(0)
	const inputRef = useRef<TextFieldRef>(null)
	const listingRef = useRef<HTMLDivElement>(null)

	const inputText = input.trim()

	const saveScrollPosition = () => setScrollHeight(listingRef.current?.scrollHeight || 0)
	const scrollToSaved = () => listingRef.current?.scrollTo(0, listingRef.current.scrollHeight - scrollHeight)
	const scrollToBottom = () => listingRef.current?.scrollTo(0, listingRef.current.scrollHeight)
	const scrollMessages = () => {
		scrollHeight ? scrollToSaved() : scrollToBottom()
		setScrollHeight(0)
	}

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
		createMessageFn(inputText)
		setInput('')
		inputRef.current?.focus()
		wait(100).then(scrollToBottom)
	}

	return {
		input,
		inputRef,
		inputText,
		listingRef,

		onChange,
		onPressEnter,
		onSubmit,
		saveScrollPosition,
		scrollMessages,
	}
}
