import { ArrowBackSvg, Button, IconButton } from '@ds/release'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
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
		chatLoading,
		subchatLoading,
		subchatMessages,
		subchatPagination,
		loadSubchat,
	} = useAiChat()
	const listing = useMessageListing()
	const { listingRef, input, inputRef, inputText, onChange, onPressEnter, onSubmit, scrollToBottom } = listing
	const [searchParams] = useSearchParams()
	const subchatId = searchParams.get('subchat')

	const noSubchats = !activeChat || (activeSubchat && !subchatMessages.length)

	useEffect(() => {
		const id = parseInt(String(subchatId))
		loadSubchat(isNaN(id) ? 0 : id)
	}, [subchatId])

	useEffect(() => {
		scrollToBottom()
	}, [subchatPagination.page])

	return (
		<div className="relative ml-xs-2 h-full w-[30%]">
			{/* DELIMITER */}
			<div className="absolute -left-xs-1 top-0 h-full w-xs-1 bg-color-border-shadow" />

			<div className="h-full w-full">
				{chatLoading || allSubchatsLoading ? (
					<LoadingText text="Loading subchats..." className="flex-center h-full" />
				) : subchatLoading ? (
					<LoadingText text="Loading messages..." className="flex-center h-full" />
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
								>
									{/* TOOLBAR */}
									<StickyToolbar variant="subchat" className="-mx-a11y-padding mb-xs-9 px-xs-2 py-xs-1">
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

									{/* LISTING */}
									{subchatMessages.map((message: Message) => (
										<MessageItem key={message.datetime} message={message} secondary />
									))}
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
							<div className="flex-1 overflow-y-scroll pb-sm-1 pl-scrollbar-w pr-a11y-padding">
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
