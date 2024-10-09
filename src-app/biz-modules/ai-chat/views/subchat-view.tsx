import { ArrowBackSvg, IconButton } from '@ds/release'
import { debounce } from 'lodash'
import { UIEvent, useEffect } from 'react'
import { Message } from '../api/types'
import { InputField } from '../components/input-field'
import { LoadingText } from '../components/loading-text'
import { MessageItem } from '../components/message-item'
import { StickyToolbar } from '../components/sticky-toolbar'
import { useMessageListing } from '../hooks/message-listing'
import { useAiChat } from '../state'

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
	const { listingRef, input, inputRef, inputText, onChange, onPressEnter, onSubmit, saveScrollPos, scrollToPos } =
		useMessageListing(subchatLoading, postSubchatMessage)

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

	return (
		<div className="flex h-full flex-col py-xs-1">
			<div
				ref={listingRef}
				className="flex flex-1 flex-col overflow-y-scroll pb-sm-1 pl-scrollbar-w pr-a11y-padding"
				onScroll={onScroll}
			>
				{/* TOOLBAR */}
				<StickyToolbar variant="subchat" className="-mx-a11y-padding px-xs-2 py-xs-1">
					<div className="flex items-center gap-xs-2">
						<IconButton linkHref={`/chat/${activeChat?.id}`} tooltip="Back to subchats" size="sm">
							<ArrowBackSvg className="h-xs-5" />
						</IconButton>

						{Boolean(subchatPagination.count) && (
							<div className="pb-px text-size-sm">{subchatPagination.count} messages</div>
						)}
					</div>
				</StickyToolbar>

				{subchatLoading === 'full' ? (
					<LoadingText text="Loading messages..." className="flex-center h-full" />
				) : (
					<>
						{/* LOAD MORE */}
						<LoadingText
							text="Loading previous messages..."
							className="flex-center min-h-sm-1 text-size-xs"
							style={{ visibility: subchatLoading === 'more' ? 'visible' : 'hidden' }}
						/>
						{/* MESSAGES */}
						{subchatMessages.map((message: Message) => (
							<MessageItem key={message.id} message={message} isSubchat />
						))}
					</>
				)}
			</div>

			{/* INPUT FIELD */}
			<div className="mx-a11y-scrollbar mb-xs-5 mt-xs-5">
				<InputField
					ref={inputRef}
					input={input}
					inputText={inputText}
					loading={subchatLoading === 'update'}
					disabled={subchatLoading === 'full' || subchatLoading === 'more'}
					className="w-full"
					onChange={onChange}
					onPressEnter={onPressEnter}
					onSubmit={onSubmit}
				/>
			</div>
		</div>
	)
}
