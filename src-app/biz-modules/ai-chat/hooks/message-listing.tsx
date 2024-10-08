import { TextFieldRef, useUiViewport } from '@ds/release'
import { KeyboardEvent, useCallback, useRef, useState } from 'react'

export const useMessageListing = (loading: ListLoading, postMessageFn: Function) => {
	const { isViewportMaxLG } = useUiViewport()
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
			if (isViewportMaxLG) return // Disable submit when pressing Enter on mobile
			if (event.shiftKey) return // Allow new lines only with Shift+Enter on desktop

			event.preventDefault()
			onSubmit()
		},
		[inputText, loading]
	)

	const onSubmit = useCallback(() => {
		if (loading || !inputText) return

		postMessageFn(inputText)
		setInput('')
		inputRef.current?.focus()
	}, [inputText, loading])

	return {
		input,
		inputRef,
		inputText,
		listingRef,

		onChange,
		onPressEnter,
		onSubmit,
		saveScrollPos,
		scrollToPos,
	}
}
