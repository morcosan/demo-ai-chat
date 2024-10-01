import { MessageItem } from '@app/biz-modules/ai-chat/components/message-item'
import { Button } from '@ds/release'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Message, Subchat } from '../api/types'
import { InputField } from '../components/input-field'
import { LoadingText } from '../components/loading-text'
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
		loadSubchat,
	} = useAiChat()
	const { listingRef, input, inputRef, inputText, onChange, onPressEnter, onSubmit } = useMessageListing()
	const [searchParams] = useSearchParams()
	const subchatId = searchParams.get('subchat')

	const noSubchats = !activeChat || (activeSubchat && !subchatMessages.length)

	useEffect(() => {
		const id = parseInt(String(subchatId))
		loadSubchat(isNaN(id) ? 0 : id)
	}, [subchatId])

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
				) : activeSubchat ? (
					// MESSAGES
					<div className="flex h-full w-full flex-col gap-xs-5">
						<div className="mt-xs-3 flex flex-1 flex-col overflow-y-scroll px-xs-3 pt-xs-4">
							{subchatMessages.map((message: Message) => (
								<MessageItem key={message.datetime} message={message} secondary />
							))}
						</div>

						<div className="mx-scrollbar-w mb-xs-6 px-xs-1">
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
					</div>
				) : (
					// SUBCHATS
					<div className="h-full w-full overflow-y-scroll pb-sm-1 pl-scrollbar-w">
						<div className="mb-xs-4 ml-scrollbar-w mt-xs-9 pl-xs-1 text-color-text-subtle">Sub-chats</div>

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
		</div>
	)
}
