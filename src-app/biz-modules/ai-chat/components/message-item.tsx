import { AiChatSvg, IconButton } from '@ds/release'
import { Message } from '../api/types'
import { SubchatBubble } from '../components/subchat-bubble'

interface Props {
	message: Message
	widthClass?: string
	secondary?: boolean
}

export const MessageItem = ({ message, widthClass, secondary }: Props) => {
	const userClass = secondary ? 'max-w-[80%] bg-color-secondary-bg' : 'max-w-[70%] bg-color-primary-bg'

	return (
		<div className="relative flex flex-col items-end">
			{message.role === 'user' ? (
				<div className={`mb-xs-5 w-fit rounded-md px-xs-6 py-xs-3 shadow-sm ${userClass}`}>
					<div className="whitespace-pre-wrap">{message.text}</div>
				</div>
			) : (
				<div className="mb-sm-4 w-full px-xs-5 py-xs-1">
					<div className="mb-xs-4 flex items-center gap-xs-1">
						<div className="flex-center h-sm-0 w-sm-0 rounded-full">
							<AiChatSvg className="h-xs-8" />
						</div>
						<span className="mb-xs-0 text-size-sm text-color-text-subtle">Lorem Ipsum GPT</span>
					</div>

					{message.text}
				</div>
			)}

			{/* SUBCHAT BUTTON */}
			{message.subchatSize > 0 && !secondary && (
				<div className={`flex-center absolute right-0 top-0 translate-x-full ${widthClass || ''}`}>
					<IconButton
						tooltip={`Open subchat (${message.subchatSize} messages)`}
						linkHref={`/chat/${message.chatId}?subchat=${message.id}`}
						size="lg"
						className={message.role === 'user' ? '-mt-xs-1' : 'mt-sm-1'}
					>
						<SubchatBubble count={message.subchatSize} />
					</IconButton>
				</div>
			)}
		</div>
	)
}
