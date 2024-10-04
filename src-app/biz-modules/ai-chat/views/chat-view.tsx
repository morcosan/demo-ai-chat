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
		postChatMessage,
		loadActiveChat,
		loadMoreChatMessages,
		resetActiveChat,
	} = useAiChat()
	const { input, inputRef, inputText, listingRef, onChange, onPressEnter, onSubmit, saveScrollPos, scrollToPos } =
		useMessageListing(chatLoading, postChatMessage)
	const { chatId } = useParams()
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()

	const subchatId = parseInt(String(searchParams.get('subchat')))

	const widthClass = 'mx-auto w-full max-w-xxl-2'

	const onScroll = debounce((event: UIEvent) => {
		const THRESHOLD = 50 // px
		const container = event.target as HTMLElement
		const isScrollStart = container.scrollTop <= THRESHOLD

		if (isScrollStart && canLoadChatMessages) {
			saveScrollPos()
			loadMoreChatMessages()
		}
	}, 300)

	useEffect(() => {
		scrollToPos()
	}, [chatPagination])

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
				<div ref={listingRef} className="flex-1 overflow-y-auto pb-sm-5" onScroll={onScroll}>
					<div className={`${widthClass} ${chatLoading === 'full' ? 'h-full' : ''} flex flex-col pt-sm-0`}>
						{/* TOOLBAR */}
						<StickyToolbar variant="chat" className="pb-xs-3">
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
								<LoadingText
									text="Loading previous messages..."
									className="flex-center min-h-md-0 text-size-sm"
									style={{ visibility: chatLoading === 'more' ? 'visible' : 'hidden' }}
								/>
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

			<div className={`px-md-0 ${widthClass}`}>
				<InputField
					ref={inputRef}
					input={input}
					inputText={inputText}
					loading={chatLoading === 'post'}
					disabled={chatLoading === 'full' || chatLoading === 'more'}
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
