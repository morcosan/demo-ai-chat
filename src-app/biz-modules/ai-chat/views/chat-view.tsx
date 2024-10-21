import { useUiTheme } from '@ds/release'
import { debounce } from 'lodash'
import { UIEvent, useEffect, useMemo } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Message } from '../api'
import { MessageItem } from '../components/items/message-item'
import { LoadingText } from '../components/loading-text'
import { NewMessageField } from '../components/new-message-field'
import { StickyToolbar } from '../components/sticky-toolbar'
import { useScrollable } from '../hooks/scrollable'
import { useAiChat } from '../state'

export const ChatView = () => {
	const {
		activeChat,
		allChatsLoading,
		canLoadChatMessages,
		chatLoading,
		chatMessages,
		chatPagination,
		loadActiveChat,
		loadMoreChatMessages,
		postChatMessage,
		resetActiveChat,
	} = useAiChat()
	const { containerRef, saveScrollPos, scrollToPos } = useScrollable()
	const { $lineHeight, $fontSize, $spacing } = useUiTheme()
	const { chatId: chatIdStr } = useParams()
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()

	const chatId = parseInt(chatIdStr || '')
	const subchatId = parseInt(String(searchParams.get('subchat')))

	const widthClass = 'mx-auto w-full max-w-xxl-2'

	const calcH1LineHeight = $lineHeight['sm']
	const calcH1Padding1 = $spacing['xs-3']
	const calcH1Padding2 = $spacing['xs-3']
	const calcH1FontSize = `calc(2 * ${$fontSize['xl']} + ${$fontSize['xs']})`
	const calcH1Height = `calc(${$lineHeight['sm']} * ${calcH1FontSize} + ${calcH1Padding1} + ${calcH1Padding2})`

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

		if (success === false) navigate('/chat')
		if (success === undefined && activeChat) navigate(`/chat/${activeChat.id}`)
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

	const slotMessages = useMemo(
		() => (
			<ul>
				{chatMessages.map((message: Message) => (
					<MessageItem key={message.id} message={message} subchatId={subchatId} />
				))}
			</ul>
		),
		[chatMessages, subchatId]
	)

	return (
		<div className="relative flex h-full flex-1 flex-col gap-xs-5 py-xs-1">
			{activeChat || chatId ? (
				<div ref={containerRef} className="flex-1 overflow-y-auto pb-sm-5" onScroll={onScroll}>
					<div className={cx(widthClass, chatLoading === 'full' && 'h-full', 'flex flex-col pt-sm-0')}>
						{/* TOOLBAR */}
						<StickyToolbar style={{ minHeight: calcH1Height, lineHeight: calcH1LineHeight }}>
							{(isSticky: boolean) => (
								<h1 className="mx-xs-5 px-xs-5 pt-xs-0 lg:mx-md-0" style={{ paddingBottom: calcH1Padding2 }}>
									<div className={cx('text-size-xl font-weight-md', isSticky ? 'line-clamp-1' : 'line-clamp-2')}>
										{activeChat?.title}
									</div>

									{Boolean(chatPagination.count) && (
										<div className="text-size-xs text-color-text-subtle" style={{ marginTop: calcH1Padding1 }}>
											{t('aiChat.xMessages', { count: chatPagination.count })}
										</div>
									)}
								</h1>
							)}
						</StickyToolbar>

						{/* LISTING */}
						{chatLoading === 'full' ? (
							<LoadingText text={t('aiChat.loadingMessages')} className="absolute-overlay flex-center" />
						) : (
							<div className="flex flex-col">
								{/* LOAD MORE */}
								<LoadingText
									text={t('aiChat.loadingPreviousMessages')}
									className="flex-center min-h-md-0 text-size-sm"
									style={{ visibility: chatLoading === 'more' ? 'visible' : 'hidden' }}
								/>
								{/* MESSAGES */}
								{slotMessages}
							</div>
						)}
					</div>
				</div>
			) : (
				<div className="flex-center flex-1 flex-col overflow-y-auto">
					<h1 className="mt-xs-4 text-size-xl font-weight-xs text-color-text-subtle">Start a new conversation</h1>
				</div>
			)}

			{/* NEW MESSAGE FIELD */}
			<div className={cx('px-xs-7 pb-xs-5 lg:px-md-0', widthClass)}>
				<NewMessageField
					listLoading={allChatsLoading ? 'update' : chatLoading}
					postMessageFn={postChatMessage}
					primary
				/>
			</div>
		</div>
	)
}
