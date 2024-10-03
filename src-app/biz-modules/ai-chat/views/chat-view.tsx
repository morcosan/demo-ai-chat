import { debounce } from 'lodash'
import { UIEvent, useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Message } from '../api/types'
import { InputField } from '../components/input-field'
import { LoadingText } from '../components/loading-text'
import { MessageItem } from '../components/message-item'
import { StickyToolbar } from '../components/sticky-toolbar'
import { useMessageListing } from '../hooks/message-listing'
import { useAiChat } from '../state'

export const ChatView = () => {
	const {
		activeChat,
		canLoadChatMessages,
		chatLoading,
		chatMessages,
		chatPagination,
		loadActiveChat,
		loadMoreChatMessages,
		resetActiveChat,
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
	const { chatId } = useParams()
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()

	const subchatId = parseInt(String(searchParams.get('subchat')))

	const wrapperClass = 'mx-auto w-full max-w-xxl-2'

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
		scrollMessages()
	}, [chatPagination.page])

	const loadChat = async () => {
		const success = await loadActiveChat(parseInt(chatId || ''))
		if (success === false) {
			navigate('/chat')
		}
	}

	useEffect(() => {
		chatId ? loadChat() : resetActiveChat()
	}, [chatId])

	return (
		<div className="flex h-full flex-1 flex-col gap-xs-5 py-xs-1">
			{activeChat || chatId ? (
				<div ref={listingRef} className="flex-1 overflow-y-auto pb-sm-5" onScroll={onScrollMessages}>
					<div className={`${wrapperClass} ${chatLoading === 'full' ? 'h-full' : ''} flex flex-col pt-sm-0`}>
						{/* TOOLBAR */}
						<StickyToolbar variant="chat" className="mb-md-2 pb-xs-3">
							<h1 className="mx-md-0 px-xs-5 text-size-xl font-weight-md">
								{activeChat?.title}
								{Boolean(chatPagination.count) && (
									<div className="mt-xs-2 text-size-xs text-color-text-subtle">
										{chatPagination.count} messages
									</div>
								)}
							</h1>
						</StickyToolbar>

						{/* LISTING */}
						{chatLoading === 'full' ? (
							<LoadingText text="Loading messages..." className="flex-center flex-1" />
						) : (
							<div className="flex flex-col">
								{/* LOAD MORE */}
								{chatLoading === 'more' && (
									<LoadingText text="Loading previous messages..." className="flex-center mb-md-0" />
								)}
								{/* MESSAGES */}
								{chatMessages.map((message: Message) => (
									<MessageItem key={message.datetime} message={message} subchatId={subchatId} />
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

			<div className={`px-md-0 ${wrapperClass}`}>
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
