import { ArrowBackSvg, Button, IconButton } from '@ds/release'
import { debounce } from 'lodash'
import { UIEvent, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Message, Subchat } from '../api/types'
import { InputField } from '../components/input-field'
import { LoadingText } from '../components/loading-text'
import { MessageItem } from '../components/message-item'
import { StickyToolbar } from '../components/sticky-toolbar'
import { SubchatBubble } from '../components/subchat-bubble'
import { useMessageListing } from '../hooks/message-listing'
import { useAiChat } from '../state'

export const SubchatView = () => {
	const {
		activeChat,
		activeSubchat,
		allSubchats,
		allSubchatsLoading,
		canLoadSubchatMessages,
		chatLoading,
		subchatLoading,
		subchatMessages,
		subchatPagination,
		loadActiveSubchat,
		loadMoreSubchatMessages,
		resetActiveSubchat,
	} = useAiChat()
	const {
		listingRef,
		input,
		inputRef,
		inputText,
		onChange,
		onPressEnter,
		onSubmit,
		saveScrollPosition,
		scrollMessages,
	} = useMessageListing()
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()

	const subchatId = parseInt(String(searchParams.get('subchat')))

	const noSubchats = (() => {
		if (subchatLoading) return false
		if (!activeChat || !allSubchats.length) return true
		return Boolean(activeSubchat && !subchatMessages.length)
	})()

	const onScrollMessages = debounce((event: UIEvent) => {
		const THRESHOLD = 50 // px
		const container = event.target as HTMLElement
		const isScrollStart = container.scrollTop <= THRESHOLD

		if (isScrollStart && canLoadSubchatMessages) {
			saveScrollPosition()
			loadMoreSubchatMessages()
		}
	}, 300)

	useEffect(() => {
		scrollMessages()
	}, [subchatPagination.page])

	const loadSubchat = async () => {
		const success = await loadActiveSubchat(subchatId)
		if (success === false) {
			searchParams.delete('subchat')
			navigate({ search: searchParams.toString() }, { replace: true })
		}
	}

	useEffect(() => {
		subchatId ? loadSubchat() : resetActiveSubchat()
	}, [activeChat, subchatId])

	return (
		<div className="relative ml-xs-2 h-full w-[30%]">
			{/* DELIMITER */}
			<div className="absolute -left-xs-1 top-0 h-full w-xs-1 bg-color-border-shadow" />

			<div className="h-full w-full">
				{chatLoading === 'full' || allSubchatsLoading ? (
					<LoadingText text="Loading subchats..." className="flex-center h-full" />
				) : noSubchats ? (
					<div className="flex-center h-full w-full text-color-text-subtle">No sub-chats</div>
				) : (
					<div className="flex h-full w-full flex-col gap-xs-5 py-xs-1">
						{activeSubchat ? (
							// MESSAGES
							<>
								<div
									ref={listingRef}
									className="flex flex-1 flex-col overflow-y-scroll pb-sm-1 pl-scrollbar-w pr-a11y-padding"
									onScroll={onScrollMessages}
								>
									{/* TOOLBAR */}
									<StickyToolbar variant="subchat" className="-mx-a11y-padding px-xs-2 py-xs-1">
										<div className="flex items-center gap-xs-2">
											<IconButton linkHref={`/chat/${activeChat?.id}`} tooltip="Back to subchats" size="sm">
												<ArrowBackSvg className="h-xs-5" />
											</IconButton>

											{Boolean(subchatPagination.count) && (
												<div className="text-size-sm text-color-text-subtle">
													{subchatPagination.count} messages
												</div>
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
												<MessageItem key={message.datetime} message={message} secondary />
											))}
										</>
									)}
								</div>

								{/* INPUT FIELD */}
								<div className="mx-a11y-scrollbar mb-xs-5">
									<InputField
										ref={inputRef}
										input={input}
										inputText={inputText}
										className="w-full"
										onChange={onChange}
										onPressEnter={onPressEnter}
										onSubmit={onSubmit}
									/>
								</div>
							</>
						) : (
							// SUBCHATS
							<div
								ref={(elem) => elem && (elem.scrollTop = 0)}
								className="flex-1 overflow-y-scroll pb-sm-1 pl-scrollbar-w pr-a11y-padding"
							>
								{/* TOOLBAR */}
								<StickyToolbar variant="subchat" className="-mx-a11y-padding mb-xs-2 px-xs-9 py-xs-1">
									<div className="flex h-button-h-sm items-center text-size-sm text-color-text-subtle">
										Sub-chats ({allSubchats.length})
									</div>
								</StickyToolbar>

								{allSubchats.map((subchat: Subchat) => (
									<Button
										key={subchat.id}
										linkHref={`/chat/${subchat.chatId}?subchat=${subchat.id}`}
										variant="item-text-default"
										size="lg"
										className="block"
									>
										<SubchatBubble count={subchat.size} className="mr-xs-2" />
										<span className="truncate pb-xs-0 text-color-secondary-text-default">{subchat.text}</span>
									</Button>
								))}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	)
}
