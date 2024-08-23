export const SubChatPanel = () => {
	return (
		<div className="h-full w-xl-4 p-xs-4">
			<div className="flex h-full w-full flex-col gap-xs-4 p-xs-4 shadow-xl">
				<div className="flex-1 p-xs-2">Sub-chat</div>

				<input className="h-sm-0 border border-grey-2 bg-background p-sm-0" placeholder="Ask a question" />
			</div>
		</div>
	)
}
