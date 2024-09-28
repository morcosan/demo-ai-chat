import { TextFieldRef } from '@ds/release'
import { KeyboardEvent, useCallback, useRef, useState } from 'react'

interface Message {
	text: string
	time: number
}

export const useMessageMock = () => {
	const [question, setQuestion] = useState<string>('')
	const [messages, setMessages] = useState<Message[]>([])
	const questionRef = useRef<TextFieldRef>(null)
	const messagesRef = useRef<HTMLDivElement>(null)

	const questionText = question.trim()

	const onChange = (value: string) => setQuestion(value)

	const onSubmit = useCallback(
		(event: KeyboardEvent) => {
			if (!event.shiftKey && questionText) {
				sendMessage()
				event.preventDefault()
			}
		},
		[question, messages]
	)

	const sendMessage = () => {
		setMessages([...messages, { text: questionText, time: new Date().getTime() }])
		setQuestion('')
		questionRef.current?.focus()

		wait(100).then(() => messagesRef.current?.scrollTo(0, messagesRef.current.scrollHeight))
	}

	return {
		messages,
		messagesRef,
		question,
		questionRef,
		questionText,

		onChange,
		onSubmit,
		sendMessage,
	}
}
