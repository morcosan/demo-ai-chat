import { useMessageListing } from '@app/biz-modules/ai-chat/hooks/message-listing'
import { IconButton, SendSvg, TextField } from '@ds/release'

export const SubchatView = () => {
	const { messages, listingRef, input, inputRef, inputText, onChange, onSubmit, submit } = useMessageListing()

	return (
		<div className="h-full w-xl-4 p-xs-4">
			<div className="flex h-full w-full flex-col gap-xs-4 border border-color-border-shadow p-xs-4 shadow-md">
				<div ref={listingRef} className="flex-1 overflow-y-auto pb-xs-9">
					<h2 className="text-size-lg font-weight-md">Sub-chat</h2>

					<div className="flex flex-col items-end gap-xs-4">
						{messages.map((message) => (
							<pre key={message.time} className="px-xs-5 py-xs-1">
								{message.text}
							</pre>
						))}
					</div>
				</div>

				<TextField
					ref={inputRef}
					id="new-chat-question"
					size="lg"
					value={input}
					placeholder="Ask a question..."
					ariaLabel="New message"
					slotRight={
						<IconButton
							tooltip="Send message"
							variant="solid-secondary"
							disabled={!inputText}
							size="sm"
							onClick={submit}
						>
							<SendSvg className="h-xs-7" />
						</IconButton>
					}
					maxLength={1000}
					maxRows={10}
					multiline
					onChange={onChange}
					onSubmit={onSubmit}
				/>
			</div>
		</div>
	)
}
