import { Button } from '@ds/release'
import { Subchat } from '../api/types'
import { InputField } from '../components/input-field'
import { LoadingText } from '../components/loading-text'
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
	} = useAiChat()
	const { listingRef, input, inputRef, inputText, onChange, onPressEnter, onSubmit } = useMessageListing()

	const noSubchats = !activeChat || (activeSubchat && !subchatMessages.length)

	return (
		<div className="relative ml-xs-1 h-full w-[30%]">
			{/* DELIMITER */}
			<div className="absolute left-0 top-0 h-full w-xs-1 bg-color-border-shadow" />

			<div className="h-full w-full gap-xs-4 py-xs-5">
				{chatLoading || allSubchatsLoading ? (
					<LoadingText text="Loading subchats..." className="flex-center h-full" />
				) : subchatLoading ? (
					<LoadingText text="Loading messages..." className="flex-center h-full" />
				) : noSubchats ? (
					<div className="flex-center h-full w-full text-color-text-subtle">No sub-chats</div>
				) : activeSubchat ? (
					// MESSAGES
					<>
						<div ref={listingRef} className="flex-1 overflow-y-auto pb-xs-9">
							<div className="flex flex-col items-end gap-xs-4">
								{subchatMessages.map((message) => (
									<pre key={message.datetime} className="px-xs-5 py-xs-1">
										{message.text}
									</pre>
								))}
							</div>
						</div>

						<InputField
							ref={inputRef}
							input={input}
							inputText={inputText}
							onChange={onChange}
							onPressEnter={onPressEnter}
							onSubmit={onSubmit}
						/>
					</>
				) : (
					// SUBCHATS
					<div className="h-full w-full overflow-y-scroll pb-xs-9 pl-scrollbar-w">
						<div className="mb-xs-4 mt-xs-2 pl-scrollbar-w text-color-text-subtle">Sub-chats</div>

						{allSubchats.map((subchat: Subchat) => (
							<Button
								key={subchat.id}
								linkHref={`/chat/${subchat.chatId}?subchat=${subchat.id}`}
								variant="item-text-default"
								size="lg"
								className="block"
							>
								<span className="truncate">{subchat.text}</span>
							</Button>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
