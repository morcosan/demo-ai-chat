import { LoadingText } from '@app/library/release'
import { useUiTheme } from '@ds/release'
import { debounce } from 'lodash'
import { UIEvent, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Agent, Message } from '../../api'
import { MessageItem } from '../../components/items/message-item'
import { NewMessageBox } from '../../components/new-message-box'
import { StickyToolbar } from '../../components/sticky-toolbar'
import { useScrollable } from '../../hooks/use-scrollable'
import { useAiChat, useAiChatAgents } from '../../state'

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
	const { allAgentsForChat, loadMissingAgents } = useAiChatAgents()
	const { containerRef, saveScrollPos, scrollToPos } = useScrollable()
	const { $lineHeight, $fontSize, $spacing } = useUiTheme()
	const { chatId: chatIdStr } = useParams()
	const [sentText, setSentText] = useState('')
	const [sentAgentId, setSentAgentId] = useState(0)
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()

	const chatId = parseInt(chatIdStr || '')
	const subchatId = parseInt(String(searchParams.get('subchat')))

	const widthClass = 'mx-auto w-full max-w-xxl-2'

	const calcH1LineHeight = $lineHeight['sm']
	const calcH1PY1 = $spacing['xs-2']
	const calcH1PY2 = $spacing['xs-3']
	const calcH1FontSize = `calc(2 * ${$fontSize['xl']} + ${$fontSize['xs']})`
	const calcH1Height = `calc(${$lineHeight['sm']} * ${calcH1FontSize} + ${calcH1PY1} + ${calcH1PY2})`

	const onPostMessage = (text: string, agentId: number) => {
		setSentText(text)
		setSentAgentId(agentId)
		postChatMessage(text, agentId)
	}

	const onRetryMessage = () => postChatMessage(sentText, sentAgentId)

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
		if ((isNaN(chatId) || !chatId) && activeChat?.id) {
			navigate(`/chat/${activeChat.id}`)
		}
	}, [activeChat])

	useEffect(() => {
		loadMissingAgents([...new Set(chatMessages.map((message: Message) => message.agentId))])
	}, [chatMessages])

	const slotMessages = useMemo(
		() => (
			<ul>
				{chatMessages.map((message: Message) => (
					<MessageItem
						key={message.id}
						message={message}
						agent={allAgentsForChat.find((agent: Agent) => agent.id === message.agentId)}
						subchatId={subchatId}
						onRetry={onRetryMessage}
					/>
				))}
			</ul>
		),
		[chatMessages, subchatId, allAgentsForChat]
	)

	return (
		<div className="relative flex h-full w-full min-w-0 flex-1 flex-col">
			<div ref={containerRef} className="ds-scrollable flex-1 !pb-lg-1 lg:!pb-lg-3" onScroll={onScroll}>
				{activeChat || chatId ? (
					<div className={cx(widthClass, chatLoading === 'full' && 'h-full', 'flex flex-col pt-sm-0')}>
						{/* TOOLBAR */}
						<StickyToolbar style={{ minHeight: calcH1Height, lineHeight: calcH1LineHeight }} stretched>
							{(isSticky: boolean) => (
								<h1
									className="px-a11y-padding lg:mx-md-0"
									style={{ paddingTop: calcH1PY1, paddingBottom: calcH1PY2 }}
								>
									<div
										className={cx(
											'pl-xs-1 text-size-xl font-weight-md',
											isSticky ? 'line-clamp-1' : 'line-clamp-2'
										)}
									>
										{activeChat?.title}
									</div>

									{Boolean(chatPagination.count) && (
										<div className="pl-xs-1 text-size-xs text-color-text-subtle" style={{ marginTop: calcH1PY2 }}>
											{t('aiChat.label.xMessages', { count: chatPagination.count })}
										</div>
									)}
								</h1>
							)}
						</StickyToolbar>

						{/* LISTING */}
						{chatLoading === 'full' ? (
							<LoadingText text={t('aiChat.state.loadingMessages')} className="absolute-overlay flex-center" />
						) : (
							<div className="flex flex-col">
								{/* LOAD MORE */}
								<LoadingText
									text={t('aiChat.state.loadingPreviousMessages')}
									className="flex-center min-h-md-0 text-size-sm"
									style={{ visibility: chatLoading === 'more' ? 'visible' : 'hidden' }}
								/>
								{/* MESSAGES */}
								{slotMessages}
							</div>
						)}
					</div>
				) : (
					<h1 className="flex-center h-full flex-1 flex-col text-size-xl font-weight-xs text-color-text-subtle">
						{t('aiChat.action.startNewChat')}
					</h1>
				)}
			</div>

			{/* NEW MESSAGE FIELD */}
			<div className="mx-a11y-scrollbar">
				<div className={cx('lg:px-md-0', widthClass)}>
					<div className="relative">
						<NewMessageBox
							listLoading={allChatsLoading ? 'update' : chatLoading}
							isChatView
							onPostMessage={onPostMessage}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
