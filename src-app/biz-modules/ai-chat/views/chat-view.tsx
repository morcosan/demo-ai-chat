import { useAiChatStore } from '@app/biz-modules/ai-chat/state'
import { useMessageMock } from '@app/biz-modules/ai-chat/views/_partials/message-mock'
import { IconButton, SendSvg, TextField } from '@ds/release'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const ChatView = () => {
	const { activeChat, loadChat } = useAiChatStore()
	const { chatId } = useParams()
	const { messages, messagesRef, question, questionRef, questionText, onChange, onSubmit, sendMessage } =
		useMessageMock()

	useEffect(() => {
		const id = parseInt(String(chatId))
		loadChat(isNaN(id) ? 0 : id)
	}, [chatId])

	return (
		<div className="mx-auto flex h-full max-w-xxl-1 flex-1 flex-col gap-xs-4 p-xs-5">
			{activeChat || messages.length ? (
				<div ref={messagesRef} className="flex-1 overflow-y-auto pb-xs-9">
					<h1 className="mt-xs-9 text-size-xl font-weight-md">{activeChat?.title}</h1>

					<div className="flex flex-col items-end gap-xs-4">
						{messages.map((message) => (
							<pre key={message.time} className="px-xs-5 py-xs-1">
								{message.text}
							</pre>
						))}
					</div>
				</div>
			) : (
				<div className="flex-center flex-1 flex-col overflow-y-auto">
					<h1 className="mt-xs-4 text-size-xxl">Start a new conversation</h1>
				</div>
			)}

			<TextField
				ref={questionRef}
				id="new-chat-question"
				size="xl"
				value={question}
				placeholder="Ask a question..."
				ariaLabel="New message"
				slotRight={
					<IconButton
						tooltip="Send message"
						variant="solid-primary"
						disabled={!questionText}
						onClick={sendMessage}
					>
						<SendSvg className="h-xs-9" />
					</IconButton>
				}
				maxLength={1000}
				maxRows={10}
				multiline
				onChange={onChange}
				onSubmit={onSubmit}
			/>
		</div>
	)
}
