import { ArrowBackSvg, IconButton } from '@ds/release'
import { debounce } from 'lodash'
import { UIEvent, useEffect, useMemo } from 'react'
import { Message } from '../../api'
import { MessageItem } from '../../components/items/message-item'
import { LoadingText } from '../../components/loading-text'
import { NewMessageField } from '../../components/new-message-field'
import { StickyToolbar } from '../../components/sticky-toolbar'
import { useScrollable } from '../../hooks/scrollable'
import { useAiChat } from '../../state'

export const SubchatView = () => {
	const {
		activeChat,
		canLoadSubchatMessages,
		subchatLoading,
		subchatMessages,
		subchatPagination,
		loadMoreSubchatMessages,
		postSubchatMessage,
	} = useAiChat()
	const { containerRef, saveScrollPos, scrollToPos } = useScrollable()

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

	const slotMessages = useMemo(
		() => (
			<ul>
				{subchatMessages.map((message: Message) => (
					<MessageItem key={message.id} message={message} isSubchat />
				))}
			</ul>
		),
		[subchatMessages]
	)

	return (
		<div className="flex h-full flex-col py-xs-1">
			<div
				ref={containerRef}
				className="flex flex-1 flex-col overflow-y-scroll pb-sm-1 pl-scrollbar-w pr-a11y-padding"
				onScroll={onScroll}
			>
				{/* TOOLBAR */}
				<StickyToolbar stretched permanent>
					<div className="flex items-center gap-xs-2 px-xs-1 py-xs-1">
						<IconButton linkHref={`/chat/${activeChat?.id}`} tooltip={t('aiChat.action.backToSubchats')} size="sm">
							<ArrowBackSvg className="h-xs-5" />
						</IconButton>

						<div className="pb-px text-size-sm">
							{Boolean(subchatPagination.count) && t('aiChat.xMessages', { count: subchatPagination.count })}
						</div>
					</div>
				</StickyToolbar>

				{subchatLoading === 'full' ? (
					<LoadingText text={t('aiChat.loadingMessages')} className="flex-center h-full" />
				) : (
					<>
						{/* LOAD MORE */}
						<LoadingText
							text={t('aiChat.loadingPreviousMessages')}
							className="flex-center min-h-sm-1 text-size-xs"
							style={{ visibility: subchatLoading === 'more' ? 'visible' : 'hidden' }}
						/>
						{/* MESSAGES */}
						{slotMessages}
					</>
				)}
			</div>

			{/* NEW MESSAGE FIELD */}
			<div className="mx-a11y-scrollbar mb-xs-5 mt-xs-5">
				<NewMessageField listLoading={subchatLoading} postMessageFn={postSubchatMessage} />
			</div>
		</div>
	)
}
