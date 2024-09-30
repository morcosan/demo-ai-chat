import { AiChatSvg } from '@ds/release'
import { Message } from '../api/types'

interface Props {
	message: Message
}

export const MessageBubble = ({ message }: Props) => {
	return (
		<div className="flex flex-col items-end">
			{message.role === 'user' ? (
				<div className="mb-xs-5 w-fit max-w-[70%] rounded-md bg-color-primary-bg px-xs-5 py-xs-3">
					<div className="whitespace-pre-wrap">{message.text}</div>
				</div>
			) : (
				<div className="mb-sm-4 px-xs-5 py-xs-1">
					<div className="mb-xs-4 flex items-center gap-xs-1">
						<div className="flex-center h-sm-0 w-sm-0 rounded-full">
							<AiChatSvg className="h-xs-8" />
						</div>
						<span className="mb-xs-0 text-size-sm text-color-text-subtle">Lorem Ipsum GPT</span>
					</div>

					{message.text}
				</div>
			)}
		</div>
	)
}
