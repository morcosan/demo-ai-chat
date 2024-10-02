import { debounce } from 'lodash'
import { UIEvent, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Message } from '../api/types'
import { InputField } from '../components/input-field'
import { LoadingText } from '../components/loading-text'
import { MessageItem } from '../components/message-item'
import { StickyToolbar } from '../components/sticky-toolbar'
import { useMessageListing } from '../hooks/message-listing'
import { useAiChat } from '../state'

export const ChatView = () => {
	const { chatId } = useParams()
	const {
		activeChat,
		canLoadChatMessages,
		chatLoading,
		chatMessages,
		chatPagination,
		loadChat,
		loadMoreChatMessages,
	} = useAiChat()
	const {
		input,
		inputRef,
		inputText,
		listingRef,
		onChange,
		onPressEnter,
		onSubmit,
		saveScrollPosition,
		scrollMessages,
	} = useMessageListing()

	const wrapperClass = 'mx-auto w-full max-w-xxl-2 px-md-0'
	const widthClass = 'w-md-0'

	const onScrollMessages = debounce((event: UIEvent) => {
		const THRESHOLD = 50 // px
		const container = event.target as HTMLElement
		const isScrollStart = container.scrollTop <= THRESHOLD

		if (isScrollStart && canLoadChatMessages) {
			saveScrollPosition()
			loadMoreChatMessages()
		}
	}, 300)

	useEffect(() => {
		const id = parseInt(String(chatId))
		loadChat(isNaN(id) ? 0 : id)
	}, [chatId])

	useEffect(() => {
		scrollMessages()
	}, [chatPagination.page])

	return (
		<div className="flex h-full flex-1 flex-col gap-xs-5 py-xs-1">
			{activeChat ? (
				<div ref={listingRef} className="flex-1 overflow-y-auto pb-sm-5" onScroll={onScrollMessages}>
					<div className={`${wrapperClass} ${chatLoading === 'full' ? 'h-full' : ''} flex flex-col pt-sm-0`}>
						{/* TOOLBAR */}
						<StickyToolbar variant="chat" className="-mx-md-0 mb-md-2 pb-xs-3">
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
							<div className="flex flex-col">
								{chatLoading === 'more' && (
									<LoadingText text="Loading previous messages..." className="flex-center mb-md-0" />
								)}
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
