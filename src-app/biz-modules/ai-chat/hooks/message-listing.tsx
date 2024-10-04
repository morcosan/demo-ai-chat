import { TextFieldRef } from '@ds/release'
import { KeyboardEvent, useCallback, useRef, useState } from 'react'

export const useMessageListing = (loading: ListLoading, postMessageFn: Function) => {
	const [input, setInput] = useState<string>('')
	const [scrollHeight, setScrollHeight] = useState(0)
	const inputRef = useRef<TextFieldRef>(null)
	const listingRef = useRef<HTMLDivElement>(null)

	const inputText = input.trim()

	const saveScrollPos = () => setScrollHeight(listingRef.current?.scrollHeight || 0)
	const scrollToSaved = () => listingRef.current?.scrollTo(0, listingRef.current.scrollHeight - scrollHeight)
	const scrollToBottom = () => listingRef.current?.scrollTo(0, listingRef.current.scrollHeight)
	const scrollToPos = () => {
		scrollHeight ? scrollToSaved() : scrollToBottom()
		setScrollHeight(0)
	}

	const onChange = (value: string) => setInput(value)

	const onPressEnter = useCallback(
		(event: KeyboardEvent) => {
			if (!event.shiftKey) {
				event.preventDefault()
				onSubmit()
			}
		},
		[inputText]
	)

	const onSubmit = () => {
		if (loading) return

		postMessageFn(inputText)
		setInput('')
		inputRef.current?.focus()
	}

	return {
		input,
		inputRef,
		inputText,
		listingRef,

		scrollToPos,
		onChange,
		onPressEnter,
		onSubmit,
		saveScrollPos,
	}
}
