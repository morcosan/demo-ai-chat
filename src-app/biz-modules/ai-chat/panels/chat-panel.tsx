export const ChatPanel = () => {
	return (
		<div className="mx-auto flex h-full max-w-xxl-1 flex-1 flex-col gap-xs-4 p-xs-4">
			<div className="flex-1 p-xs-4">Main chat</div>

			<input className="h-sm-0 border border-grey-2 bg-background p-sm-0" placeholder="Ask a question" />
		</div>
	)
}
