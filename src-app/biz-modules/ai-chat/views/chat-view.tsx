import { useAiChatStore } from '@app/biz-modules/ai-chat/state'
import { IconButton, SendSvg } from '@ds/release'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const ChatView = () => {
	const { activeChat, loadChat } = useAiChatStore()
	const { chatId } = useParams()

	useEffect(() => {
		const id = parseInt(String(chatId))
		loadChat(isNaN(id) ? 0 : id)
	}, [chatId])

	return (
		<div className="mx-auto flex h-full max-w-xxl-1 flex-1 flex-col gap-xs-4 p-xs-5">
			{activeChat ? (
				<>
					<h1 className="mt-xs-9 text-size-xl font-weight-md">{activeChat.title}</h1>

					<div className="flex-1" />
				</>
			) : (
				<div className="flex-center flex-1">
					<h1 className="mt-xs-4 text-size-xxl">Start a new conversation</h1>
				</div>
			)}

			<div className="h-field-h-lg relative">
				<input
					className={
						'h-full w-full rounded-md px-xs-7 ' +
						'border border-color-border-default bg-color-bg-field focus:border-color-border-active'
					}
					placeholder="Ask a question"
				/>

				<IconButton tooltip="Send message" variant="solid-primary" className="absolute-center-y right-xs-4">
					<SendSvg className="h-xs-8" />
				</IconButton>
			</div>
		</div>
	)
}
