import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Message } from '../api/types'
import { InputField } from '../components/input-field'
import { MessageBubble } from '../components/message-bubble'
import { useMessageListing } from '../hooks/message-listing'
import { useAiChat } from '../state'

export const ChatView = () => {
	const { activeChat, loadChat, chatLoading, chatMessages } = useAiChat()
	const { chatId } = useParams()
	const { listingRef, input, inputRef, inputText, onChange, onPressEnter, onSubmit } = useMessageListing()

	const wrapperClass = 'mx-auto w-full max-w-xxl-2 px-md-0'
	const widthClass = 'w-md-0'

	useEffect(() => {
		const id = parseInt(String(chatId))
		loadChat(isNaN(id) ? 0 : id)
	}, [chatId])

	const titleSlot = <h1 className="mt-xs-9 px-xs-5 text-size-xl font-weight-md">{activeChat?.title}</h1>

	return (
		<div className="flex h-full flex-1 flex-col gap-xs-5 py-xs-5">
			{activeChat ? (
				<div ref={listingRef} className="flex-1 overflow-y-auto pb-sm-5">
					{chatLoading === 'full' ? (
						<div className={`${wrapperClass} flex h-full flex-col`}>
							{titleSlot}
							<div className="flex-center flex-1 px-xs-4 text-size-lg">
								<span className="mr-xs-4 animate-spin">⌛</span>
								Loading messages...
							</div>
						</div>
					) : (
						<div className={`${wrapperClass} flex flex-col`}>
							{titleSlot}
							<div className="mt-sm-5 flex flex-col">
								{chatMessages.map((message: Message) => (
									<MessageBubble key={message.datetime} message={message} widthClass={widthClass} />
								))}
							</div>
						</div>
					)}
				</div>
			) : (
				<div className="flex-center flex-1 flex-col overflow-y-auto">
					<h1 className="mt-xs-4 text-size-xxl">Start a new conversation</h1>
				</div>
			)}

			<div className={wrapperClass}>
				<InputField
					ref={inputRef}
					input={input}
					inputText={inputText}
					disabled={Boolean(chatLoading)}
					className="w-full"
					primary
					onChange={onChange}
					onPressEnter={onPressEnter}
					onSubmit={onSubmit}
				/>
			</div>
		</div>
	)
}
