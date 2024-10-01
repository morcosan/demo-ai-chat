import { InputField } from '../components/input-field'
import { useMessageListing } from '../hooks/message-listing'
import { useAiChat } from '../state'

export const SubchatView = () => {
	const { activeChat, chatLoading, activeSubchat, subchatMessages } = useAiChat()
	const { listingRef, input, inputRef, inputText, onChange, onPressEnter, onSubmit } = useMessageListing()

	const noSubchats = !activeChat || (activeSubchat && !subchatMessages.length)

	return (
		<div
			className="ml-xs-1 flex h-full w-[30%] items-stretch"
			style={{ display: !activeChat || chatLoading ? 'none' : 'flex' }}
		>
			{/* DELIMITER */}
			<div className="w-xs-1 bg-color-border-shadow" />

			<div className="ml-xs-5 h-full flex-1 gap-xs-4 py-xs-5 pr-xs-5">
				{noSubchats ? (
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
					<div className="flex h-full w-full flex-col">
						<div className="mt-xs-2 text-size-sm text-color-text-subtle">Sub-chats</div>
						<div className="flex-1 overflow-y-auto pb-xs-9">TODO</div>
					</div>
				)}
			</div>
		</div>
	)
}
