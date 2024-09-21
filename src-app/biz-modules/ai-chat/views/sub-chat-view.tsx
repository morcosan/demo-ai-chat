export const SubChatView = () => {
	return (
		<div className="h-full w-xl-4 p-xs-4">
			<div className="flex h-full w-full flex-col gap-xs-4 border border-color-border-shadow p-xs-4 shadow-md">
				<div className="flex-1 p-xs-2">Sub-chat</div>

				<input
					className="h-sm-0 border border-color-border-default bg-color-bg-field p-sm-0 focus:border-color-border-active"
					placeholder="Ask a question"
				/>
			</div>
		</div>
	)
}
