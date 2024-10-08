import { debounce } from 'lodash'
import { UIEvent, useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Message } from '../api/types'
import { InputField } from '../components/input-field'
import { LoadingText } from '../components/loading-text'
import { MessageItem } from '../components/message-item'
import { StickyToolbar } from '../components/sticky-toolbar'
import { useMessageListing } from '../hooks/message-listing'
import { AiChatView, useAiChat } from '../state'

export const ChatView = () => {
	const {
		activeChat,
		activeView,
		allChatsLoading,
		canLoadChatMessages,
		chatLoading,
		chatMessages,
		chatPagination,
		loadActiveChat,
		loadMoreChatMessages,
		postChatMessage,
		resetActiveChat,
		setActiveView,
	} = useAiChat()
	const { input, inputRef, inputText, listingRef, onChange, onPressEnter, onSubmit, saveScrollPos, scrollToPos } =
		useMessageListing(chatLoading, postChatMessage)
	const { chatId: chatIdStr } = useParams()
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()

	const chatId = parseInt(chatIdStr || '')
	const subchatId = parseInt(String(searchParams.get('subchat')))

	const widthClass = 'mx-auto w-full max-w-xxl-2'

	const onClickSubchat = () => activeView === AiChatView.MOBILE_CHAT && setActiveView(AiChatView.MOBILE_SUBCHAT)

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
		const success = await loadActiveChat(chatId)
		if (success === false) {
			navigate('/chat')
		}
	}

	useEffect(() => {
		isNaN(chatId) || !chatId ? resetActiveChat() : loadChat()
	}, [chatId])

	useEffect(() => {
		// Navigate to new chat
		if (!activeChat || !activeChat.id) return
		if (activeChat.id === chatId) return
		navigate(`/chat/${activeChat.id}`)
	}, [activeChat])

	return (
		<div className="flex h-full flex-1 flex-col gap-xs-5 py-xs-1">
			{activeChat || chatId ? (
				<div ref={listingRef} className="flex-1 overflow-y-auto pb-sm-5" onScroll={onScroll}>
					<div className={`${widthClass} ${chatLoading === 'full' ? 'h-full' : ''} flex flex-col pt-sm-0`}>
						{/* TOOLBAR */}
						<StickyToolbar variant="chat" className="pb-xs-4">
							<h1 className="px-xs-5 lg:px-md-0">
								<div className="px-xs-5 pt-xs-0 text-size-xl font-weight-md">
									<div className="line-clamp-2">{activeChat?.title}</div>

									{Boolean(chatPagination.count) && (
										<div className="mt-xs-0 text-size-xs text-color-text-subtle">
											{chatPagination.count} messages
										</div>
									)}
								</div>
							</h1>
						</StickyToolbar>

						{/* LISTING */}
						{chatLoading === 'full' ? (
							<LoadingText text="Loading messages..." className="absolute-overlay flex-center" />
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
									<MessageItem
										key={message.id}
										message={message}
										subchatId={subchatId}
										onClickSubchat={onClickSubchat}
									/>
								))}
							</div>
						)}
					</div>
				</div>
			) : (
				<div className="flex-center flex-1 flex-col overflow-y-auto">
					<h1 className="mt-xs-4 text-size-xl font-weight-xs text-color-text-subtle">Start a new conversation</h1>
				</div>
			)}

			<div className={`px-xs-7 pb-xs-5 lg:px-md-0 ${widthClass}`}>
				<InputField
					ref={inputRef}
					input={input}
					inputText={inputText}
					loading={chatLoading === 'update' || Boolean(allChatsLoading)}
					disabled={chatLoading === 'full' || chatLoading === 'more'}
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
