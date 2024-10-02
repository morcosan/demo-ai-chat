import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Message } from '../api/types'
import { InputField } from '../components/input-field'
import { LoadingText } from '../components/loading-text'
import { MessageItem } from '../components/message-item'
import { StickyToolbar } from '../components/sticky-toolbar'
import { useMessageListing } from '../hooks/message-listing'
import { useAiChat } from '../state'

export const ChatView = () => {
	const { activeChat, loadChat, chatLoading, chatMessages, chatPagination } = useAiChat()
	const { chatId } = useParams()
	const { listingRef, input, inputRef, inputText, onChange, onPressEnter, onSubmit } = useMessageListing()

	const wrapperClass = 'mx-auto w-full max-w-xxl-2 px-md-0'
	const widthClass = 'w-md-0'

	useEffect(() => {
		const id = parseInt(String(chatId))
		loadChat(isNaN(id) ? 0 : id)
	}, [chatId])

	return (
		<div className="flex h-full flex-1 flex-col gap-xs-5 py-xs-1">
			{activeChat ? (
				<div ref={listingRef} className="flex-1 overflow-y-auto pb-sm-5">
					<div className={`${wrapperClass} ${chatLoading === 'full' ? 'h-full' : ''} flex flex-col pt-sm-0`}>
						{/* TOOLBAR */}
						<StickyToolbar size="md" className="-mx-md-0 pb-xs-3">
							<h1 className="mx-md-0 px-xs-5 text-size-xl font-weight-md">
								{activeChat?.title}
								{Boolean(chatPagination.count) && (
									<div className="mt-xs-2 text-size-xs text-color-text-subtle">
										{chatPagination.count} messages
									</div>
								)}
							</h1>
						</StickyToolbar>

						{chatLoading === 'full' ? (
							<LoadingText text="Loading messages..." className="flex-center flex-1" />
						) : (
							<div className="mt-sm-5 flex flex-col">
								{chatMessages.map((message: Message) => (
									<MessageItem key={message.datetime} message={message} widthClass={widthClass} />
								))}
							</div>
						)}
					</div>
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
					className="mb-xs-5 w-full"
					primary
					onChange={onChange}
					onPressEnter={onPressEnter}
					onSubmit={onSubmit}
				/>
			</div>
		</div>
	)
}
