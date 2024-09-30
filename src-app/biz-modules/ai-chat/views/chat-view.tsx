import { InputField } from '@app/biz-modules/ai-chat/components/input-field'
import { MessageBubble } from '@app/biz-modules/ai-chat/components/message-bubble'
import { useMessageListing } from '@app/biz-modules/ai-chat/hooks/message-listing'
import { useAiChat } from '@app/biz-modules/ai-chat/state'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const ChatView = () => {
	const { activeChat, loadActiveChat } = useAiChat()
	const { chatId } = useParams()
	const { messages, listingRef, input, inputRef, inputText, onChange, onPressEnter, onSubmit } =
		useMessageListing()

	useEffect(() => {
		const id = parseInt(String(chatId))
		loadActiveChat(isNaN(id) ? 0 : id)
	}, [chatId])

	return (
		<div className="mx-auto flex h-full max-w-xxl-1 flex-1 flex-col gap-xs-4 p-xs-5">
			{activeChat || messages.length ? (
				<div ref={listingRef} className="flex-1 overflow-y-auto pb-xs-9">
					<h1 className="mt-xs-9 text-size-xl font-weight-md">{activeChat?.title}</h1>

					<div className="flex flex-col items-end gap-xs-4">
						{messages.map((message) => (
							<MessageBubble key={message.datetime} message={message} />
						))}
					</div>
				</div>
			) : (
				<div className="flex-center flex-1 flex-col overflow-y-auto">
					<h1 className="mt-xs-4 text-size-xxl">Start a new conversation</h1>
				</div>
			)}

			<InputField
				ref={inputRef}
				input={input}
				inputText={inputText}
				primary
				onChange={onChange}
				onPressEnter={onPressEnter}
				onSubmit={onSubmit}
			/>
		</div>
	)
}
