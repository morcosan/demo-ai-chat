import { LoadingText } from '@app/library/release'
import { ArrowBackSvg, IconButton } from '@ds/release'
import { debounce } from 'lodash'
import { UIEvent, useEffect, useMemo, useState } from 'react'
import { Agent, Message } from '../../../api'
import { MessageItem } from '../../../components/items/message-item'
import { NewMessageBox } from '../../../components/new-message-box'
import { PanelBase } from '../../../components/panel-base'
import { useScrollable } from '../../../hooks/use-scrollable'
import { AiChatPreviewSource, AiChatPreviewType, useAiChat, useAiChatAgents } from '../../../state'

interface Props {
	openPreview(content: string, type: AiChatPreviewType, source: AiChatPreviewSource): void
}

export const SubchatView = (props: Props) => {
	const { openPreview } = props
	const {
		activeChat,
		canLoadSubchatMessages,
		subchatLoading,
		subchatMessages,
		subchatPagination,
		loadMoreSubchatMessages,
		postSubchatMessage,
	} = useAiChat()
	const { allAgentsForChat, loadMissingAgents } = useAiChatAgents()
	const { containerRef, saveScrollPos, scrollToPos } = useScrollable()
	const [sentText, setSentText] = useState('')
	const [sentAgentId, setSentAgentId] = useState(0)

	const onPostMessage = (text: string, agentId: number) => {
		setSentText(text)
		setSentAgentId(agentId)
		postSubchatMessage(text, agentId)
	}

	const onRetryMessage = () => postSubchatMessage(sentText, sentAgentId)

	const onScroll = debounce((event: UIEvent) => {
		const THRESHOLD = 50 // px
		const container = event.target as HTMLElement
		const isScrollStart = container.scrollTop <= THRESHOLD

		if (isScrollStart && canLoadSubchatMessages) {
			saveScrollPos()
			loadMoreSubchatMessages()
		}
	}, 300)

	useEffect(() => {
		scrollToPos()
	}, [subchatPagination])

	useEffect(() => {
		loadMissingAgents([...new Set(subchatMessages.map((message: Message) => message.agentId))])
	}, [subchatMessages])

	const slotMessages = useMemo(
		() => (
			<ul>
				{subchatMessages.map((message: Message) => (
					<MessageItem
						key={message.id}
						message={message}
						agent={allAgentsForChat.find((agent: Agent) => agent.id === message.agentId)}
						isSubchat
						onClickRetry={onRetryMessage}
						onPreviewLink={(url: string) => openPreview(url, AiChatPreviewType.URL, AiChatPreviewSource.SUBCHAT)}
					/>
				))}
			</ul>
		),
		[subchatMessages, allAgentsForChat]
	)

	return (
		<PanelBase
			containerRef={containerRef}
			containerClass="!pb-lg-1 lg:!pb-lg-3"
			slotToolbar={
				<>
					<IconButton linkHref={`/chat/${activeChat?.id}`} tooltip={t('aiChat.action.backToSubchats')} size="sm">
						<ArrowBackSvg className="h-xs-5" />
					</IconButton>

					{Boolean(subchatPagination.count) && t('aiChat.label.xMessages', { count: subchatPagination.count })}
				</>
			}
			slotFooter={
				<div className="relative mx-a11y-scrollbar">
					<NewMessageBox listLoading={subchatLoading} onPostMessage={onPostMessage} />
				</div>
			}
			onScroll={onScroll}
		>
			{subchatLoading === 'full' ? (
				<LoadingText text={t('aiChat.state.loadingMessages')} className="flex-center h-full" />
			) : (
				<>
					{/* LOAD MORE */}
					<LoadingText
						text={t('aiChat.state.loadingPreviousMessages')}
						className="flex-center min-h-sm-1 text-size-xs"
						style={{ visibility: subchatLoading === 'more' ? 'visible' : 'hidden' }}
					/>
					{/* MESSAGES */}
					{slotMessages}
				</>
			)}
		</PanelBase>
	)
}
