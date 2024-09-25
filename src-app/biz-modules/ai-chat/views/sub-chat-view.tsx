import { IconButton, SendSvg } from '@ds/release'

export const SubChatView = () => {
	return (
		<div className="h-full w-xl-4 p-xs-4">
			<div className="flex h-full w-full flex-col gap-xs-4 border border-color-border-shadow p-xs-4 shadow-md">
				<div className="flex-1 p-xs-2">Sub-chat</div>

				<div className="h-field-h-lg relative">
					<input
						className={
							'h-full w-full rounded-md px-xs-7 ' +
							'border border-color-border-default bg-color-bg-field focus:border-color-border-active'
						}
						placeholder="Ask a question"
					/>

					<IconButton tooltip="Send message" variant="solid-secondary" className="absolute-center-y right-xs-4">
						<SendSvg className="h-xs-8" />
					</IconButton>
				</div>
			</div>
		</div>
	)
}
